/**
 * Production-ready performance monitoring service
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface WebVitals {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

class PerformanceMonitoringService {
  private metrics: PerformanceMetric[] = [];
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = import.meta.env.REACT_APP_ENABLE_PERFORMANCE_MONITORING === 'true';
    
    if (this.isEnabled) {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Monitor navigation timing
    this.measureNavigationTiming();
    
    // Monitor resource loading
    this.measureResourceTiming();
    
    // Monitor user interactions
    this.measureUserInteractions();
    
    // Monitor Web Vitals
    this.measureWebVitals();
  }

  private measureNavigationTiming() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      this.recordMetric('page_load_time', navigation.loadEventEnd - navigation.fetchStart);
      this.recordMetric('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart);
      this.recordMetric('first_byte_time', navigation.responseStart - navigation.fetchStart);
    }
  }

  private measureResourceTiming() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          this.recordMetric('resource_load_time', resource.duration, {
            resource_name: resource.name,
            resource_type: this.getResourceType(resource.name),
          });
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private measureUserInteractions() {
    // Measure click response time
    document.addEventListener('click', (event) => {
      const startTime = performance.now();
      requestAnimationFrame(() => {
        const duration = performance.now() - startTime;
        this.recordMetric('click_response_time', duration, {
          target: (event.target as Element)?.tagName,
        });
      });
    });
  }

  private measureWebVitals() {
    // Import and use web-vitals library if available
    // For now, we'll use basic implementations
    
    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.recordMetric('first_contentful_paint', entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['paint'] });
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image';
    if (url.includes('/api/')) return 'api';
    return 'other';
  }

  recordMetric(name: string, value: number, metadata?: Record<string, any>) {
    if (!this.isEnabled) return;

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.push(metric);

    // Log in development
    if (import.meta.env.DEV) {
      console.log(`📊 Performance Metric: ${name}`, { value, metadata });
    }

    // Send to analytics service in production
    this.sendToAnalytics(metric);

    // Keep only recent metrics to prevent memory leaks
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-500);
    }
  }

  private sendToAnalytics(metric: PerformanceMetric) {
    // In production, send to analytics service
    // Example: Google Analytics, Mixpanel, etc.
    
    // For now, we'll just batch and log periodically
    if (this.metrics.length % 10 === 0) {
      this.batchSendMetrics();
    }
  }

  private batchSendMetrics() {
    // Batch send metrics to reduce overhead
    const recentMetrics = this.metrics.slice(-10);
    
    // Example: Send to your analytics endpoint
    // fetch('/api/analytics/metrics', {
    //   method: 'POST',
    //   body: JSON.stringify(recentMetrics)
    // });
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getMetricsSummary() {
    const summary: Record<string, { count: number; avg: number; min: number; max: number }> = {};

    this.metrics.forEach(metric => {
      if (!summary[metric.name]) {
        summary[metric.name] = { count: 0, avg: 0, min: Infinity, max: -Infinity };
      }

      const s = summary[metric.name];
      s.count++;
      s.min = Math.min(s.min, metric.value);
      s.max = Math.max(s.max, metric.value);
      s.avg = (s.avg * (s.count - 1) + metric.value) / s.count;
    });

    return summary;
  }

  // Monitor specific component render times
  measureComponentRender(componentName: string, renderFunction: () => void) {
    if (!this.isEnabled) {
      renderFunction();
      return;
    }

    const startTime = performance.now();
    renderFunction();
    const duration = performance.now() - startTime;
    
    this.recordMetric('component_render_time', duration, {
      component: componentName,
    });
  }

  // Monitor API call performance
  measureApiCall<T>(apiName: string, apiCall: () => Promise<T>): Promise<T> {
    if (!this.isEnabled) {
      return apiCall();
    }

    const startTime = performance.now();
    
    return apiCall()
      .then(result => {
        const duration = performance.now() - startTime;
        this.recordMetric('api_call_time', duration, {
          api: apiName,
          status: 'success',
        });
        return result;
      })
      .catch(error => {
        const duration = performance.now() - startTime;
        this.recordMetric('api_call_time', duration, {
          api: apiName,
          status: 'error',
          error: error.message,
        });
        throw error;
      });
  }
}

// Export singleton instance
export const performanceMonitoring = new PerformanceMonitoringService();
export default performanceMonitoring;