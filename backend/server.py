from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from pydantic import BaseModel, Field, ValidationError as PydanticValidationError
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
import asyncio
import time
import structlog

# Import our production modules
from .config import settings
from .logging_config import configure_logging, log_error, log_performance
from .database import db_manager
from .exceptions import (
    APIError, DatabaseError, NotFoundError, ValidationError,
    api_error_handler, general_exception_handler, validation_exception_handler
)
from .middleware import (
    RequestLoggingMiddleware, SecurityHeadersMiddleware, 
    RateLimitMiddleware, HealthCheckMiddleware
)

# Configure logging
logger = configure_logging(settings.log_level, settings.app_name)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    # Startup
    logger.info("Starting application", version=settings.app_version)
    
    try:
        # Connect to database
        await db_manager.connect()
        logger.info("Application startup completed")
        
        yield
        
    except Exception as e:
        logger.error("Failed to start application", error=str(e))
        raise
    finally:
        # Shutdown
        logger.info("Shutting down application")
        await db_manager.disconnect()
        logger.info("Application shutdown completed")

# Create the main app with lifespan management
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Production-ready Digital Intelligence Marketplace API",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Add middleware (order matters!)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(RateLimitMiddleware, requests_per_minute=120)
app.add_middleware(HealthCheckMiddleware)

# Add CORS with production settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=settings.cors_methods,
    allow_headers=settings.cors_headers,
)

