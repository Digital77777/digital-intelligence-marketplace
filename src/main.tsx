
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { initializePerformanceMonitoring } from './utils/performanceMonitoring.ts'

// Initialize performance monitoring
initializePerformanceMonitoring();

// Enhanced error tracking function
const trackError = (error: Error, info: { componentStack: string }) => {
  console.error('Application error:', error);
  console.error('Component stack:', info.componentStack);
  
  // In production, you would send this to your error tracking service
  // Example: sendToErrorTrackingService(error, info);
};

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
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  // Log successful render
  console.log('Application successfully rendered');
}
