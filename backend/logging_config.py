"""
Production-ready logging configuration
"""
import logging
import structlog
import sys
from typing import Any, Dict
from datetime import datetime

def configure_logging(log_level: str = "INFO", app_name: str = "app") -> structlog.stdlib.BoundLogger:
    """Configure structured logging for production"""
    
    # Configure standard library logging
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=getattr(logging, log_level.upper())
    )
    
    # Configure structlog
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.stdlib.PositionalArgumentsFormatter(),
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.UnicodeDecoder(),
            structlog.processors.JSONRenderer()
        ],
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        cache_logger_on_first_use=True,
    )
    
    logger = structlog.get_logger(app_name)
    logger.info("Logging configured", log_level=log_level)
    return logger

def log_request_middleware(request_id: str, method: str, path: str, **kwargs) -> Dict[str, Any]:
    """Create request logging context"""
    return {
        "request_id": request_id,
        "method": method,
        "path": path,
        "timestamp": datetime.utcnow().isoformat(),
        **kwargs
    }

def log_error(logger: structlog.stdlib.BoundLogger, error: Exception, context: Dict[str, Any] = None):
    """Log errors with context"""
    error_context = {
        "error_type": type(error).__name__,
        "error_message": str(error),
        **(context or {})
    }
    logger.error("Application error", **error_context)

def log_performance(logger: structlog.stdlib.BoundLogger, operation: str, duration: float, **kwargs):
    """Log performance metrics"""
    logger.info(
        "Performance metric",
        operation=operation,
        duration_ms=round(duration * 1000, 2),
        **kwargs
    )