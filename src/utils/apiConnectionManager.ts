
/**
 * API Connection Manager
 * 
 * This utility helps manage API connections for different tools
 */

interface StoredConnection {
  apiKey: string;
  apiSecret?: string;
  connectedAt: string;
}

export const apiConnectionManager = {
  /**
   * Check if a tool has an API connection
   */
  hasConnection: (toolId: string): boolean => {
    const connection = localStorage.getItem(`${toolId}_api_key`);
    return !!connection;
  },
  
  /**
   * Get API connection details for a tool
   */
  getConnection: (toolId: string): StoredConnection | null => {
    const apiKey = localStorage.getItem(`${toolId}_api_key`);
    if (!apiKey) return null;
    
    const apiSecret = localStorage.getItem(`${toolId}_api_secret`);
    const connectedAt = localStorage.getItem(`${toolId}_connected_at`) || new Date().toISOString();
    
    return {
      apiKey,
      apiSecret,
      connectedAt
    };
  },
  
  /**
   * Store API connection for a tool
   */
  storeConnection: (toolId: string, apiKey: string, apiSecret?: string): void => {
    localStorage.setItem(`${toolId}_api_key`, apiKey);
    if (apiSecret) {
      localStorage.setItem(`${toolId}_api_secret`, apiSecret);
    }
    localStorage.setItem(`${toolId}_connected_at`, new Date().toISOString());
  },
  
  /**
   * Remove API connection for a tool
   */
  removeConnection: (toolId: string): void => {
    localStorage.removeItem(`${toolId}_api_key`);
    localStorage.removeItem(`${toolId}_api_secret`);
    localStorage.removeItem(`${toolId}_connected_at`);
  },
  
  /**
   * List all connected tools
   */
  listConnections: (): string[] => {
    const connections: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.endsWith('_api_key')) {
        connections.push(key.replace('_api_key', ''));
      }
    }
    return connections;
  }
};

export default apiConnectionManager;
