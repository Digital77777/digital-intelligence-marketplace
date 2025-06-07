
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, MessageSquare, Globe, Zap, Shield } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';

interface ToolDetailTabsProps {
  tool: AIToolItem;
}

const ToolDetailTabs: React.FC<ToolDetailTabsProps> = ({ tool }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>About {tool.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{tool.rationale || tool.description}</p>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Unique Selling Point</h4>
              <p className="text-green-700">{tool.uniqueSellingPoint || "Advanced AI-powered capabilities with intuitive interface"}</p>
            </div>
            
            {tool.usageLimit && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Usage Limits</h4>
                <p className="text-blue-700">{tool.usageLimit}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="features" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Intuitive Interface</h4>
                  <p className="text-sm text-gray-600">Easy-to-use design for all skill levels</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Cloud Integration</h4>
                  <p className="text-sm text-gray-600">Seamless cloud-based processing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Fast Processing</h4>
                  <p className="text-sm text-gray-600">Quick results with optimized algorithms</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Secure & Private</h4>
                  <p className="text-sm text-gray-600">Your data is protected and encrypted</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="use-cases" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tool.use_cases?.map((useCase, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{useCase}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="integrations" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tool.integrations?.map((integration, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="font-medium text-sm">{integration}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ToolDetailTabs;
