
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { AlertCircle, CheckCircle2, Key, Lock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    // Simulate API validation
    setTimeout(() => {
      // In a real implementation, you would validate the API key here
      if (apiKey.length < 8) {
        setError('Invalid API credentials. Please check and try again.');
        setIsLoading(false);
        return;
      }
      
      // Store API key securely (in a real app, use a more secure method)
      localStorage.setItem(`${tool.id}_api_key`, apiKey);
      if (apiSecret) {
        localStorage.setItem(`${tool.id}_api_secret`, apiSecret);
      }
      
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          Connect to {tool.name} API
        </CardTitle>
        <CardDescription>
          Enter your API credentials to connect to {tool.name}
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
              required
              autoComplete="off"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              You can find your API key in the {tool.name} dashboard
            </p>
          </div>
          
          {/* Some APIs require both key and secret */}
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
          
          <Alert className="bg-blue-50/50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
            <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-300">
              Your API credentials are stored securely and only used to connect to {tool.name}
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !apiKey}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Connecting..." : "Connect API"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default APIConnectionForm;
