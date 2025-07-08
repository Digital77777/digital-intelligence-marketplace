"""
Test API endpoints
"""
import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient
import json
from unittest.mock import AsyncMock

class TestHealthEndpoints:
    """Test health and monitoring endpoints"""
    
    def test_health_check(self, client: TestClient):
        """Test health check endpoint"""
        response = client.get("/api/health")
        assert response.status_code == 200
        
        data = response.json()
        assert "status" in data
        assert "timestamp" in data
        assert "version" in data
        assert "database" in data
        assert "uptime_seconds" in data
    
    def test_metrics_endpoint(self, client: TestClient):
        """Test metrics endpoint"""
        response = client.get("/api/metrics")
        assert response.status_code == 200
        
        data = response.json()
        assert "requests_total" in data
        assert "database_stats" in data
        assert "uptime_seconds" in data
        assert "memory_usage" in data
    
    def test_root_endpoint(self, client: TestClient):
        """Test API root endpoint"""
        response = client.get("/api/")
        assert response.status_code == 200
        
        data = response.json()
        assert "message" in data
        assert "version" in data
        assert "status" in data

class TestStatusCheckEndpoints:
    """Test status check CRUD endpoints"""
    
    @pytest.mark.asyncio
    async def test_create_status_check(self, async_client: AsyncClient, mock_database):
        """Test creating a status check"""
        # Mock successful insertion
        mock_database.status_checks.insert_one.return_value = AsyncMock(inserted_id="test-id")
        
        payload = {"client_name": "test-client"}
        response = await async_client.post("/api/status", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["client_name"] == "test-client"
        assert "id" in data
        assert "timestamp" in data
    
    @pytest.mark.asyncio
    async def test_create_status_check_validation_error(self, async_client: AsyncClient):
        """Test validation error when creating status check"""
        # Test with empty client name
        payload = {"client_name": ""}
        response = await async_client.post("/api/status", json=payload)
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_get_status_checks(self, async_client: AsyncClient, mock_database, sample_status_checks):
        """Test fetching status checks"""
        # Mock database response
        mock_cursor = AsyncMock()
        mock_cursor.to_list.return_value = sample_status_checks
        mock_database.status_checks.find.return_value = mock_cursor
        
        response = await async_client.get("/api/status")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data) == 2
        assert data[0]["client_name"] == "client-1"
        assert data[1]["client_name"] == "client-2"
    
    @pytest.mark.asyncio
    async def test_get_status_checks_with_pagination(self, async_client: AsyncClient, mock_database):
        """Test pagination in get status checks"""
        mock_cursor = AsyncMock()
        mock_cursor.to_list.return_value = []
        mock_database.status_checks.find.return_value = mock_cursor
        
        response = await async_client.get("/api/status?limit=10&skip=20")
        assert response.status_code == 200
        
        # Verify pagination was called correctly
        mock_database.status_checks.find.assert_called_once()
        mock_cursor.skip.assert_called_once_with(20)
        mock_cursor.limit.assert_called_once_with(10)
    
    @pytest.mark.asyncio
    async def test_get_status_check_by_id(self, async_client: AsyncClient, mock_database, sample_status_check):
        """Test fetching a specific status check"""
        # Mock database response
        mock_database.status_checks.find_one.return_value = sample_status_check
        
        response = await async_client.get("/api/status/test-id-123")
        assert response.status_code == 200
        
        data = response.json()
        assert data["id"] == "test-id-123"
        assert data["client_name"] == "test-client"
    
    @pytest.mark.asyncio
    async def test_get_status_check_not_found(self, async_client: AsyncClient, mock_database):
        """Test 404 when status check not found"""
        # Mock database returning None
        mock_database.status_checks.find_one.return_value = None
        
        response = await async_client.get("/api/status/non-existent-id")
        assert response.status_code == 404
        
        data = response.json()
        assert "error" in data
        assert "message" in data
    
    @pytest.mark.asyncio
    async def test_get_status_check_invalid_id(self, async_client: AsyncClient):
        """Test validation error for invalid ID format"""
        response = await async_client.get("/api/status/invalid-uuid-format")
        assert response.status_code == 422

class TestErrorHandling:
    """Test error handling and validation"""
    
    def test_validation_error_response_format(self, client: TestClient):
        """Test validation error response format"""
        response = client.post("/api/status", json={"client_name": ""})
        assert response.status_code == 422
        
        data = response.json()
        assert "error" in data
        assert "message" in data
        assert "request_id" in data
        assert "timestamp" in data
    
    def test_cors_headers(self, client: TestClient):
        """Test CORS headers are present"""
        response = client.options("/api/")
        assert "access-control-allow-origin" in response.headers
    
    def test_security_headers(self, client: TestClient):
        """Test security headers are present"""
        response = client.get("/api/")
        
        # Check for security headers
        assert "x-content-type-options" in response.headers
        assert "x-frame-options" in response.headers
        assert "x-xss-protection" in response.headers
        assert response.headers["x-content-type-options"] == "nosniff"
        assert response.headers["x-frame-options"] == "DENY"
    
    def test_request_id_header(self, client: TestClient):
        """Test request ID is added to response headers"""
        response = client.get("/api/")
        assert "x-request-id" in response.headers

class TestMiddleware:
    """Test middleware functionality"""
    
    def test_rate_limiting_headers(self, client: TestClient):
        """Test rate limiting doesn't interfere with normal requests"""
        response = client.get("/api/")
        assert response.status_code == 200
    
    def test_request_logging(self, client: TestClient):
        """Test that requests are logged properly"""
        # This test mainly ensures middleware doesn't break requests
        response = client.get("/api/")
        assert response.status_code == 200