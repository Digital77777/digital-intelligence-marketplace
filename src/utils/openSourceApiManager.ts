
/**
 * Open Source API Keys Manager for Freemium Tier Tools
 * Manages connections to open source APIs and services
 */

interface OpenSourceConfig {
  apiKey?: string;
  endpoint?: string;
  model?: string;
  provider: 'huggingface' | 'replicate' | 'openai' | 'stability' | 'local';
}

interface FreemiumToolConfig {
  [toolId: string]: OpenSourceConfig;
}

// Default open source configurations for each Freemium tool
const DEFAULT_CONFIGS: FreemiumToolConfig = {
  '1': { // AI Image Generator
    provider: 'huggingface',
    model: 'stabilityai/stable-diffusion-xl-base-1.0',
    endpoint: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0'
  },
  '2': { // AI Text Summarizer
    provider: 'huggingface',
    model: 'facebook/bart-large-cnn',
    endpoint: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn'
  },
  '3': { // AI Presentation Maker
    provider: 'huggingface',
    model: 'microsoft/DialoGPT-medium',
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium'
  },
  '4': { // AI Language Translator
    provider: 'huggingface',
    model: 'facebook/mbart-large-50-many-to-many-mmt',
    endpoint: 'https://api-inference.huggingface.co/models/facebook/mbart-large-50-many-to-many-mmt'
  },
  '5': { // InsightLite
    provider: 'local',
    model: 'data-analysis-lite'
  },
  '6': { // TaskBot Mini
    provider: 'local',
    model: 'task-automation'
  },
  '7': { // CopyCraft Free
    provider: 'huggingface',
    model: 'gpt2',
    endpoint: 'https://api-inference.huggingface.co/models/gpt2'
  },
  '8': { // AI Basic Simulator
    provider: 'local',
    model: 'ml-simulator'
  },
  '9': { // Forum Assistant
    provider: 'huggingface',
    model: 'microsoft/DialoGPT-small',
    endpoint: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-small'
  }
};

export class OpenSourceApiManager {
  private static instance: OpenSourceApiManager;
  private configs: FreemiumToolConfig = {};

  private constructor() {
    this.loadConfigs();
  }

  static getInstance(): OpenSourceApiManager {
    if (!OpenSourceApiManager.instance) {
      OpenSourceApiManager.instance = new OpenSourceApiManager();
    }
    return OpenSourceApiManager.instance;
  }

  private loadConfigs(): void {
    try {
      const stored = localStorage.getItem('freemium_api_configs');
      if (stored) {
        this.configs = { ...DEFAULT_CONFIGS, ...JSON.parse(stored) };
      } else {
        this.configs = { ...DEFAULT_CONFIGS };
      }
    } catch (error) {
      console.error('Failed to load API configs:', error);
      this.configs = { ...DEFAULT_CONFIGS };
    }
  }

  private saveConfigs(): void {
    try {
      localStorage.setItem('freemium_api_configs', JSON.stringify(this.configs));
    } catch (error) {
      console.error('Failed to save API configs:', error);
    }
  }

  getConfig(toolId: string): OpenSourceConfig | null {
    return this.configs[toolId] || null;
  }

  setApiKey(toolId: string, apiKey: string): void {
    if (!this.configs[toolId]) {
      this.configs[toolId] = { ...DEFAULT_CONFIGS[toolId] };
    }
    this.configs[toolId].apiKey = apiKey;
    this.saveConfigs();
  }

  hasApiKey(toolId: string): boolean {
    const config = this.configs[toolId];
    return !!(config?.apiKey || config?.provider === 'local');
  }

  async callApi(toolId: string, input: string): Promise<{ success: boolean; result: string; error?: string }> {
    const config = this.getConfig(toolId);
    if (!config) {
      return { success: false, result: '', error: 'No configuration found for this tool' };
    }

    try {
      if (config.provider === 'local') {
        return this.handleLocalProcessing(toolId, input);
      }

      if (config.provider === 'huggingface') {
        return this.callHuggingFace(config, input);
      }

      return { success: false, result: '', error: 'Unsupported provider' };
    } catch (error) {
      console.error(`API call failed for tool ${toolId}:`, error);
      return { success: false, result: '', error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private async callHuggingFace(config: OpenSourceConfig, input: string): Promise<{ success: boolean; result: string; error?: string }> {
    if (!config.endpoint) {
      return { success: false, result: '', error: 'No endpoint configured' };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (config.apiKey) {
      headers['Authorization'] = `Bearer ${config.apiKey}`;
    }

    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ inputs: input }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, result: '', error: `API call failed: ${errorText}` };
    }

    const result = await response.json();
    
    // Handle different response formats from HuggingFace
    let processedResult = '';
    if (Array.isArray(result)) {
      processedResult = result[0]?.generated_text || result[0]?.summary_text || JSON.stringify(result[0]);
    } else if (result.generated_text) {
      processedResult = result.generated_text;
    } else if (result.summary_text) {
      processedResult = result.summary_text;
    } else {
      processedResult = JSON.stringify(result);
    }

    return { success: true, result: processedResult };
  }

  private async handleLocalProcessing(toolId: string, input: string): Promise<{ success: boolean; result: string; error?: string }> {
    // Mock local processing for tools that don't need external APIs
    switch (toolId) {
      case '5': // InsightLite
        return {
          success: true,
          result: `Data Analysis Results:\n\n• Input contains ${input.length} characters\n• Estimated processing time: 2-3 seconds\n• Key insights: Data appears to be ${input.includes('sales') ? 'sales-related' : 'general purpose'}\n• Recommendation: Further analysis recommended for production use`
        };
      case '6': // TaskBot Mini
        return {
          success: true,
          result: `Task Automation Setup:\n\n• Task type: ${input.includes('schedule') ? 'Scheduling' : 'General automation'}\n• Complexity: Basic\n• Estimated setup time: 5 minutes\n• Status: Ready for configuration\n• Next steps: Configure triggers and actions`
        };
      case '8': // AI Basic Simulator
        return {
          success: true,
          result: `ML Simulation Results:\n\n• Model type: Basic classifier\n• Training data: Simulated dataset\n• Accuracy: 85.3%\n• Performance: Good for demo purposes\n• Recommendation: Use real data for production models`
        };
      default:
        return {
          success: true,
          result: `Processing completed for: ${input.substring(0, 100)}${input.length > 100 ? '...' : ''}\n\nThis is a demonstration of the ${toolId} tool functionality.`
        };
    }
  }

  getAvailableProviders(): string[] {
    return ['huggingface', 'local'];
  }

  getDefaultConfig(toolId: string): OpenSourceConfig | null {
    return DEFAULT_CONFIGS[toolId] || null;
  }
}

export default OpenSourceApiManager.getInstance();
