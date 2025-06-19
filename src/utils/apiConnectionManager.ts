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
const OPEN_SOURCE_MODELS = {
  'ai-image-generator': 'stabilityai/stable-diffusion-xl-base-1.0',
  'ai-text-summarizer': 'facebook/bart-large-cnn',
  'ai-code-assistant': 'bigcode/starcoder2-15b',
  'ai-language-translator': 'facebook/mbart-large-50-many-to-many-mmt',
  'ai-music-composer': 'facebook/musicgen-small',
  'text-to-image': 'runwayml/stable-diffusion-v1-5',
  'image-generation': 'CompVis/stable-diffusion-v1-4',
  'summarizer': 'facebook/bart-large-cnn',
  'code-generator': 'bigcode/starcoder',
  '1': 'stabilityai/stable-diffusion-xl-base-1.0', // For tool with ID 1
  '2': 'facebook/bart-large-cnn', // For tool with ID 2
  '3': 'bigcode/starcoder', // For tool with ID 3
  '4': 'facebook/mbart-large-50', // For tool with ID 4
  '5': 'facebook/musicgen-small', // For tool with ID 5
};

import {
  tool1ApiKey,
  tool2ApiKey,
  tool3ApiKey,
  tool4ApiKey,
  tool5ApiKey,
  wikipediaApiKey,
} from '../config/apiKeys';

/**
 * Get the platform API key for a tool
 */
export const getPlatformAPIKey = (toolId: string): string => {
  switch (toolId) {
    case '1':
      return tool1ApiKey || `platform-tool-${toolId}-demo-key`;
    case '2':
      return tool2ApiKey || `platform-tool-${toolId}-demo-key`;
    case '3':
      return tool3ApiKey || `platform-tool-${toolId}-demo-key`;
    case '4':
      return tool4ApiKey || `platform-tool-${toolId}-demo-key`;
    case '5':
      return tool5ApiKey || `platform-tool-${toolId}-demo-key`;
    case 'wikipedia':
      return wikipediaApiKey || `platform-tool-${toolId}-demo-key`;
    default:
      return `platform-tool-${toolId}-demo-key`;
  }
};

export const apiConnectionManager = {
  /**
   * Check if a tool has an API connection
   */
  hasConnection: (toolId: string): boolean => {
    // Always return false for now
    return false;
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

    const platformKey = getPlatformAPIKey(toolId);

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
  listConnections: (): string[] => {
    // Always return a list of tool IDs 1-10 to simulate connections
    return Array.from({ length: 10 }, (_, i) => (i + 1).toString());
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
    // Always return false for now
    return false;
  },

  /**
   * Check if a tool has a platform API available
   */
  hasPlatformAPI: (toolId: string): boolean => {
    // Always return false for now
    return false;
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
