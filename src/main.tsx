
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializePerformanceMonitoring } from './utils/performanceMonitoring.ts';

// Initialize performance monitoring
initializePerformanceMonitoring();

// Enhanced error tracking function
const trackError = (error: Error, info: { componentStack: string }) => {
  console.error('Application error:', error);
  console.error('Component stack:', info.componentStack);
  
  // In production, you would send this to your error tracking service
  // Example: sendToErrorTrackingService(error, info);
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
    trackError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Report error but don't prevent default in production to ensure proper error handling
  if (process.env.NODE_ENV !== 'production') {
    event.preventDefault();
  }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Report error but don't prevent default in production
  if (process.env.NODE_ENV !== 'production') {
    event.preventDefault();
  }
});

// Performance monitoring
const reportWebVitals = (metric: any) => {
  // Send metrics to your analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
};

// Initialize app with error boundary
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
} else {
  const root = createRoot(rootElement);
  
  // Prefetch critical resources
  const prefetchResources = () => {
    // Prefetch commonly used assets
    const links = [
      '/images/hero-bg.jpg',
      '/fonts/main-font.woff2'
    ];
    
    links.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  };
  
  // Execute prefetching after initial render
  setTimeout(prefetchResources, 1000);
  
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  
  // Log successful render
  console.log('Application successfully rendered');
}
