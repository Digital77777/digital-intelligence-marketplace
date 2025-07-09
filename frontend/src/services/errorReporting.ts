/**
 * Production-ready error reporting and logging service
 */

interface ErrorReport {
  message: string;
  stack?: string;
  component?: string;
  userId?: string;
  userAgent: string;
  url: string;
  timestamp: number;
  level: 'error' | 'warning' | 'info';
  metadata?: Record<string, any>;
}

interface ErrorBoundaryInfo {
  componentStack: string;
  errorBoundary?: string;
  errorInfo?: any;
}

class ErrorReportingService {
  private isEnabled: boolean;
  private userId: string | null = null;
  private errors: ErrorReport[] = [];

  constructor() {
    this.isEnabled = import.meta.env.REACT_APP_ENABLE_ERROR_REPORTING === 'true';
    
    if (this.isEnabled) {
      this.initializeErrorReporting();
    }
  }

  private initializeErrorReporting() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.captureError(event.error, {
        component: 'Global',
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(new Error(event.reason), {
        component: 'Promise',
        metadata: {
          reason: event.reason,
        },
      });
    });

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.captureError(new Error(`Resource failed to load: ${(event.target as any)?.src || (event.target as any)?.href}`), {
          component: 'ResourceLoader',
          level: 'warning',
          metadata: {
            resourceType: (event.target as any)?.tagName,
            resourceUrl: (event.target as any)?.src || (event.target as any)?.href,
          },
        });
      }
    }, true);
  }

  setUser(userId: string) {
    this.userId = userId;
  }

  captureError(
    error: Error, 
    context: {
      component?: string;
      level?: 'error' | 'warning' | 'info';
      metadata?: Record<string, any>;
    } = {}
  ) {
    if (!this.isEnabled) {
      console.error('Error captured:', error, context);
      return;
    }

    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      component: context.component,
      userId: this.userId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: Date.now(),
      level: context.level || 'error',
      metadata: context.metadata,
    };

    this.errors.push(errorReport);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('🚨 Error Report:', errorReport);
    }

    // Send to error reporting service
    this.sendErrorReport(errorReport);

    // Keep only recent errors to prevent memory leaks
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-50);
    }
  }

  captureReactError(error: Error, errorInfo: ErrorBoundaryInfo, component?: string) {
    this.captureError(error, {
      component: component || 'ReactErrorBoundary',
      metadata: {
        componentStack: errorInfo.componentStack,
        errorBoundary: errorInfo.errorBoundary,
        errorInfo: errorInfo.errorInfo,
      },
    });
  }

  captureApiError(error: Error, endpoint: string, method: string = 'GET') {
    this.captureError(error, {
      component: 'APIService',
      metadata: {
        endpoint,
        method,
        status: (error as any).status,
        requestId: (error as any).requestId,
      },
    });
  }

  captureWarning(message: string, metadata?: Record<string, any>) {
    this.captureError(new Error(message), {
      level: 'warning',
      metadata,
    });
  }

  captureInfo(message: string, metadata?: Record<string, any>) {
    this.captureError(new Error(message), {
      level: 'info',
      metadata,
    });
  }

  private async sendErrorReport(errorReport: ErrorReport) {
    try {
      // In production, send to error reporting service
      // Example: Sentry, Bugsnag, LogRocket, etc.
      
      // For now, batch send to reduce network overhead
      if (this.errors.length % 5 === 0) {
        await this.batchSendErrors();
      }
    } catch (e) {
      // Don't throw errors from error reporting
      console.warn('Failed to send error report:', e);
    }
  }

  private async batchSendErrors() {
    const recentErrors = this.errors.slice(-5);
    
    try {
      // Example: Send to your error reporting endpoint
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(recentErrors)
      // });
      
      // For development, just log the batch
      if (import.meta.env.DEV) {
        console.log('📤 Batch sending errors:', recentErrors.length);
      }
    } catch (e) {
      console.warn('Failed to batch send errors:', e);
    }
  }

  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  getErrorStats() {
    const stats = {
      total: this.errors.length,
      byLevel: { error: 0, warning: 0, info: 0 },
      byComponent: {} as Record<string, number>,
      recent: this.errors.slice(-10),
    };

    this.errors.forEach(error => {
      stats.byLevel[error.level]++;
      
      const component = error.component || 'Unknown';
      stats.byComponent[component] = (stats.byComponent[component] || 0) + 1;
    });

    return stats;
  }

  // Clear errors (useful for testing or reset)
  clearErrors() {
    this.errors = [];
  }
}

// Export singleton instance
export const errorReporting = new ErrorReportingService();
export default errorReporting;