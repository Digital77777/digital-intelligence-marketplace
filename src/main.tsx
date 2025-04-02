
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

// Error tracking function
const trackError = (error: Error, info: { componentStack: string }) => {
  console.error('Application error:', error);
  console.error('Component stack:', info.componentStack);
  
  // In production, you would send this to your error tracking service
  // Example: sendToErrorTrackingService(error, info);
};

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Prevent default browser error handling
  event.preventDefault();
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent default browser error handling
  event.preventDefault();
});

// Performance monitoring
const reportWebVitals = (metric: any) => {
  // In production, you would send these metrics to your analytics service
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
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  // Log successful render
  console.log('Application successfully rendered');
}