# Add exception handlers
app.add_exception_handler(APIError, api_error_handler)
app.add_exception_handler(PydanticValidationError, validation_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api", tags=["api"])

# Enhanced Models with validation
class StatusCheck(BaseModel):
    """Status check model with validation"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class StatusCheckCreate(BaseModel):
    """Status check creation model"""
    client_name: str = Field(..., min_length=1, max_length=100, description="Client name")
    
    class Config:
        schema_extra = {
            "example": {
                "client_name": "test-client"
            }
        }

class HealthResponse(BaseModel):
    """Health check response model"""
    status: str
    timestamp: datetime
    version: str
    database: Dict[str, Any]
    uptime_seconds: float

class MetricsResponse(BaseModel):
    """Application metrics response"""
    requests_total: int
    database_stats: Dict[str, Any]
    uptime_seconds: float
    memory_usage: Dict[str, Any]

# Global variables for metrics
app.state.start_time = time.time()
app.state.request_count = 0

@api_router.get("/", tags=["general"])
async def root():
    """Root endpoint"""
    logger.info("Root endpoint accessed")
    return {
        "message": "Digital Intelligence Marketplace API",
        "version": settings.app_version,
        "status": "operational"
    }

@api_router.get("/health", response_model=HealthResponse, tags=["monitoring"])
async def health_check():
    """Comprehensive health check endpoint"""
    start_time = time.time()
    
    try:
        # Check database health
        db_healthy = await db_manager.health_check()
        db_stats = await db_manager.get_stats()
        
        uptime = time.time() - app.state.start_time
        
        health_status = "healthy" if db_healthy else "degraded"
        
        response = HealthResponse(
            status=health_status,
            timestamp=datetime.utcnow(),
            version=settings.app_version,
            database=db_stats,
            uptime_seconds=uptime
        )
        
        # Log performance
        duration = time.time() - start_time
        log_performance(logger, "health_check", duration, status=health_status)
        
        return response
        
    except Exception as e:
        log_error(logger, e, {"operation": "health_check"})
        raise DatabaseError("Health check failed")

@api_router.get("/metrics", response_model=MetricsResponse, tags=["monitoring"])
async def get_metrics():
    """Application metrics endpoint"""
    try:
        import psutil
        process = psutil.Process()
        memory_info = process.memory_info()
        
        db_stats = await db_manager.get_stats()
        uptime = time.time() - app.state.start_time
        
        return MetricsResponse(
            requests_total=getattr(app.state, 'request_count', 0),
            database_stats=db_stats,
            uptime_seconds=uptime,
            memory_usage={
                "rss": memory_info.rss,
                "vms": memory_info.vms,
                "percent": process.memory_percent()
            }
        )
    except ImportError:
        # psutil not available
        db_stats = await db_manager.get_stats()
        uptime = time.time() - app.state.start_time
        
        return MetricsResponse(
            requests_total=getattr(app.state, 'request_count', 0),
            database_stats=db_stats,
            uptime_seconds=uptime,
            memory_usage={"message": "Memory monitoring not available"}
        )

@api_router.post("/status", response_model=StatusCheck, tags=["status"])
async def create_status_check(input: StatusCheckCreate, request: Request):
    """Create a new status check with enhanced error handling"""
    start_time = time.time()
    request_id = getattr(request.state, "request_id", "unknown")
    
    try:
        logger.info(
            "Creating status check",
            client_name=input.client_name,
            request_id=request_id
        )
        
        # Get database
        if db_manager.database is None:
            raise DatabaseError("Database not connected")
        
        # Create status object
        status_dict = input.dict()
        status_obj = StatusCheck(**status_dict)
        
        # Insert into database with retry logic
        try:
            result = await db_manager.database.status_checks.insert_one(status_obj.dict())
            if not result.inserted_id:
                raise DatabaseError("Failed to insert status check")
        except Exception as db_error:
            log_error(logger, db_error, {
                "operation": "insert_status_check",
                "client_name": input.client_name,
                "request_id": request_id
            })
            raise DatabaseError("Database operation failed")
        
        # Log success
        duration = time.time() - start_time
        log_performance(logger, "create_status_check", duration, 
                       client_name=input.client_name, request_id=request_id)
        
        # Increment request counter
        app.state.request_count = getattr(app.state, 'request_count', 0) + 1
        
        return status_obj
        
    except APIError:
        # Re-raise API errors
        raise
    except Exception as e:
        log_error(logger, e, {
            "operation": "create_status_check",
            "client_name": input.client_name,
            "request_id": request_id
        })
        raise DatabaseError("Failed to create status check")

@api_router.get("/status", response_model=List[StatusCheck], tags=["status"])
async def get_status_checks(
    limit: int = Query(100, ge=1, le=1000, description="Number of records to return"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    client_name: Optional[str] = Query(None, description="Filter by client name")
):
    """Get status checks with pagination and filtering"""
    start_time = time.time()
    
    try:
        logger.info("Fetching status checks", limit=limit, skip=skip, client_name=client_name)
        
        if db_manager.database is None:
            raise DatabaseError("Database not connected")
        
        # Build query
        query = {}
        if client_name:
            query["client_name"] = {"$regex": client_name, "$options": "i"}
        
        # Execute query with pagination
        cursor = db_manager.database.status_checks.find(query).skip(skip).limit(limit)
        status_checks = await cursor.to_list(length=limit)
        
        # Convert to response models
        result = [StatusCheck(**status_check) for status_check in status_checks]
        
        # Log performance
        duration = time.time() - start_time
        log_performance(logger, "get_status_checks", duration, 
                       count=len(result), limit=limit, skip=skip)
        
        return result
        
    except APIError:
        raise
    except Exception as e:
        log_error(logger, e, {"operation": "get_status_checks"})
        raise DatabaseError("Failed to fetch status checks")

@api_router.get("/status/{status_id}", response_model=StatusCheck, tags=["status"])
async def get_status_check(status_id: str):
    """Get a specific status check by ID"""
    start_time = time.time()
    
    try:
        logger.info("Fetching status check", status_id=status_id)
        
        if db_manager.database is None:
            raise DatabaseError("Database not connected")
        
        # Validate UUID format
        try:
            uuid.UUID(status_id)
        except ValueError:
            raise ValidationError("Invalid status check ID format")
        
        # Find status check
        status_check = await db_manager.database.status_checks.find_one({"id": status_id})
        
        if not status_check:
            raise NotFoundError("Status check", status_id)
        
        # Log performance
        duration = time.time() - start_time
        log_performance(logger, "get_status_check", duration, status_id=status_id)
        
        return StatusCheck(**status_check)
        
    except APIError:
        raise
    except Exception as e:
        log_error(logger, e, {"operation": "get_status_check", "status_id": status_id})
        raise DatabaseError("Failed to fetch status check")

# Include the router in the main app
app.include_router(api_router)

# Add a simple root endpoint
@app.get("/")
async def app_root():
    """Application root"""
    return {"message": "Digital Intelligence Marketplace", "api": "/api/docs"}
