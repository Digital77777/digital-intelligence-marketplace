import { openDB } from 'idb';

const dbPromise = openDB('api-connections', 1, {
  upgrade(db) {
    db.createObjectStore('connections', { keyPath: 'toolId' });
  },
});

/**
 * API Connection Manager
 *
 * This utility helps manage API connections for different tools
 * and integrates with open-source alternatives where available
 */

interface StoredConnection {
  apiKey: string;
  apiSecret?: string;
  connectedAt: string;
  modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform';
  useLocalModels: boolean;
}

// List of open source models mapped to their respective tools
const OPEN_SOURCE_MODELS: { [toolId: string]: string } = {
  'ai-image-generator': 'stabilityai/stable-diffusion-xl-base-1.0',
  'ai-text-summarizer': 'facebook/bart-large-cnn',
  'ai-code-assistant': 'bigcode/starcoder2-15b',
  'ai-language-translator': 'facebook/mbart-large-50-many-to-many-mmt',
  'ai-music-composer': 'facebook/musicgen-small',
  'text-to-image': 'runwayml/stable-diffusion-v1-5',
  'image-generation': 'CompVis/stable-diffusion-v1-4',
  'summarizer': 'facebook/bart-large-cnn',
  'code-generator': 'bigcode/starcoder',
};

/**
 * Get the platform API key for a tool
 */
export const getPlatformAPIKey = async (toolId: string): Promise<string> => {
  try {
    const url = '/api/get-api-key?toolId=' + toolId;
    const response = await fetch(url);
    if (!response.ok) {
      console.error('HTTP error! status: ' + response.status);
      return 'platform-tool-' + toolId + '-demo-key';
    }
    const data = await response.json();
    return data.apiKey || 'platform-tool-' + toolId + '-demo-key';
  } catch (error) {
    console.error('Error getting API key:', error);
    return 'platform-tool-' + toolId + '-demo-key';
  }
};

export const apiConnectionManager = {
  /**
   * Check if a tool has an API connection
   */
  hasConnection: async (toolId: string): Promise<boolean> => {
    try {
      const db = await dbPromise;
      const connection = await db.get('connections', toolId);
      return !!connection;
    } catch (error) {
      console.error('Error checking API connection:', error);
      return false;
    }
  },

  /**
   * Get API connection details for a tool
   */
  getConnection: async (toolId: string): Promise<StoredConnection> => {
    try {
      const db = await dbPromise;
      const connection = await db.get('connections', toolId);

      if (connection) {
        return connection;
      }
    } catch (error) {
      console.error('Error getting API connection:', error);
    }

    const platformKey = await getPlatformAPIKey(toolId);

    return {
      apiKey: platformKey,
      apiSecret: undefined,
      connectedAt: new Date().toISOString(),
      modelProvider: 'platform',
      useLocalModels: false,
    };
  },

  /**
   * Store API connection for a tool
   */
  storeConnection: async (
    toolId: string,
    apiKey: string,
    apiSecret?: string,
    modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform' = 'platform',
    useLocalModels: boolean = false
  ): Promise<void> => {
    if (!toolId || typeof toolId !== 'string') {
      throw new Error('Tool ID must be a non-empty string');
    }
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('API Key must be a non-empty string');
    }
    if (apiSecret && typeof apiSecret !== 'string') {
      throw new Error('API Secret must be a string');
    }
    if (modelProvider && !['open-source', 'api', 'hybrid', 'platform'].includes(modelProvider)) {
      throw new Error('Invalid model provider');
    }
    if (typeof useLocalModels !== 'boolean') {
      throw new Error('useLocalModels must be a boolean');
    }

    try {
      const db = await dbPromise;
      await db.put('connections', {
        toolId,
        apiKey,
        apiSecret,
        connectedAt: new Date().toISOString(),
        modelProvider,
        useLocalModels,
      });
    } catch (error) {
      console.error('Error storing API connection:', error);
    }
  },

  /**
   * Remove API connection for a tool
   */
  removeConnection: async (toolId: string): Promise<void> => {
    try {
      const db = await dbPromise;
      await db.delete('connections', toolId);
    } catch (error) {
      console.error('Error removing API connection:', error);
    }
  },

  /**
   * List all connected tools
   */
  listConnections: async (): Promise<string[]> => {
    try {
      const db = await dbPromise;
      const keys = await db.getAllKeys('connections');
      return keys.map(String);
    } catch (error) {
      console.error('Error listing API connections:', error);
      return [];
    }
  },

  /**
   * Get the open source model ID for a tool
   */
  getOpenSourceModel: (toolId: string): string => {
    return OPEN_SOURCE_MODELS[toolId as keyof typeof OPEN_SOURCE_MODELS] ||
      `open-source-model-for-tool-${toolId}`;
  },

  /**
   * Check if a tool has an open source alternative
   */
  hasOpenSourceAlternative: (toolId: string): boolean => {
    return OPEN_SOURCE_MODELS[toolId as keyof typeof OPEN_SOURCE_MODELS] !== undefined;
  },

  /**
   * Check if a tool has a platform API available
   */
  hasPlatformAPI: (toolId: string): boolean => {
    // For now, assume all tools have a platform API
    return true;
  }
};

/**
 * Send performance metrics to the backend
 */
const sendPerformanceMetrics = async (metrics: any[]): Promise<void> => {
  try {
    const response = await fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics)
    });

    if (!response.ok) {
      console.error('Error sending performance metrics:', response.status);
    }
  } catch (error) {
    console.error('Error sending performance metrics:', error);
  }
};

export { sendPerformanceMetrics };
export default apiConnectionManager;
