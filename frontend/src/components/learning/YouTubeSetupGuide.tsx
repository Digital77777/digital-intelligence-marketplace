
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Youtube, 
  ExternalLink, 
  Key, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';

const YouTubeSetupGuide: React.FC = () => {
  const [isApiKeySet, setIsApiKeySet] = useState(!!import.meta.env.VITE_YOUTUBE_API_KEY);
  const [showSteps, setShowSteps] = useState(!isApiKeySet);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const setupSteps = [
    {
      title: 'Create a Google Cloud Project',
      description: 'Go to the Google Cloud Console and create a new project or select an existing one.',
      link: 'https://console.cloud.google.com/',
      linkText: 'Google Cloud Console'
    },
    {
      title: 'Enable YouTube Data API v3',
      description: 'In the Google Cloud Console, navigate to APIs & Services > Library and enable the YouTube Data API v3.',
      link: 'https://console.cloud.google.com/apis/library/youtube.googleapis.com',
      linkText: 'Enable YouTube API'
    },
    {
      title: 'Create API Credentials',
      description: 'Go to APIs & Services > Credentials and create a new API key. Restrict it to YouTube Data API v3 for security.',
      link: 'https://console.cloud.google.com/apis/credentials',
      linkText: 'Create Credentials'
    },
    {
      title: 'Add Environment Variable',
      description: 'Add your API key as VITE_YOUTUBE_API_KEY in your environment configuration.',
      code: 'VITE_YOUTUBE_API_KEY=your_api_key_here'
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-500" />
            <CardTitle>YouTube Integration Setup</CardTitle>
            <Badge variant={isApiKeySet ? "default" : "secondary"}>
              {isApiKeySet ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Demo Mode
                </>
              )}
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowSteps(!showSteps)}
          >
            {showSteps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showSteps ? 'Hide' : 'Show'} Setup
          </Button>
        </div>
      </CardHeader>
      
      {showSteps && (
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-400 mb-1">
                    {isApiKeySet ? 'YouTube API Connected' : 'Demo Mode Active'}
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    {isApiKeySet 
                      ? 'You have successfully connected to the YouTube Data API and can access real educational content.'
                      : 'Currently showing sample data. Follow the steps below to connect to YouTube\'s educational content.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {!isApiKeySet && (
              <div className="space-y-4">
                <h4 className="font-medium">Setup Instructions:</h4>
                
                {setupSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium mb-2">{step.title}</h5>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      
                      {step.link && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={step.link} target="_blank" rel="noopener noreferrer">
                            {step.linkText}
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      
                      {step.code && (
                        <div className="bg-muted p-3 rounded-md font-mono text-sm">
                          <div className="flex items-center justify-between">
                            <code>{step.code}</code>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(step.code)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900/30">
                  <div className="flex items-start gap-3">
                    <Key className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-900 dark:text-amber-400 mb-1">
                        API Key Security
                      </h4>
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        YouTube Data API keys are safe to use in client-side applications. However, make sure to restrict your API key to only the YouTube Data API v3 and consider setting up usage quotas to prevent abuse.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="https://developers.google.com/youtube/v3/getting-started" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube API Docs
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
              
              <Button variant="outline" asChild>
                <a href="https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas" target="_blank" rel="noopener noreferrer">
                  API Quotas
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default YouTubeSetupGuide;
