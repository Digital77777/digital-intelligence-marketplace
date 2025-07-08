"""
Test configuration and settings
"""
import pytest
import os
from unittest.mock import patch
from backend.config import Settings, get_settings

class TestSettings:
    """Test application settings"""
    
    def test_settings_validation_success(self):
        """Test successful settings validation"""
        with patch.dict(os.environ, {
            'MONGO_URL': 'mongodb://localhost:27017',
            'DB_NAME': 'test_db'
        }):
            settings = Settings()
            assert settings.mongo_url == 'mongodb://localhost:27017'
            assert settings.db_name == 'test_db'
            assert settings.app_name == "Digital Intelligence Marketplace"
    
    def test_settings_validation_missing_mongo_url(self):
        """Test validation error for missing MONGO_URL"""
        with patch.dict(os.environ, {'DB_NAME': 'test_db'}, clear=True):
            with pytest.raises(ValueError, match="MONGO_URL is required"):
                Settings(mongo_url=None, db_name='test_db')
    
    def test_settings_validation_missing_db_name(self):
        """Test validation error for missing DB_NAME"""
        with patch.dict(os.environ, {'MONGO_URL': 'mongodb://localhost:27017'}, clear=True):
            with pytest.raises(ValueError, match="DB_NAME is required"):
                Settings(mongo_url='mongodb://localhost:27017', db_name=None)
    
    def test_cors_origins_default(self):
        """Test default CORS origins"""
        with patch.dict(os.environ, {
            'MONGO_URL': 'mongodb://localhost:27017',
            'DB_NAME': 'test_db'
        }):
            settings = Settings()
            assert "http://localhost:3000" in settings.cors_origins
    
    def test_debug_mode_setting(self):
        """Test debug mode setting"""
        with patch.dict(os.environ, {
            'MONGO_URL': 'mongodb://localhost:27017',
            'DB_NAME': 'test_db',
            'DEBUG': 'true'
        }):
            settings = Settings(
                mongo_url='mongodb://localhost:27017',
                db_name='test_db',
                debug=True
            )
            assert settings.debug is True
    
    def test_get_settings_function(self):
        """Test get_settings function"""
        with patch.dict(os.environ, {
            'MONGO_URL': 'mongodb://localhost:27017',
            'DB_NAME': 'test_db'
        }):
            settings = get_settings()
            assert isinstance(settings, Settings)
            assert settings.mongo_url == 'mongodb://localhost:27017'