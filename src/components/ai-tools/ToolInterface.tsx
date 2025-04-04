
import React, { useState } from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Check, Settings, Terminal, Code, HelpCircle, LineChart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ToolInterfaceProps {
  tool: AIToolItem;
  onBack: () => void;
}

const ToolInterface: React.FC<ToolInterfaceProps> = ({ tool, onBack }) => {
  const [activeTab, setActiveTab] = useState<string>('main');
  const { toast } = useToast();
  
  // Placeholder function for tool actions
  const handleAction = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} action for ${tool.name}`,
    });
  };
  
  // Render different interfaces based on tool category
  const renderToolInterface = () => {
    switch (tool.category) {
      case 'analytics':
        return <AnalyticsToolInterface tool={tool} handleAction={handleAction} />;
      case 'automation':
        return <AutomationToolInterface tool={tool} handleAction={handleAction} />;
      case 'content':
        return <ContentToolInterface tool={tool} handleAction={handleAction} />;
      case 'development':
        return <DevelopmentToolInterface tool={tool} handleAction={handleAction} />;
      case 'learning':
        return <LearningToolInterface tool={tool} handleAction={handleAction} />;
      case 'collaboration':
        return <CollaborationToolInterface tool={tool} handleAction={handleAction} />;
      case 'community':
        return <CommunityToolInterface tool={tool} handleAction={handleAction} />;
      case 'monetization':
        return <MonetizationToolInterface tool={tool} handleAction={handleAction} />;
      case 'security':
        return <SecurityToolInterface tool={tool} handleAction={handleAction} />;
      case 'integration':
        return <IntegrationToolInterface tool={tool} handleAction={handleAction} />;
      default:
        return <DefaultToolInterface tool={tool} handleAction={handleAction} />;
    }
  };
  
  return (
    <div className="bg-black min-h-[80vh] rounded-lg border border-[#00FFFF]/20 overflow-hidden">
      <div className="p-4 border-b border-[#00FFFF]/20 flex items-center justify-between bg-black/50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-[#00FFFF] hover:text-white hover:bg-[#00FFFF]/10">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div className="flex items-center">
            <div className="h-8 w-8 bg-[#00FFFF]/10 rounded flex items-center justify-center text-[#00FFFF] mr-2">
              {tool.icon}
            </div>
            <h2 className="text-lg font-bold text-white">{tool.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-[#00FFFF]/30 text-gray-300 hover:bg-[#00FFFF]/10">
            <HelpCircle className="h-4 w-4 mr-1" /> Help
          </Button>
          <Button variant="outline" size="sm" className="border-[#00FFFF]/30 text-gray-300 hover:bg-[#00FFFF]/10">
            <Settings className="h-4 w-4 mr-1" /> Settings
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-black/80 border border-[#00FFFF]/20">
            <TabsTrigger value="main" className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]">
              Main
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]">
              Settings
            </TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:bg-[#00FFFF]/10 data-[state=active]:text-[#00FFFF]">
              Documentation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="main" className="p-2">
            {renderToolInterface()}
          </TabsContent>
          
          <TabsContent value="settings" className="p-2">
            <Card className="bg-black/30 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-[#00FFFF]">Tool Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure {tool.name} settings for your workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">API Key</label>
                    <Input 
                      placeholder="Enter your API key if needed" 
                      className="bg-black/60 border-[#00FFFF]/20 text-white focus:border-[#00FFFF]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-1 block">Default Output Format</label>
                    <select className="w-full bg-black/60 border border-[#00FFFF]/20 rounded p-2 text-white">
                      <option value="json">JSON</option>
                      <option value="text">Plain Text</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80">
                  <Check className="h-4 w-4 mr-2" /> Save Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="help" className="p-2">
            <Card className="bg-black/30 border-[#00FFFF]/20">
              <CardHeader>
                <CardTitle className="text-[#00FFFF]">Documentation</CardTitle>
                <CardDescription className="text-gray-400">
                  Learn how to use {tool.name} effectively
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-invert">
                <h3 className="text-lg text-gray-200">Getting Started</h3>
                <p className="text-gray-400">
                  This tool helps you {tool.description.toLowerCase()}. 
                  Use the main interface to interact with its core functionality.
                </p>
                <h3 className="text-lg text-gray-200 mt-4">Unique Features</h3>
                <p className="text-gray-400">{tool.uniqueSellingPoint}</p>
                
                <h3 className="text-lg text-gray-200 mt-4">Usage Examples</h3>
                <div className="bg-black/60 p-3 rounded border border-[#00FFFF]/20 font-mono text-sm text-gray-300 my-2">
                  # Example usage code or commands would go here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Specific tool interfaces based on category
const AnalyticsToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <div className="space-y-4">
      <Alert className="bg-[#00FFFF]/5 border-[#00FFFF]/20">
        <LineChart className="h-4 w-4 text-[#00FFFF]" />
        <AlertDescription className="text-gray-300">
          Welcome to {tool.name}. This analytics tool helps you visualize and interpret data.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/30 col-span-2 border-[#00FFFF]/20">
          <CardHeader>
            <CardTitle className="text-[#00FFFF]">Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="h-[200px] w-full bg-gradient-to-tr from-[#00FFFF]/10 to-[#8000FF]/10 rounded-lg border border-dashed border-[#00FFFF]/30 flex items-center justify-center">
                <p className="text-[#00FFFF]">Analytics Dashboard Preview</p>
              </div>
              <Button 
                className="mt-4 bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80"
                onClick={() => handleAction('generate-report')}
              >
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Card className="bg-black/30 border-[#00FFFF]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#00FFFF] text-sm">Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Website</span>
                  <span className="text-[#00FFFF]">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">CRM</span>
                  <span className="text-[#FF007F]">Disconnected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Social Media</span>
                  <span className="text-[#00FFFF]">Connected</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 border-[#00FFFF]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#00FFFF] text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('import-data')}
                >
                  Import Data
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('export-csv')}
                >
                  Export as CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('scheduled-reports')}
                >
                  Scheduled Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AutomationToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-black/30 border-[#00FFFF]/20">
          <CardHeader>
            <CardTitle className="text-[#00FFFF]">Workflow Builder</CardTitle>
            <CardDescription className="text-gray-400">Create automated workflows with drag-and-drop</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] border border-dashed border-[#00FFFF]/30 bg-[#00FFFF]/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#00FFFF] mb-4">Drag and drop workflow elements here</p>
              <Button 
                className="bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80"
                onClick={() => handleAction('create-workflow')}
              >
                Create New Workflow
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Card className="bg-black/30 border-[#00FFFF]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#00FFFF] text-sm">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('load-template-email')}
                >
                  Email Response
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('load-template-notification')}
                >
                  Notification System
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('load-template-data')}
                >
                  Data Processor
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 border-[#00FFFF]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#00FFFF] text-sm">Active Automations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Daily Report</span>
                  <span className="text-[#00FFFF]">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Lead Nurturing</span>
                  <span className="text-[#00FFFF]">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Social Media Posts</span>
                  <span className="text-[#FF007F]">Paused</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ContentToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="bg-black/30 border-[#00FFFF]/20 h-full">
            <CardHeader>
              <CardTitle className="text-[#00FFFF]">Content Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Topic or Keywords</label>
                  <Input 
                    placeholder="E.g., AI tools, cryptocurrency, digital marketing" 
                    className="bg-black/60 border-[#00FFFF]/20 text-white focus:border-[#00FFFF]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Content Type</label>
                  <select className="w-full bg-black/60 border border-[#00FFFF]/20 rounded p-2 text-white">
                    <option value="blog">Blog Post</option>
                    <option value="social">Social Media Post</option>
                    <option value="email">Email Newsletter</option>
                    <option value="ad">Ad Copy</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Tone</label>
                  <select className="w-full bg-black/60 border border-[#00FFFF]/20 rounded p-2 text-white">
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="enthusiastic">Enthusiastic</option>
                    <option value="informative">Informative</option>
                    <option value="persuasive">Persuasive</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Additional Instructions</label>
                  <Textarea 
                    placeholder="Add any specific requirements for the content" 
                    className="bg-black/60 border-[#00FFFF]/20 text-white focus:border-[#00FFFF]"
                  />
                </div>
                <Button 
                  className="w-full bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80"
                  onClick={() => handleAction('generate-content')}
                >
                  Generate Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="bg-black/30 border-[#00FFFF]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#00FFFF] text-sm">Content History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('load-content-1')}
                >
                  Blog Post: AI Tools Overview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('load-content-2')}
                >
                  Twitter Thread: Data Science
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('load-content-3')}
                >
                  Email: Product Launch
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/30 border-[#00FFFF]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#00FFFF] text-sm">Quick Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('rephrase')}
                >
                  Rephrase Text
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('summarize')}
                >
                  Summarize Text
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('grammar-check')}
                >
                  Grammar Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DevelopmentToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-black/30 border-[#00FFFF]/20">
          <CardHeader>
            <CardTitle className="text-[#00FFFF]">Model Builder</CardTitle>
            <CardDescription className="text-gray-400">Create and train machine learning models</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Model Type</label>
                <select className="w-full bg-black/60 border border-[#00FFFF]/20 rounded p-2 text-white">
                  <option value="classification">Classification</option>
                  <option value="regression">Regression</option>
                  <option value="nlp">Natural Language Processing</option>
                  <option value="vision">Computer Vision</option>
                </select>
              </div>
              
              <div className="border border-dashed border-[#00FFFF]/30 bg-[#00FFFF]/5 rounded-lg p-4 text-center">
                <p className="text-gray-400 mb-2">Drag and drop your dataset here</p>
                <Button 
                  variant="outline" 
                  className="border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('upload-dataset')}
                >
                  Browse Files
                </Button>
              </div>
              
              <Button 
                className="w-full bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80"
                onClick={() => handleAction('build-model')}
              >
                Build Model
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-[#00FFFF]/20">
          <CardHeader>
            <CardTitle className="text-[#00FFFF]">Code Editor</CardTitle>
            <CardDescription className="text-gray-400">Custom code implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-black border border-[#00FFFF]/20 rounded-lg p-3 font-mono text-sm h-[240px] overflow-auto">
                <pre className="text-[#00FFFF]">
                  <code>
{`# Sample Python code
import numpy as np
import pandas as pd

