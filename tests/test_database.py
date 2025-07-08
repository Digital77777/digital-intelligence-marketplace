"""
Test database operations
"""
import pytest
from unittest.mock import AsyncMock, patch
from backend.database import DatabaseManager
from backend.exceptions import DatabaseError

class TestDatabaseManager:
    """Test database manager functionality"""
    
    @pytest.mark.asyncio
    async def test_database_connection(self):
        """Test database connection"""
        db_manager = DatabaseManager()
        
        with patch('motor.motor_asyncio.AsyncIOMotorClient') as mock_client:
            mock_instance = AsyncMock()
            mock_client.return_value = mock_instance
            mock_instance.admin.command = AsyncMock(return_value={"ok": 1})
            
            db = await db_manager.connect()
            assert db is not None
            mock_instance.admin.command.assert_called_once_with('ping')
    
    @pytest.mark.asyncio
    async def test_database_health_check(self):
        """Test database health check"""
        db_manager = DatabaseManager()
        
        # Mock healthy database
        mock_db = AsyncMock()
        mock_db.command = AsyncMock(return_value={"ok": 1})
        db_manager.database = mock_db
        
        is_healthy = await db_manager.health_check()
        assert is_healthy is True
    
    @pytest.mark.asyncio
    async def test_database_health_check_failure(self):
        """Test database health check failure"""
        db_manager = DatabaseManager()
        
        # Mock unhealthy database
        mock_db = AsyncMock()
        mock_db.command = AsyncMock(side_effect=Exception("Connection failed"))
        db_manager.database = mock_db
        
        is_healthy = await db_manager.health_check()
        assert is_healthy is False
    
    @pytest.mark.asyncio
    async def test_database_stats(self):
        """Test database statistics"""
        db_manager = DatabaseManager()
        
        # Mock database stats
        mock_db = AsyncMock()
        mock_stats = {
            "collections": 5,
            "dataSize": 1024,
            "indexSize": 512,
            "objects": 100
        }
        mock_db.command = AsyncMock(return_value=mock_stats)
        db_manager.database = mock_db
        
        stats = await db_manager.get_stats()
        assert stats["status"] == "connected"
        assert stats["collections"] == 5
        assert stats["dataSize"] == 1024
    
    @pytest.mark.asyncio
    async def test_database_disconnect(self):
        """Test database disconnection"""
        db_manager = DatabaseManager()
        
        mock_client = AsyncMock()
        db_manager.client = mock_client
        
        await db_manager.disconnect()
        mock_client.close.assert_called_once()
        assert db_manager.client is None
        assert db_manager.database is None