"""
Production-ready error handling and exceptions
"""
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Any, Dict, Optional
import structlog
import traceback
import uuid
from datetime import datetime

logger = structlog.get_logger(__name__)

class ErrorResponse(BaseModel):
    """Standardized error response model"""
    error: str
    message: str
    request_id: str
    timestamp: str
    details: Optional[Dict[str, Any]] = None

class APIError(HTTPException):
    """Custom API exception with logging"""
    def __init__(
        self,
        status_code: int,
        message: str,
        details: Optional[Dict[str, Any]] = None,
        log_level: str = "error"
    ):
        super().__init__(status_code=status_code, detail=message)
        self.message = message
        self.details = details
        self.log_level = log_level

class ValidationError(APIError):
    """Validation error"""
    def __init__(self, message: str, details: Optional[Dict[str, Any]] = None):
        super().__init__(status_code=422, message=message, details=details, log_level="warning")

class NotFoundError(APIError):
    """Resource not found error"""
    def __init__(self, resource: str, identifier: str = ""):
        message = f"{resource} not found"
        if identifier:
            message += f": {identifier}"
        super().__init__(status_code=404, message=message, log_level="info")

class DatabaseError(APIError):
    """Database operation error"""
    def __init__(self, message: str = "Database operation failed"):
        super().__init__(status_code=500, message=message, log_level="error")

class AuthenticationError(APIError):
    """Authentication error"""
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(status_code=401, message=message, log_level="warning")

class AuthorizationError(APIError):
    """Authorization error"""
    def __init__(self, message: str = "Access denied"):
        super().__init__(status_code=403, message=message, log_level="warning")

class RateLimitError(APIError):
    """Rate limit exceeded error"""
    def __init__(self, message: str = "Rate limit exceeded"):
        super().__init__(status_code=429, message=message, log_level="warning")

async def api_error_handler(request: Request, exc: APIError) -> JSONResponse:
    """Handle custom API errors"""
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    
    # Log the error
    log_func = getattr(logger, exc.log_level, logger.error)
    log_func(
        "API error",
        status_code=exc.status_code,
        message=exc.message,
        request_id=request_id,
        path=request.url.path,
        method=request.method,
        details=exc.details
    )
    
    error_response = ErrorResponse(
        error=type(exc).__name__,
        message=exc.message,
        request_id=request_id,
        timestamp=datetime.utcnow().isoformat(),
        details=exc.details
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response.dict()
    )

async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle unexpected exceptions"""
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    
    # Log the full traceback for debugging
    logger.error(
        "Unhandled exception",
        request_id=request_id,
        path=request.url.path,
        method=request.method,
        error_type=type(exc).__name__,
        error_message=str(exc),
        traceback=traceback.format_exc()
    )
    
    # Don't expose internal errors in production
    error_response = ErrorResponse(
        error="InternalServerError",
        message="An internal server error occurred",
        request_id=request_id,
        timestamp=datetime.utcnow().isoformat()
    )
    
    return JSONResponse(
        status_code=500,
        content=error_response.dict()
    )

async def validation_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle Pydantic validation errors"""
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    
    logger.warning(
        "Validation error",
        request_id=request_id,
        path=request.url.path,
        method=request.method,
        errors=str(exc)
    )
    
    error_response = ErrorResponse(
        error="ValidationError",
        message="Request validation failed",
        request_id=request_id,
        timestamp=datetime.utcnow().isoformat(),
        details={"validation_errors": str(exc)}
    )
    
    return JSONResponse(
        status_code=422,
        content=error_response.dict()
    )