def preprocess_data(data):
    # Perform data cleaning and transformation
    return processed_data

# Load your model
model = load_model('path/to/model')

# Make predictions
predictions = model.predict(data)`}
                  </code>
                </pre>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  className="border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                  onClick={() => handleAction('run-code')}
                >
                  <Terminal className="h-4 w-4 mr-1" /> Run Code
                </Button>
                <Button 
                  className="bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80"
                  onClick={() => handleAction('deploy-code')}
                >
                  <Code className="h-4 w-4 mr-1" /> Deploy Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-black/30 border-[#00FFFF]/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#00FFFF] text-sm">Model Repository</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10 overflow-hidden"
                onClick={() => handleAction('load-model-1')}
              >
                <span className="truncate">Sentiment Analysis</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10 overflow-hidden"
                onClick={() => handleAction('load-model-2')}
              >
                <span className="truncate">Image Classifier</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="justify-start border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10 overflow-hidden"
                onClick={() => handleAction('load-model-3')}
              >
                <span className="truncate">Recommendation Engine</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// More simplified interfaces for other categories
const LearningToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-black/30 border-[#00FFFF]/20">
        <CardHeader>
          <CardTitle className="text-[#00FFFF]">Learning Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
              onClick={() => handleAction('module-1')}
            >
              <div>
                <div className="font-medium">Introduction to AI</div>
                <div className="text-xs text-gray-400">Foundation concepts and history</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
              onClick={() => handleAction('module-2')}
            >
              <div>
                <div className="font-medium">Machine Learning Basics</div>
                <div className="text-xs text-gray-400">Supervised and unsupervised learning</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
              onClick={() => handleAction('module-3')}
            >
              <div>
                <div className="font-medium">Neural Networks</div>
                <div className="text-xs text-gray-400">Deep learning architectures</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/30 border-[#00FFFF]/20">
        <CardHeader>
          <CardTitle className="text-[#00FFFF]">Interactive Lab</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] border border-dashed border-[#00FFFF]/30 bg-[#00FFFF]/5 rounded-lg flex items-center justify-center mb-4">
            <p className="text-[#00FFFF]">AI Simulation Environment</p>
          </div>
          <Button 
            className="w-full bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80"
            onClick={() => handleAction('start-lab')}
          >
            Start Interactive Lab
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const CollaborationToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-2 bg-black/30 border-[#00FFFF]/20">
        <CardHeader>
          <CardTitle className="text-[#00FFFF]">Shared Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] border border-dashed border-[#00FFFF]/30 bg-[#00FFFF]/5 rounded-lg flex items-center justify-center">
            <p className="text-[#00FFFF]">Collaborative Document Editor</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <Card className="bg-black/30 border-[#00FFFF]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#00FFFF] text-sm">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#00FFFF]/30"></div>
                <span className="text-gray-300">Alex Kim</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#FF007F]/30"></div>
                <span className="text-gray-300">Jamie Taylor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#8000FF]/30"></div>
                <span className="text-gray-300">Jordan Smith</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4 border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
              onClick={() => handleAction('invite-member')}
            >
              Invite Team Member
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-[#00FFFF]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#00FFFF] text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                onClick={() => handleAction('share-document')}
              >
                Share Document
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-[#00FFFF]/20 text-gray-300 hover:bg-[#00FFFF]/10"
                onClick={() => handleAction('start-meeting')}
              >
                Start Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Simple generic interface for remaining categories
const CommunityToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <DefaultToolInterface tool={tool} handleAction={handleAction} />
  );
};

const MonetizationToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <DefaultToolInterface tool={tool} handleAction={handleAction} />
  );
};

const SecurityToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <DefaultToolInterface tool={tool} handleAction={handleAction} />
  );
};

const IntegrationToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <DefaultToolInterface tool={tool} handleAction={handleAction} />
  );
};

// Default interface for any categories without specific implementation
const DefaultToolInterface: React.FC<{tool: AIToolItem; handleAction: (action: string) => void}> = ({ tool, handleAction }) => {
  return (
    <div className="space-y-4">
      <Alert className="bg-[#00FFFF]/5 border-[#00FFFF]/20">
        <AlertDescription className="text-gray-300">
          Welcome to {tool.name}. This tool helps you {tool.description.toLowerCase()}.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-black/30 border-[#00FFFF]/20">
          <CardHeader>
            <CardTitle className="text-[#00FFFF]">Main Functionality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] border border-dashed border-[#00FFFF]/30 bg-[#00FFFF]/5 rounded-lg flex items-center justify-center mb-4">
              <p className="text-[#00FFFF]">{tool.name} Interface</p>
            </div>
            <Button 
              className="w-full bg-[#00FFFF] text-black hover:bg-[#00FFFF]/80"
              onClick={() => handleAction('start-tool')}
            >
              Start Using {tool.name}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-black/30 border-[#00FFFF]/20">
          <CardHeader>
            <CardTitle className="text-[#00FFFF]">Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="bg-[#00FFFF]/20 text-[#00FFFF] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <p className="text-gray-300 text-sm">
                  Configure your settings in the Settings tab
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-[#00FFFF]/20 text-[#00FFFF] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <p className="text-gray-300 text-sm">
                  Import your data or connect to existing data sources
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-[#00FFFF]/20 text-[#00FFFF] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <p className="text-gray-300 text-sm">
                  Use the main interface to interact with {tool.name}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-[#00FFFF]/20 text-[#00FFFF] h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <p className="text-gray-300 text-sm">
                  Export your results or share with your team
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ToolInterface;
