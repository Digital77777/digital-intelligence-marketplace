"""
Database utilities and connection management
"""
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo.errors import ServerSelectionTimeoutError, ConnectionFailure
import asyncio
from typing import Optional
import structlog
from .config import settings

logger = structlog.get_logger(__name__)

class DatabaseManager:
    """Production-ready database connection manager"""
    
    def __init__(self):
        self.client: Optional[AsyncIOMotorClient] = None
        self.database: Optional[AsyncIOMotorDatabase] = None
        self._connection_lock = asyncio.Lock()
    
    async def connect(self) -> AsyncIOMotorDatabase:
        """Connect to MongoDB with production settings"""
        if self.database is not None:
            return self.database
            
        async with self._connection_lock:
            if self.database is not None:
                return self.database
                
            try:
                logger.info("Connecting to MongoDB", url=settings.mongo_url.split('@')[-1])  # Hide credentials
                
                self.client = AsyncIOMotorClient(
                    settings.mongo_url,
                    maxPoolSize=settings.max_connection_pool_size,
                    minPoolSize=settings.min_connection_pool_size,
                    maxIdleTimeMS=30000,
                    serverSelectionTimeoutMS=5000,
                    connectTimeoutMS=10000,
                    retryWrites=True,
                    retryReads=True
                )
                
                # Test connection
                await self.client.admin.command('ping')
                
                self.database = self.client[settings.db_name]
                logger.info("Successfully connected to MongoDB", database=settings.db_name)
                
                return self.database
                
            except (ServerSelectionTimeoutError, ConnectionFailure) as e:
                logger.error("Failed to connect to MongoDB", error=str(e))
                raise
            except Exception as e:
                logger.error("Unexpected database connection error", error=str(e))
                raise
    
    async def disconnect(self):
        """Gracefully disconnect from MongoDB"""
        if self.client:
            logger.info("Disconnecting from MongoDB")
            self.client.close()
            self.client = None
            self.database = None
    
    async def health_check(self) -> bool:
        """Check database health"""
        try:
            if not self.database:
                return False
            await self.database.command('ping')
            return True
        except Exception as e:
            logger.error("Database health check failed", error=str(e))
            return False
    
    async def get_stats(self) -> dict:
        """Get database statistics"""
        try:
            if not self.database:
                return {"status": "disconnected"}
                
            stats = await self.database.command("dbStats")
            return {
                "status": "connected",
                "collections": stats.get("collections", 0),
                "dataSize": stats.get("dataSize", 0),
                "indexSize": stats.get("indexSize", 0),
                "objects": stats.get("objects", 0)
            }
        except Exception as e:
            logger.error("Failed to get database stats", error=str(e))
            return {"status": "error", "error": str(e)}

# Global database manager instance
db_manager = DatabaseManager()