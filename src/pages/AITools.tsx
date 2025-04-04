
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTier } from '@/context/TierContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { aiTools } from '@/data/ai-tools-tiers';

type CoreTool = {
  id: number;
  name: string;
  description: string;
  useCases: string[];
  rationale: string;
  icon: React.ReactNode;
}

const coreTools: CoreTool[] = [
  {
    id: 1,
    name: "Hugging Face Transformers",
    description: "A library offering state-of-the-art natural language processing (NLP) models.",
    useCases: ["Text generation", "Sentiment analysis", "Language translation"],
    rationale: "Its versatility and community support make it a foundational NLP tool.",
    icon: "🤗"
  },
  {
    id: 2,
    name: "OpenCV",
    description: "An open-source computer vision library.",
    useCases: ["Image processing", "Object detection", "Video analysis"],
    rationale: "Essential for projects involving real-time visual data processing.",
    icon: "👁️"
  },
  {
    id: 3,
    name: "Scikit-learn",
    description: "A Python library for machine learning with a focus on data mining and analysis.",
    useCases: ["Classification", "Regression", "Clustering", "Model evaluation"],
    rationale: "Its simplicity and robustness make it a staple for ML projects.",
    icon: "🧪"
  },
  {
    id: 4,
    name: "Apache Airflow",
    description: "A platform to programmatically author, schedule, and monitor workflows.",
    useCases: ["ETL pipelines", "Workflow automation", "Data processing tasks"],
    rationale: "It supports scalable, reproducible automation—a key component in data workflows.",
    icon: "🔄"
  },
  {
    id: 5,
    name: "Pandas + Jupyter Notebook",
    description: "Pandas offers powerful data manipulation tools, while Jupyter Notebooks provide an interactive environment for development.",
    useCases: ["Data cleaning", "Analysis", "Visualization", "Exploratory data science"],
    rationale: "The combination is indispensable for data-centric development and rapid prototyping.",
    icon: "🐼📊"
  },
  {
    id: 6,
    name: "GitHub Copilot (Free Tier)",
    description: "An AI pair programmer that assists in code completion and suggestions.",
    useCases: ["Accelerating coding tasks", "Debugging", "Learning new languages and frameworks"],
    rationale: "Its integration helps lower the barrier for developers experimenting with AI.",
    icon: "👨‍💻"
  },
  {
    id: 7,
    name: "Mozilla DeepSpeech",
    description: "An open-source speech-to-text engine.",
    useCases: ["Transcription services", "Voice command applications", "Accessibility improvements"],
    rationale: "Enables users to experiment with speech recognition without heavy licensing fees.",
    icon: "🎤"
  },
  {
    id: 8,
    name: "GPT-2 (Hugging Face)",
    description: "A language generation model available via Hugging Face's repository.",
    useCases: ["Text completion", "Creative writing", "Chatbot development"],
    rationale: "Its accessibility offers a solid introduction to generative language models.",
    icon: "🤖"
  },
  {
    id: 9,
    name: "Metabase",
    description: "An open-source tool for data visualization and business intelligence.",
    useCases: ["Dashboard creation", "Data exploration", "Performance monitoring"],
    rationale: "It empowers users to derive insights from their AI-generated data.",
    icon: "📊"
  },
  {
    id: 10,
    name: "Slack (Free Tier)",
    description: "A communication platform facilitating collaboration and community support.",
    useCases: ["Developer communities", "Team collaboration", "Real-time support channels"],
    rationale: "Provides an avenue for community engagement and peer support.",
    icon: "💬"
  }
];

const AITools = () => {
  const { currentTier } = useTier();
  const navigate = useNavigate();
  
  // Get the freemium tools from aiTools array
  const freemiumTools = aiTools.filter(tool => tool.tier === 'freemium').slice(0, 5);
  
  const handleViewAllTools = () => {
    navigate('/marketplace');
  };
  
  const handleToolClick = (id: number) => {
    navigate(`/tool/${id}`);
  };
  
  const handleFreemiumToolClick = (id: string) => {
    navigate(`/tool/${id}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">AI Tools Directory</h1>
            {currentTier !== 'freemium' && (
              <Button onClick={handleViewAllTools}>
                View All Tools <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          
          {currentTier === 'freemium' ? (
            <div className="space-y-8">
              <div className="p-6 bg-muted/50 rounded-lg border">
                <h2 className="text-xl font-semibold mb-2">Freemium Access</h2>
                <p className="text-muted-foreground mb-4">
                  You're currently on the Freemium plan, which gives you access to our curated selection of 10 core AI tools.
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Upgrade to Basic or Pro to access the full directory of AI tools.
                  </p>
                  <Button variant="outline" onClick={() => navigate('/pricing')}>
                    See Pricing
                  </Button>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4">Core AI Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreTools.map((tool) => (
                  <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow border group">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{tool.icon}</div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-muted-foreground mb-3">{tool.description}</p>
                      
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">Use Cases:</h4>
                        <div className="flex flex-wrap gap-1">
                          {tool.useCases.map((useCase, index) => (
                            <Badge key={index} variant="secondary" className="mr-1 mb-1">
                              {useCase}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Why It Matters:</h4>
                        <p className="text-sm text-muted-foreground">{tool.rationale}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleToolClick(tool.id)}
                      >
                        <ExternalLink size={16} className="mr-2" /> Explore Tool
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Added section for freemium tools from the directory */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Featured Freemium Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {freemiumTools.map((tool) => (
                    <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow border group">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{tool.icon}</div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-muted-foreground mb-3">{tool.description}</p>
                        
                        {tool.use_cases && tool.use_cases.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-sm font-medium mb-1">Use Cases:</h4>
                            <div className="flex flex-wrap gap-1">
                              {tool.use_cases.map((useCase, index) => (
                                <Badge key={index} variant="secondary" className="mr-1 mb-1">
                                  {useCase}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {tool.rationale && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">Why It Matters:</h4>
                            <p className="text-sm text-muted-foreground">{tool.rationale}</p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => handleFreemiumToolClick(tool.id)}
                        >
                          <ExternalLink size={16} className="mr-2" /> Explore Tool
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button onClick={() => navigate('/ai-tools-directory')} variant="outline">
                    View All Freemium Tools <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Want Access to 50+ More AI Tools?</h3>
                    <p className="text-muted-foreground">
                      Upgrade your plan to unlock the full marketplace with premium tools, advanced features, and priority support.
                    </p>
                  </div>
                  <Button onClick={() => navigate('/pricing')} className="ml-4">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p>Full access content for {currentTier} tier</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AITools;
