"""
Test exceptions and error handling
"""
import pytest
from fastapi import Request
from fastapi.responses import JSONResponse
from unittest.mock import MagicMock, AsyncMock
from backend.exceptions import (
    APIError, DatabaseError, NotFoundError, ValidationError,
    api_error_handler, general_exception_handler
)

class TestCustomExceptions:
    """Test custom exception classes"""
    
    def test_api_error(self):
        """Test APIError exception"""
        error = APIError(status_code=400, message="Test error")
        assert error.status_code == 400
        assert error.message == "Test error"
        assert error.log_level == "error"
    
    def test_validation_error(self):
        """Test ValidationError exception"""
        error = ValidationError("Invalid input")
        assert error.status_code == 422
        assert error.message == "Invalid input"
        assert error.log_level == "warning"
    
    def test_not_found_error(self):
        """Test NotFoundError exception"""
        error = NotFoundError("User", "123")
        assert error.status_code == 404
        assert "User not found: 123" in error.message
        assert error.log_level == "info"
    
    def test_database_error(self):
        """Test DatabaseError exception"""
        error = DatabaseError("Connection failed")
        assert error.status_code == 500
        assert error.message == "Connection failed"
        assert error.log_level == "error"

class TestExceptionHandlers:
    """Test exception handler functions"""
    
    @pytest.mark.asyncio
    async def test_api_error_handler(self):
        """Test API error handler"""
        # Mock request
        request = MagicMock(spec=Request)
        request.state = MagicMock()
        request.state.request_id = "test-123"
        request.url.path = "/api/test"
        request.method = "GET"
        
        # Create API error
        error = APIError(status_code=400, message="Test error")
        
        # Handle error
        response = await api_error_handler(request, error)
        
        assert isinstance(response, JSONResponse)
        assert response.status_code == 400
        
        # Check response content
        content = response.body.decode()
        assert "Test error" in content
        assert "test-123" in content
    
    @pytest.mark.asyncio
    async def test_general_exception_handler(self):
        """Test general exception handler"""
        # Mock request
        request = MagicMock(spec=Request)
        request.state = MagicMock()
        request.state.request_id = "test-123"
        request.url.path = "/api/test"
        request.method = "GET"
        
        # Create general exception
        error = Exception("Unexpected error")
        
        # Handle error
        response = await general_exception_handler(request, error)
        
        assert isinstance(response, JSONResponse)
        assert response.status_code == 500
        
        # Check that internal error is not exposed
        content = response.body.decode()
        assert "internal server error" in content.lower()
        assert "Unexpected error" not in content  # Should not expose internal error