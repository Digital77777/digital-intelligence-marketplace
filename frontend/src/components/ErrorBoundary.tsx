
import React, { Component, ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home, Bug } from 'lucide-react';
import { errorReporting } from '@/services/errorReporting';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
  errorId?: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Report to error service
    errorReporting.captureReactError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: 'MainErrorBoundary',
      errorInfo,
    });

    this.setState({ errorInfo });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReload = () => {
    // Log user action
    errorReporting.captureInfo('User triggered page reload from error boundary', {
      errorId: this.state.errorId,
      errorMessage: this.state.error?.message,
    });
    
    window.location.reload();
  };

  handleGoHome = () => {
    // Log user action
    errorReporting.captureInfo('User navigated home from error boundary', {
      errorId: this.state.errorId,
      errorMessage: this.state.error?.message,
    });
    
    window.location.href = '/';
  };

  handleReportBug = () => {
    // Log user action
    errorReporting.captureInfo('User chose to report bug', {
      errorId: this.state.errorId,
      errorMessage: this.state.error?.message,
    });

    // In production, this could open a bug report form or support chat
    const subject = encodeURIComponent(`Bug Report - Error ID: ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error Details:
- Error ID: ${this.state.errorId}
- Message: ${this.state.error?.message}
- Timestamp: ${new Date().toISOString()}
- URL: ${window.location.href}
- User Agent: ${navigator.userAgent}

Please describe what you were doing when this error occurred:
    `);
    
    window.open(`mailto:support@example.com?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isProduction = import.meta.env.PROD;
      const showDetails = import.meta.env.REACT_APP_SHOW_ERROR_DETAILS === 'true' || !isProduction;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
          <Card className="max-w-lg w-full">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Something went wrong
                  </h2>
                  
                  <p className="text-gray-600 mb-4">
                    {isProduction 
                      ? "We're sorry, but something unexpected happened. Our team has been notified."
                      : this.state.error?.message || 'An unexpected error occurred while loading this page.'
                    }
                  </p>

                  {this.state.errorId && (
                    <p className="text-sm text-gray-500 mb-4">
                      Error ID: <code className="bg-gray-100 px-1 rounded">{this.state.errorId}</code>
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button onClick={this.handleReload} variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Reload Page
                  </Button>
                  
                  <Button onClick={this.handleGoHome} className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>

                  {isProduction && (
                    <Button onClick={this.handleReportBug} variant="outline" className="flex items-center gap-2">
                      <Bug className="w-4 h-4" />
                      Report Bug
                    </Button>
                  )}
                </div>

                {showDetails && this.state.error && (
                  <details className="mt-6 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      Technical Details
                    </summary>
                    <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                      <div className="text-xs space-y-2">
                        <div>
                          <strong>Error:</strong>
                          <pre className="mt-1 text-red-600 overflow-auto">{this.state.error.message}</pre>
                        </div>
                        
                        {this.state.error.stack && (
                          <div>
                            <strong>Stack Trace:</strong>
                            <pre className="mt-1 text-gray-600 text-xs overflow-auto max-h-32">
                              {this.state.error.stack}
                            </pre>
                          </div>
                        )}

                        {this.state.errorInfo?.componentStack && (
                          <div>
                            <strong>Component Stack:</strong>
                            <pre className="mt-1 text-gray-600 text-xs overflow-auto max-h-32">
                              {this.state.errorInfo.componentStack}
                            </pre>
                          </div>
                        )}
                        
                        <div>
                          <strong>Timestamp:</strong> {new Date().toISOString()}
                        </div>
                        
                        <div>
                          <strong>URL:</strong> {window.location.href}
                        </div>
                      </div>
                    </div>
                  </details>
                )}

                {isProduction && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Need immediate help?</strong><br />
                      Contact our support team at{' '}
                      <a href="mailto:support@example.com" className="underline">
                        support@example.com
                      </a>{' '}
                      and include the Error ID above.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
