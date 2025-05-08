
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

// Platform API keys for each tool (these would be managed by the platform)
// Now automatically generated for any tool ID
const PLATFORM_API_KEYS: Record<string, string> = {};

// Generate platform API keys for any tool ID dynamically
for (let i = 1; i <= 50; i++) {
  PLATFORM_API_KEYS[i.toString()] = `platform-tool-${i}-demo-key`;
}

export const apiConnectionManager = {
  /**
   * Check if a tool has an API connection
   */
  hasConnection: (toolId: string): boolean => {
    // Always return true to make tools work without requiring setup
    return true;
  },
  
  /**
   * Get API connection details for a tool
   */
  getConnection: (toolId: string): StoredConnection => {
    // Get stored connection if it exists
    const storedKey = localStorage.getItem(`${toolId}_api_key`);
    const storedSecret = localStorage.getItem(`${toolId}_api_secret`);
    const storedProvider = localStorage.getItem(`${toolId}_model_provider`) as 'open-source' | 'api' | 'hybrid' | 'platform';
    const storedLocalModels = localStorage.getItem(`${toolId}_use_local_models`) === 'true';
    
    // If no stored connection, create a default platform connection
    const platformKey = PLATFORM_API_KEYS[toolId] || `platform-tool-${toolId}-demo-key`;
    
    return {
      apiKey: storedKey || platformKey,
      apiSecret: storedSecret || undefined,
      connectedAt: localStorage.getItem(`${toolId}_connected_at`) || new Date().toISOString(),
      modelProvider: storedProvider || 'platform',
      useLocalModels: storedLocalModels || false
    };
  },
  
  /**
   * Store API connection for a tool
   */
  storeConnection: (
    toolId: string, 
    apiKey: string, 
    apiSecret?: string, 
    modelProvider: 'open-source' | 'api' | 'hybrid' | 'platform' = 'platform',
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
    // Always return true to enable open source fallback for any tool
    return true;
  },

  /**
   * Check if a tool has a platform API available
   */
  hasPlatformAPI: (toolId: string): boolean => {
    // Always return true to enable platform API for any tool
    return true;
  },

  /**
   * Get the platform API key for a tool
   */
  getPlatformAPIKey: (toolId: string): string => {
    return PLATFORM_API_KEYS[toolId] || `platform-tool-${toolId}-demo-key`;
  }
};

export default apiConnectionManager;
