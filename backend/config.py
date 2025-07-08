"""
Production-ready configuration management
"""
import os
from typing import List, Optional
from pydantic import BaseModel, validator
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

class Settings(BaseModel):
    """Application settings with validation"""
    
    # Database settings
    mongo_url: str
    db_name: str
    
    # Security settings
    cors_origins: List[str] = ["http://localhost:3000"]
    cors_methods: List[str] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    cors_headers: List[str] = ["Content-Type", "Authorization", "X-Requested-With"]
    
    # Application settings
    app_name: str = "Digital Intelligence Marketplace"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Logging settings
    log_level: str = "INFO"
    
    # Performance settings
    max_connection_pool_size: int = 100
    min_connection_pool_size: int = 10
    
    # Security settings
    stripe_api_key: Optional[str] = None
    
    @validator('mongo_url')
    def validate_mongo_url(cls, v):
        if not v:
            raise ValueError("MONGO_URL is required")
        return v
    
    @validator('db_name')
    def validate_db_name(cls, v):
        if not v:
            raise ValueError("DB_NAME is required")
        return v
    
    @validator('cors_origins')
    def validate_cors_origins(cls, v):
        # In production, ensure no wildcard origins
        if "*" in v and not os.getenv("DEBUG", "false").lower() == "true":
            logging.warning("Wildcard CORS origin detected in production mode")
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = False

def get_settings() -> Settings:
    """Get application settings"""
    try:
        return Settings(
            mongo_url=os.getenv("MONGO_URL"),
            db_name=os.getenv("DB_NAME"),
            stripe_api_key=os.getenv("STRIPE_API_KEY"),
            debug=os.getenv("DEBUG", "false").lower() == "true",
            log_level=os.getenv("LOG_LEVEL", "INFO"),
            cors_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
        )
    except Exception as e:
        logging.error(f"Failed to load settings: {e}")
        raise

# Global settings instance
settings = get_settings()