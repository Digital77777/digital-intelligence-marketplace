
import { ZodError, ZodSchema } from 'zod';

// Generic form validation helper with improved error handling
export const validateForm = <T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } => {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};
      
      error.errors.forEach((err) => {
        if (err.path) {
          const path = err.path.join('.');
          errors[path] = err.message;
        }
      });
      
      return { success: false, errors };
    }
    
    // For other types of errors
    return { 
      success: false, 
      errors: { 
        _form: 'An unexpected error occurred'
      } 
    };
  }
};

import DOMPurify from 'dompurify';

// Enhanced HTML sanitization function to prevent XSS attacks
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  // Use DOMPurify to sanitize HTML
  return DOMPurify.sanitize(html);
};

// Enhanced function to escape user input to prevent SQL injection
export const escapeInput = (input: string): string => {
  if (!input) return '';
  
  // This function is a placeholder. In a real-world application,
  // you should use parameterized queries or prepared statements
  // provided by your database library to prevent SQL injection.
  console.warn(
    'escapeInput is a placeholder! Use parameterized queries or prepared statements for SQL injection prevention.'
  );
  return input;
};

// Security helper to prevent prototype pollution with more checks
export const safelyParseJSON = (json: string): unknown => {
  try {
    if (typeof json !== 'string') {
      return null;
    }
    
    // Basic check for potential dangerous patterns
    if (/^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      
      const parsed = JSON.parse(json);
      
      // If it's an object, freeze it to prevent modification
      if (parsed && typeof parsed === 'object') {
        return Object.freeze(parsed);
      }
      
      return parsed;
    }
    
    return null;
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    return null;
  }
};

// Enhanced helper to safely update localStorage with error handling and data validation
export const safeStorage = {
  set: (key: string, value: unknown, expiresInMinutes?: number): void => {
    try {
      // Add expiration functionality
      const data = expiresInMinutes
        ? { value, expires: Date.now() + expiresInMinutes * 60 * 1000 }
        : { value };
        
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  },
  
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) return defaultValue;
      
      const data = safelyParseJSON(serialized) as { value: T; expires?: number } | null;
      
      // Check if data has expired
      if (data && data.expires && Date.now() > data.expires) {
        localStorage.removeItem(key);
        return defaultValue;
      }
      
      return data?.value ?? defaultValue;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return defaultValue;
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage:', e);
    }
  },
  
  // Add method to check if item exists
  has: (key: string): boolean => {
    try {
      return localStorage.getItem(key) !== null;
    } catch (e) {
      console.error('Error checking localStorage:', e);
      return false;
    }
  },
  
  // Add method to clear expired items
  clearExpired: (): void => {
    try {
      Object.keys(localStorage).forEach(key => {
        const serialized = localStorage.getItem(key);
        if (serialized) {
          const data = safelyParseJSON(serialized) as { expires?: number } | null;
          if (data?.expires && Date.now() > data.expires) {
            localStorage.removeItem(key);
          }
        }
      });
    } catch (e) {
      console.error('Error clearing expired localStorage items:', e);
    }
  }
};

// Add function to debounce user input for better performance
export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// Add function to throttle frequent events
export const throttle = <F extends (...args: any[]) => any>(func: F, limit: number) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<F>): void => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
