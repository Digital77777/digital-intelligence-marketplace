"""
Backend test configuration and fixtures
"""
import pytest
import asyncio
from fastapi.testclient import TestClient
from httpx import AsyncClient
import motor.motor_asyncio
from unittest.mock import AsyncMock, MagicMock
import os
from typing import Generator, AsyncGenerator

# Set test environment
os.environ["MONGO_URL"] = "mongodb://localhost:27017"
os.environ["DB_NAME"] = "test_database"
os.environ["DEBUG"] = "true"
os.environ["LOG_LEVEL"] = "DEBUG"

from backend.server import app
from backend.database import db_manager
from backend.config import settings

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    """Create a test client for the FastAPI app"""
    with TestClient(app) as test_client:
        yield test_client

@pytest.fixture
async def async_client() -> AsyncGenerator[AsyncClient, None]:
    """Create an async test client"""
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
async def mock_database():
    """Mock database for testing"""
    mock_db = AsyncMock()
    mock_collection = AsyncMock()
    
    # Mock the status_checks collection
    mock_db.status_checks = mock_collection
    mock_db.command = AsyncMock(return_value={"ok": 1})
    
    # Replace the real database with mock
    original_db = db_manager.database
    db_manager.database = mock_db
    
    yield mock_db
    
    # Restore original database
    db_manager.database = original_db

@pytest.fixture
def sample_status_check():
    """Sample status check data"""
    return {
        "id": "test-id-123",
        "client_name": "test-client",
        "timestamp": "2024-01-01T00:00:00"
    }

@pytest.fixture
def sample_status_checks():
    """Sample status checks list"""
    return [
        {
            "id": "test-id-1",
            "client_name": "client-1",
            "timestamp": "2024-01-01T00:00:00"
        },
        {
            "id": "test-id-2",
            "client_name": "client-2",
            "timestamp": "2024-01-01T01:00:00"
        }
    ]