
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, List, Star, Download, Info, BookOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModelMarketplace = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  const categories = [
    { name: 'All', count: 250 },
    { name: 'Text Generation', count: 72 },
    { name: 'Image Generation', count: 45 },
    { name: 'Speech Recognition', count: 38 },
    { name: 'Code Assistance', count: 26 },
    { name: 'Sentiment Analysis', count: 23 },
    { name: 'Chatbots', count: 19 },
    { name: 'Translation', count: 17 },
    { name: 'Video Processing', count: 10 }
  ];
  
  const models = [
    { 
      id: 1, 
      name: 'GPT-4 Turbo', 
      description: 'Advanced language model for creative text generation and complex reasoning tasks.', 
      category: 'Text Generation', 
      rating: 4.9, 
      apiCompatible: true, 
      usage: '120K+ deployments', 
      featured: true 
    },
    { 
      id: 2, 
      name: 'DALL-E 3', 
      description: 'Create detailed, realistic images and art from natural language descriptions.', 
      category: 'Image Generation', 
      rating: 4.8, 
      apiCompatible: true, 
      usage: '98K+ deployments', 
      featured: true 
    },
    { 
      id: 3, 
      name: 'NVIDIA Metropolis', 
      description: 'Vision AI platform for video analytics and smart city applications.', 
      category: 'Video Processing', 
      rating: 4.7, 
      apiCompatible: true, 
      usage: '45K+ deployments', 
      featured: true 
    },
    { 
      id: 4, 
      name: 'CodeGPT Pro', 
      description: 'Specialized AI for code completion, explanation, and refactoring across multiple languages.', 
      category: 'Code Assistance', 
      rating: 4.6, 
      apiCompatible: true, 
      usage: '86K+ deployments' 
    },
    { 
      id: 5, 
      name: 'Whisper Advanced', 
      description: 'High-accuracy speech recognition system supporting 100+ languages.', 
      category: 'Speech Recognition', 
      rating: 4.5, 
      apiCompatible: true, 
      usage: '72K+ deployments' 
    },
    { 
      id: 6, 
      name: 'SentimentX', 
      description: 'Deep learning model for nuanced sentiment analysis across text, audio, and video.', 
      category: 'Sentiment Analysis', 
      rating: 4.7, 
      apiCompatible: true, 
      usage: '63K+ deployments' 
    }
  ];

  return (
    <ProTierLayout pageTitle="Model Marketplace" requiredFeature="model-marketplace">
      <div className="text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold mb-2">Pro Model Library</h2>
            <p className="text-gray-400">Access 250+ premium AI models and tools, ready to deploy to your workspace.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search models..."
                className="pl-9 bg-gray-800 border-gray-700 text-white w-full md:w-[300px]"
              />
            </div>
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="hidden md:flex items-center bg-gray-800 rounded-md p-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewType('grid')}
                className={`p-1 h-8 w-8 ${viewType === 'grid' ? 'bg-gray-700' : ''}`}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewType('list')}
                className={`p-1 h-8 w-8 ${viewType === 'list' ? 'bg-gray-700' : ''}`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-gray-900/70 rounded-lg border border-gray-800 p-4 sticky top-24">
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((category, idx) => (
                  <button
                    key={idx}
                    className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-left transition-colors hover:bg-gray-800 ${idx === 0 ? 'bg-[#6AC8FF]/10 text-[#6AC8FF]' : 'text-gray-300'}`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-400">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">API Compatibility</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded-sm border-gray-700 bg-gray-800" defaultChecked />
                    <span>REST API</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded-sm border-gray-700 bg-gray-800" defaultChecked />
                    <span>GraphQL</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded-sm border-gray-700 bg-gray-800" />
                    <span>WebSocket</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Rating</h3>
                <div className="flex items-center gap-1">
                  <Tabs defaultValue="4.5+" className="w-full">
                    <TabsList className="w-full grid grid-cols-3 bg-gray-800 border border-gray-700">
                      <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                      <TabsTrigger value="4+" className="text-xs">4+</TabsTrigger>
                      <TabsTrigger value="4.5+" className="text-xs data-[state=active]:bg-[#6AC8FF]/10 data-[state=active]:text-[#6AC8FF]">4.5+</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Featured Models</h3>
                <Button variant="link" className="text-[#6AC8FF] hover:text-[#6AC8FF]/90 p-0">
                  View all
                </Button>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {models.filter(model => model.featured).map(model => (
                  <div 
                    key={model.id}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-[#6AC8FF]/30 hover:shadow-lg hover:shadow-[#6AC8FF]/5 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{model.name}</h4>
                      <Badge className="bg-[#6AC8FF]/20 text-[#6AC8FF] border-[#6AC8FF]/20">
                        Featured
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{model.description}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm text-gray-300">{model.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({model.usage})</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
                      <Download className="h-3.5 w-3.5 mr-2" />
                      Deploy to Workspace
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">All Models</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Showing 1-6 of 250</span>
                </div>
              </div>
              
              {viewType === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {models.map(model => (
                    <div 
                      key={model.id}
                      className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-[#6AC8FF]/30 hover:shadow-lg hover:shadow-[#6AC8FF]/5 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{model.name}</h4>
                        <Badge className="bg-gray-800 text-gray-300 border-gray-700">
                          {model.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3">{model.description}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-gray-300">{model.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({model.usage})</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
                          <Info className="h-3.5 w-3.5 mr-2" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
                          <Download className="h-3.5 w-3.5 mr-2" />
                          Deploy
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {models.map(model => (
                    <div 
                      key={model.id}
                      className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-[#6AC8FF]/30 transition-all flex"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{model.name}</h4>
                          <Badge className="bg-gray-800 text-gray-300 border-gray-700">
                            {model.category}
                          </Badge>
                          {model.featured && (
                            <Badge className="bg-[#6AC8FF]/20 text-[#6AC8FF] border-[#6AC8FF]/20">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{model.description}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm text-gray-300">{model.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({model.usage})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                          <Info className="h-3.5 w-3.5 mr-2" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
                          <Download className="h-3.5 w-3.5 mr-2" />
                          Deploy
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Load More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProTierLayout>
  );
};

export default ModelMarketplace;
