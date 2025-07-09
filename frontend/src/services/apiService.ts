/**
 * Production-ready API service with error handling, retry logic, and monitoring
 */

interface RequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

interface ApiError extends Error {
  status?: number;
  code?: string;
  requestId?: string;
}

class ApiService {
  private baseURL: string;
  private defaultTimeout: number;
  private defaultRetries: number;

  constructor() {
    this.baseURL = import.meta.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || '';
    this.defaultTimeout = parseInt(import.meta.env.REACT_APP_API_TIMEOUT || '30000');
    this.defaultRetries = parseInt(import.meta.env.REACT_APP_RETRY_ATTEMPTS || '3');
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = 1000,
      headers = {}
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    
    // Set timeout
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const requestOptions: RequestInit = {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers,
        ...options.headers,
      },
    };

    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const error: ApiError = new Error(
            errorData.message || `HTTP ${response.status}: ${response.statusText}`
          );
          error.status = response.status;
          error.code = errorData.error;
          error.requestId = errorData.request_id;
          throw error;
        }

        const data = await response.json();
        
        // Log successful request in development
        if (import.meta.env.DEV) {
          console.log(`✅ API Success: ${options.method || 'GET'} ${endpoint}`, {
            status: response.status,
            requestId: response.headers.get('X-Request-ID'),
          });
        }

        return data;

      } catch (error) {
        lastError = error as Error;
        clearTimeout(timeoutId);

        // Don't retry on client errors (4xx) except 408, 429
        if (error instanceof Error && 'status' in error) {
          const status = (error as ApiError).status;
          if (status && status >= 400 && status < 500 && status !== 408 && status !== 429) {
            break;
          }
        }

        // Don't retry on the last attempt
        if (attempt === retries) {
          break;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
      }
    }

    // Log error
    this.logError(lastError, endpoint, options.method || 'GET');
    throw lastError;
  }

  private logError(error: Error, endpoint: string, method: string) {
    const errorContext = {
      endpoint,
      method,
      message: error.message,
      timestamp: new Date().toISOString(),
    };

    if (import.meta.env.DEV) {
      console.error('🚫 API Error:', errorContext);
    }

    // In production, send to error reporting service
    if (import.meta.env.REACT_APP_ENABLE_ERROR_REPORTING === 'true') {
      // Example: Sentry, LogRocket, etc.
      // errorReportingService.captureException(error, errorContext);
    }
  }

  // GET request
  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' }, config);
  }

  // POST request
  async post<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    );
  }

  // PUT request
  async put<T>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      },
      config
    );
  }

  // DELETE request
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' }, config);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.get('/api/health');
  }

  // Get metrics
  async getMetrics(): Promise<any> {
    return this.get('/api/metrics');
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;