import { sendPerformanceMetrics } from './apiConnectionManager';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];
  private aggregatedMetrics: { [key: string]: { sum: number; count: number } } = {};
  private isMonitoring: boolean = false;
  private maxMetrics: number = 100;
  private reportingInterval: number = 30000; // 30 seconds

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

    try {
      if ('PerformanceObserver' in window) {
        const resourceObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            this.recordMetric({
              name: 'resource-load',
              value: entry.duration,
              unit: 'ms',
              timestamp: Date.now()
            });
          });
        });

        resourceObserver.observe({ entryTypes: ['resource'] });
      }
    } catch (e) {
      console.warn('Resource timing not supported', e);
    }
  }

  private setupPerformanceObserver(): void {
    try {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
              this.recordMetric({
                name: 'first-paint',
                value: entry.startTime,
                unit: 'ms',
                timestamp: Date.now()
              });
            }
          });
        });

        observer.observe({ entryTypes: ['paint', 'navigation'] });
      }
    } catch (e) {
      console.warn('PerformanceObserver not supported', e);
    }
  }

  private aggregateMetrics(): void {
    this.metrics.forEach(metric => {
      const key = metric.name;
      if (!this.aggregatedMetrics[key]) {
        this.aggregatedMetrics[key] = { sum: 0, count: 0 };
      }
      this.aggregatedMetrics[key].sum += metric.value;
      this.aggregatedMetrics[key].count++;
    });
    this.metrics = []; // Clear the metrics after aggregation
  }

  private reportMetrics(): void {
    this.aggregateMetrics();

    const aggregatedMetricsArray = Object.entries(this.aggregatedMetrics).map(([name, data]) => ({
      name,
      value: data.sum / data.count, // Average value
      unit: 'ms', // Assuming unit is always ms
      timestamp: Date.now()
    }));

    if (process.env.NODE_ENV === 'development') {
      console.log('Aggregated performance metrics:', aggregatedMetricsArray);
    }

    sendPerformanceMetrics(aggregatedMetricsArray);

    // Reset aggregated metrics
    this.aggregatedMetrics = {};
  }
}

// Hook to initialize performance monitoring
export const initializePerformanceMonitoring = (): void => {
  const monitor = PerformanceMonitor.getInstance();
  monitor.startMonitoring();
};

export default PerformanceMonitor;
