
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
};

// Platform API keys for each tool (these would be managed by the platform)
const PLATFORM_API_KEYS = {
  '1': 'platform-image-generation-key-123',
  '2': 'platform-text-summarization-key-123',
  '3': 'platform-code-generation-key-123',
  '4': 'platform-language-translation-key-123',
  '5': 'platform-music-generation-key-123',
}

export const apiConnectionManager = {
  /**
   * Check if a tool has an API connection
   */
  hasConnection: (toolId: string): boolean => {
    const connection = localStorage.getItem(`${toolId}_api_key`);
    return !!connection || toolId in PLATFORM_API_KEYS;
  },
  
  /**
   * Get API connection details for a tool
   */
  getConnection: (toolId: string): StoredConnection | null => {
    const apiKey = localStorage.getItem(`${toolId}_api_key`);
    const isPlatformKey = toolId in PLATFORM_API_KEYS;
    
    if (!apiKey && !isPlatformKey) return null;
    
    if (isPlatformKey) {
      return {
        apiKey: PLATFORM_API_KEYS[toolId as keyof typeof PLATFORM_API_KEYS],
        connectedAt: new Date().toISOString(),
        modelProvider: 'platform',
        useLocalModels: false
      };
    }
    
    const apiSecret = localStorage.getItem(`${toolId}_api_secret`);
    const connectedAt = localStorage.getItem(`${toolId}_connected_at`) || new Date().toISOString();
    const modelProvider = localStorage.getItem(`${toolId}_model_provider`) as 'open-source' | 'api' | 'hybrid' | 'platform' || 'api';
    const useLocalModels = localStorage.getItem(`${toolId}_use_local_models`) === 'true';
    
    return {
      apiKey,
      apiSecret,
      connectedAt,
      modelProvider,
      useLocalModels
    };
  },
  
  /**
   * Store API connection for a tool
   */
  storeConnection: (
    toolId: string, 
    apiKey: string, 
    apiSecret?: string, 
    modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform' = 'api',
    useLocalModels: boolean = false
  ): void => {
    localStorage.setItem(`${toolId}_api_key`, apiKey);
    if (apiSecret) {
      localStorage.setItem(`${toolId}_api_secret`, apiSecret);
    }
    localStorage.setItem(`${toolId}_connected_at`, new Date().toISOString());
    localStorage.setItem(`${toolId}_model_provider`, modelProvider);
    localStorage.setItem(`${toolId}_use_local_models`, useLocalModels.toString());
  },
  
  /**
   * Remove API connection for a tool
   */
  removeConnection: (toolId: string): void => {
    localStorage.removeItem(`${toolId}_api_key`);
    localStorage.removeItem(`${toolId}_api_secret`);
    localStorage.removeItem(`${toolId}_connected_at`);
    localStorage.removeItem(`${toolId}_model_provider`);
    localStorage.removeItem(`${toolId}_use_local_models`);
  },
  
  /**
   * List all connected tools
   */
  listConnections: (): string[] => {
    const connections: string[] = [];
    
    // Add platform-connected tools
    Object.keys(PLATFORM_API_KEYS).forEach(toolId => {
      connections.push(toolId);
    });
    
    // Add locally stored connections
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.endsWith('_api_key')) {
        const toolId = key.replace('_api_key', '');
        if (!connections.includes(toolId)) {
          connections.push(toolId);
        }
      }
    }
    
    return connections;
  },

  /**
   * Get the open source model ID for a tool
   */
  getOpenSourceModel: (toolId: string): string | null => {
    return OPEN_SOURCE_MODELS[toolId as keyof typeof OPEN_SOURCE_MODELS] || null;
  },

  /**
   * Check if a tool has an open source alternative
   */
  hasOpenSourceAlternative: (toolId: string): boolean => {
    return toolId in OPEN_SOURCE_MODELS;
  },

  /**
   * Check if a tool has a platform API available
   */
  hasPlatformAPI: (toolId: string): boolean => {
    return toolId in PLATFORM_API_KEYS;
  },

  /**
   * Get the platform API key for a tool
   */
  getPlatformAPIKey: (toolId: string): string | null => {
    return PLATFORM_API_KEYS[toolId as keyof typeof PLATFORM_API_KEYS] || null;
  }
};

export default apiConnectionManager;
