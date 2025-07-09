import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiService } from '../apiService';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('ApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset fetch mock
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('GET requests', () => {
    it('makes successful GET request', async () => {
      const mockData = { id: 1, name: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
        headers: new Map([['X-Request-ID', 'test-123']]),
      });

      const result = await apiService.get('/api/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/test'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockData);
    });

    it('handles API error responses', async () => {
      const mockError = {
        error: 'ValidationError',
        message: 'Invalid input',
        request_id: 'test-123'
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        statusText: 'Unprocessable Entity',
        json: async () => mockError,
      });

      await expect(apiService.get('/api/test')).rejects.toThrow('Invalid input');
    });

    it('handles network timeouts', async () => {
      vi.useFakeTimers();

      mockFetch.mockImplementationOnce(() => {
        return new Promise(() => {
          // Never resolves, simulating timeout
        });
      });

      const requestPromise = apiService.get('/api/test', { timeout: 1000 });

      // Fast-forward time to trigger timeout
      vi.advanceTimersByTime(1000);

      await expect(requestPromise).rejects.toThrow();

      vi.useRealTimers();
    });
  });

  describe('POST requests', () => {
    it('makes successful POST request with data', async () => {
      const postData = { name: 'test user' };
      const mockResponse = { id: 1, ...postData };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockResponse,
        headers: new Map(),
      });

      const result = await apiService.post('/api/users', postData);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/users'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Retry logic', () => {
    it('retries on server errors', async () => {
      // First two calls fail, third succeeds
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          json: async () => ({ error: 'Server Error' }),
        })
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          json: async () => ({ error: 'Server Error' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ success: true }),
          headers: new Map(),
        });

      const result = await apiService.get('/api/test', { retries: 2 });

      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(result).toEqual({ success: true });
    });

    it('does not retry on client errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({ error: 'Bad Request' }),
      });

      await expect(apiService.get('/api/test', { retries: 2 })).rejects.toThrow();

      // Should not retry 4xx errors (except 408, 429)
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('retries on 429 rate limit errors', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
          statusText: 'Too Many Requests',
          json: async () => ({ error: 'Rate Limited' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => ({ success: true }),
          headers: new Map(),
        });

      const result = await apiService.get('/api/test', { retries: 1 });

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ success: true });
    });
  });

  describe('Health check', () => {
    it('calls health check endpoint', async () => {
      const mockHealth = {
        status: 'healthy',
        timestamp: '2024-01-01T00:00:00Z'
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockHealth,
        headers: new Map(),
      });

      const result = await apiService.healthCheck();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/health'),
        expect.any(Object)
      );
      expect(result).toEqual(mockHealth);
    });
  });

  describe('Custom headers', () => {
    it('merges custom headers with defaults', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
        headers: new Map(),
      });

      await apiService.get('/api/test', {
        headers: {
          'Authorization': 'Bearer token123',
          'X-Custom-Header': 'custom-value',
        }
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer token123',
            'X-Custom-Header': 'custom-value',
          }),
        })
      );
    });
  });
});