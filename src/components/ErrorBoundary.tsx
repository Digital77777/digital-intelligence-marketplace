
import React, { Component, ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
                <p className="text-gray-600">
                  {this.state.error?.message || 'An unexpected error occurred while loading this page.'}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={this.handleReload} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reload Page
                  </Button>
                  <Button onClick={this.handleGoHome}>
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </div>
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-4 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500">
                      Technical Details
                    </summary>
                    <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {this.state.error?.stack}
                    </pre>
                  </details>
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
