import React, { useCallback, useMemo, useEffect, useState } from 'react';

// Debounce hook for search and input fields
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Memoized filter function for large datasets
export const useMemoizedFilter = <T>(
  data: T[],
  filterFn: (item: T) => boolean,
  dependencies: React.DependencyList
) => {
  return useMemo(() => {
    return data.filter(filterFn);
  }, [data, ...dependencies]);
};

// Optimized event handlers
export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList
): T => {
  return useCallback(callback, dependencies);
};

// Image lazy loading utility
export const createImageLoader = () => {
  const imageCache = new Map<string, boolean>();
  
  return {
    preloadImage: (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (imageCache.has(src)) {
          resolve();
          return;
        }
        
        const img = new Image();
        img.onload = () => {
          imageCache.set(src, true);
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    },
    
    isImageCached: (src: string): boolean => {
      return imageCache.has(src);
    }
  };
};

// Virtual scrolling utility for large lists
export const useVirtualScroll = (
  itemHeight: number,
  containerHeight: number,
  itemCount: number,
  scrollTop: number
) => {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount + 1, itemCount);
    
    return {
      startIndex: Math.max(0, startIndex - 1),
      endIndex,
      visibleCount,
      totalHeight: itemCount * itemHeight
    };
  }, [itemHeight, containerHeight, itemCount, scrollTop]);
};

// Update type constraint to ensure P is an object and fix the spread usage
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => {
    try {
      return React.createElement(Component, { ...(props as object), ref });
    } catch (error) {
      console.error('Component error:', error);
      return React.createElement(
        'div',
        { className: 'p-4 border border-red-200 rounded-lg bg-red-50' },
        React.createElement(
          'p',
          { className: 'text-red-600 text-sm' },
          'Something went wrong. Please try refreshing the page.'
        )
      );
    }
  });

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Bundle splitting utility
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) => {
  return React.lazy(importFn);
};

// Memory usage monitor (development only)
export const useMemoryMonitor = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const logMemory = () => {
        const memory = (performance as any).memory;
        console.log('Memory usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
        });
      };
      
      const interval = setInterval(logMemory, 10000); // Log every 10 seconds
      return () => clearInterval(interval);
    }
  }, []);
};
