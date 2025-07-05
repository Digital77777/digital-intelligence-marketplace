
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Key, Globe, Zap, ExternalLink } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import openSourceApiManager from '@/utils/openSourceApiManager';

interface FreemiumApiSetupProps {
  tool: AIToolItem;
  onSuccess: () => void;
  onCancel: () => void;
}

const FreemiumApiSetup: React.FC<FreemiumApiSetupProps> = ({
  tool,
  onSuccess,
  onCancel
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const config = openSourceApiManager.getConfig(tool.id);
  const hasExistingKey = openSourceApiManager.hasApiKey(tool.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (config?.provider === 'local') {
        // Local tools don't need API keys
        onSuccess();
        return;
      }

      if (apiKey.trim()) {
        openSourceApiManager.setApiKey(tool.id, apiKey.trim());
      }
      
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Setup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // For local tools or when user wants to skip API setup
    onSuccess();
  };

  if (!config) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600">Configuration Error</CardTitle>
          <CardDescription>
            No configuration found for {tool.name}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" onClick={onCancel}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-600" />
          Setup {tool.name}
        </CardTitle>
        <CardDescription>
          Configure your free API access for {tool.name}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div>
            <p className="font-medium text-blue-900">Provider</p>
            <p className="text-sm text-blue-700 capitalize">{config.provider}</p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Free Tier
          </Badge>
        </div>

        {config.model && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Model</p>
            <p className="text-sm text-gray-600">{config.model}</p>
          </div>
        )}

        {config.provider === 'local' ? (
          <Alert className="bg-green-50 border-green-200">
            <Zap className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              This tool runs locally in your browser. No API key required!
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {!hasExistingKey && (
              <Alert className="bg-blue-50 border-blue-200">
                <Globe className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Get your free API key from Hugging Face to unlock full functionality.
                  <a 
                    href="https://huggingface.co/settings/tokens" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 ml-2 text-blue-600 hover:text-blue-800"
                  >
                    Get API Key <ExternalLink className="h-3 w-3" />
                  </a>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Hugging Face API Key {!hasExistingKey && "(Optional)"}
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder={hasExistingKey ? "Enter new API key to update" : "hf_xxxxxxxxxxxxxxxxxxxx"}
                  className="font-mono"
                />
                <p className="text-xs text-gray-600">
                  {hasExistingKey 
                    ? "You already have an API key configured. Enter a new one to update it."
                    : "Optional: Add your API key for better rate limits and performance"
                  }
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        
        <div className="flex gap-2">
          {config.provider !== 'local' && !hasExistingKey && (
            <Button variant="ghost" onClick={handleSkip}>
              Skip for Now
            </Button>
          )}
          <Button 
            onClick={config.provider === 'local' ? handleSkip : handleSubmit}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Setting up..." : config.provider === 'local' ? "Continue" : "Save & Continue"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FreemiumApiSetup;
