interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private isMonitoring: boolean = false;
  private maxMetrics: number = 100;

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  public startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitorPageLoad();
    this.setupPerformanceObserver();
    
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.recordMetric({
              name: 'long-task',
              value: entry.duration,
              unit: 'ms',
              timestamp: Date.now()
            });
          });
        });
        
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long task monitoring not supported', e);
      }
    }
    
    // Setup cleanup
    window.addEventListener('beforeunload', () => {
      this.reportMetrics();
    });
  }
  
  public stopMonitoring(): void {
    this.isMonitoring = false;
  }
  
  public recordMetric(metric: PerformanceMetric): void {
    if (!this.isMonitoring) return;
    
    this.metrics.push(metric);
    
    // Keep metrics array from growing too large
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }
  }
  
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
  
  public clearMetrics(): void {
    this.metrics = [];
  }
  
  private monitorPageLoad(): void {
    window.addEventListener('load', () => {
      if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domComplete - perfData.domLoading;
        
        this.recordMetric({
          name: 'page-load',
          value: pageLoadTime,
          unit: 'ms',
          timestamp: Date.now()
        });
        
        this.recordMetric({
          name: 'dom-ready',
          value: domReadyTime,
          unit: 'ms',
          timestamp: Date.now()
        });
      }
    });
  }
  
  private setupPerformanceObserver(): void {
    if ('PerformanceObserver' in window) {
      try {
        // Observe resource timing
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'resource') {
              const resourceEntry = entry as PerformanceResourceTiming;
              if (resourceEntry.initiatorType === 'fetch' || 
                  resourceEntry.initiatorType === 'xmlhttprequest') {
                this.recordMetric({
                  name: `api-call-${resourceEntry.name.split('/').pop() || 'unknown'}`,
                  value: resourceEntry.duration,
                  unit: 'ms',
                  timestamp: Date.now()
                });
              }
            }
          });
        });
        
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.warn('Resource timing not supported', e);
      }
    }
  }
  
  private reportMetrics(): void {
    // In a real app, you would send metrics to your analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance metrics:', this.metrics);
    }
    
    // Here you would implement sending metrics to your backend
    // Example:
    // fetch('/api/metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(this.metrics)
    // });
  }
}

// Hook to initialize performance monitoring
export const initializePerformanceMonitoring = (): void => {
  const monitor = PerformanceMonitor.getInstance();
  monitor.startMonitoring();
};

export default PerformanceMonitor;
