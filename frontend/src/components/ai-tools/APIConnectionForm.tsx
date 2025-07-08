
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { AlertCircle, CheckCircle2, Key, Lock, Server, Globe } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import apiConnectionManager from '@/utils/apiConnectionManager';

interface APIConnectionFormProps {
  tool: AIToolItem;
  onSuccess: () => void;
  onCancel: () => void;
}

const APIConnectionForm: React.FC<APIConnectionFormProps> = ({
  tool,
  onSuccess,
  onCancel
}) => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelProvider, setModelProvider] = useState<'open-source' | 'api' | 'hybrid' | 'platform'>('platform');
  const [useLocalModels, setUseLocalModels] = useState(false);
  
  const hasOpenSourceOption = apiConnectionManager.hasOpenSourceAlternative(tool.id);
  const hasPlatformAPI = apiConnectionManager.hasPlatformAPI(tool.id);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    // If using platform API, don't need validation
    if (modelProvider === 'platform') {
      apiConnectionManager.storeConnection(
        tool.id,
        apiConnectionManager.getPlatformAPIKey(tool.id) || 'platform-api-key',
        undefined,
        'platform',
        false
      );
      
      setIsLoading(false);
      onSuccess();
      return;
    }
    
    // If using open-source models, we don't need API key validation
    const isApiKeyNeeded = modelProvider !== 'open-source';
    
    // Simulate API validation
    setTimeout(() => {
      // For API or hybrid modes, validate API key
      if (isApiKeyNeeded && apiKey.length < 8) {
        setError('Invalid API credentials. Please check and try again.');
        setIsLoading(false);
        return;
      }
      
      // Store connection details
      apiConnectionManager.storeConnection(
        tool.id, 
        apiKey, 
        apiSecret,
        modelProvider,
        useLocalModels
      );
      
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          Connect to {tool.name}
        </CardTitle>
        <CardDescription>
          Set up {tool.name} with our platform API, your own API credentials, or use open-source alternatives
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3 mb-2">
            <Label>Model Provider</Label>
            <RadioGroup 
              defaultValue={modelProvider} 
              onValueChange={(value) => setModelProvider(value as 'open-source' | 'api' | 'hybrid' | 'platform')}
              className="flex flex-col space-y-1"
            >
              {hasPlatformAPI && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="platform" id="platform" />
                  <Label htmlFor="platform" className="cursor-pointer flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5 text-green-600" /> 
                    <span>Platform API (Recommended)</span>
                  </Label>
                </div>
              )}
              
              {hasOpenSourceOption && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="open-source" id="open-source" />
                  <Label htmlFor="open-source" className="cursor-pointer flex items-center gap-1">
                    <Server className="h-3.5 w-3.5 text-amber-600" /> 
                    <span>Open Source Only</span>
                  </Label>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="api" id="api" />
                <Label htmlFor="api" className="cursor-pointer flex items-center gap-1">
                  <Key className="h-3.5 w-3.5 text-blue-600" /> 
                  <span>Custom API</span>
                </Label>
              </div>
              
              {hasOpenSourceOption && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="hybrid" />
                  <Label htmlFor="hybrid" className="cursor-pointer flex items-center gap-1">
                    <Key className="h-3.5 w-3.5 text-purple-600" /> 
                    <span>Hybrid (API with Open Source fallback)</span>
                  </Label>
                </div>
              )}
            </RadioGroup>
          </div>
          
          {modelProvider === 'platform' && hasPlatformAPI && (
            <Alert className="bg-green-50/50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
              <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-300">
                Using our platform API - all functionality is pre-configured and ready to use.
              </AlertDescription>
            </Alert>
          )}
          
          {(modelProvider === 'open-source' || modelProvider === 'hybrid') && hasOpenSourceOption && (
            <Alert className="bg-amber-50/50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
              <Server className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-amber-800 dark:text-amber-300">
                This tool supports the open-source model: {apiConnectionManager.getOpenSourceModel(tool.id)}
              </AlertDescription>
            </Alert>
          )}
          
          {(modelProvider === 'open-source' || modelProvider === 'hybrid') && (
            <div className="flex items-center justify-between">
              <Label htmlFor="use-local-models">Run models locally (requires more RAM)</Label>
              <Switch
                id="use-local-models"
                checked={useLocalModels}
                onCheckedChange={setUseLocalModels}
              />
            </div>
          )}
          
          {modelProvider !== 'open-source' && modelProvider !== 'platform' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" /> API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  required={modelProvider === 'api'}
                  autoComplete="off"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  You can find your API key in the {tool.name} dashboard
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiSecret" className="flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" /> API Secret (Optional)
                </Label>
                <Input
                  id="apiSecret"
                  type="password"
                  value={apiSecret}
                  onChange={e => setApiSecret(e.target.value)}
                  placeholder="Enter your API secret if required"
                  autoComplete="off"
                  className="font-mono"
                />
              </div>
            </>
          )}
          
          {modelProvider === 'platform' && (
            <Alert className="bg-blue-50/50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-300">
                All platform API usage is included in your subscription. No extra setup needed.
              </AlertDescription>
            </Alert>
          )}
          
          {modelProvider === 'open-source' && (
            <Alert className="bg-blue-50/50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-300">
                Open-source models run in your browser and don't send data to external services
              </AlertDescription>
            </Alert>
          )}
          
          {(modelProvider === 'api' || modelProvider === 'hybrid') && (
            <Alert className="bg-blue-50/50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-300">
                Your API credentials are stored securely and only used to connect to {tool.name}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || (modelProvider === 'api' && !apiKey)}
          className={modelProvider === 'platform' ? 
            "bg-green-600 hover:bg-green-700 text-white" : 
            "bg-blue-600 hover:bg-blue-700 text-white"}
        >
          {isLoading ? "Connecting..." : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default APIConnectionForm;
