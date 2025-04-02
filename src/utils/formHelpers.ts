
import { ZodError, ZodSchema } from 'zod';

// Generic form validation helper
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

// HTML sanitization function to prevent XSS attacks
export const sanitizeHtml = (html: string): string => {
  // Basic XSS prevention by removing script tags and on* attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/on\w+=\w+/gi, '');
};

// Function to escape user input to prevent SQL injection
export const escapeInput = (input: string): string => {
  if (!input) return input;
  
  return input
    .replace(/'/g, "''") // Escape single quotes
    .replace(/\\/g, '\\\\'); // Escape backslashes
};

// Security helper to prevent prototype pollution
export const safelyParseJSON = (json: string): unknown => {
  try {
    const parsed = JSON.parse(json);
    
    // If it's an object, freeze it to prevent modification
    if (parsed && typeof parsed === 'object') {
      return Object.freeze(parsed);
    }
    
    return parsed;
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    return null;
  }
};

// Helper to safely update localStorage
export const safeStorage = {
  set: (key: string, value: unknown): void => {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  },
  
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) return defaultValue;
      return safelyParseJSON(serialized) as T;
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
  }
};
