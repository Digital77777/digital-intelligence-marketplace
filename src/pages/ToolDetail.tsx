
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { marketplaceTools } from '@/data/marketplace-tools';
import { Star, ArrowLeft, ExternalLink, Cpu, Code, Share2 } from 'lucide-react';

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const foundTool = marketplaceTools.find(t => t.id === parseInt(id));
      setTool(foundTool || null);
      
      if (!foundTool) {
        navigate('/marketplace');
      }
    }
  }, [id, navigate]);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/marketplace')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Marketplace
              </Button>
            </div>
            <div className="h-64 flex items-center justify-center">
              <p className="text-lg text-foreground/70">Loading tool information...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-12 flex justify-center items-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-3xl">
                    {tool.icon}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold">{tool.name}</h1>
                    <Badge variant="outline" className="text-sm">
                      {tool.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(Math.floor(tool.rating))].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {tool.rating % 1 > 0 && (
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    )}
                    <span className="ml-2 text-foreground/70">{tool.rating.toFixed(1)}</span>
                  </div>
                  
                  <p className="text-lg mb-8">{tool.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-blue-500" />
                          Key Features
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Easy integration</li>
                          <li>Pre-trained models</li>
                          <li>Cross-platform compatibility</li>
                          <li>Active community support</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                          <Code className="w-5 h-5 text-purple-500" />
                          Implementation
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Comprehensive documentation</li>
                          <li>Code examples available</li>
                          <li>Regular updates</li>
                          <li>Open source contributions welcome</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Getting Started</h2>
                <p className="mb-4">
                  Visit the official documentation to learn how to install and use {tool.name} in your projects.
                  The tool provides a straightforward API that can be integrated into most development workflows.
                </p>
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
                  <code className="text-sm">
                    # Example installation<br />
                    pip install {tool.name.toLowerCase().replace(/\s+/g, '-')}<br /><br />
                    # Quick usage example<br />
                    import {tool.name.toLowerCase().replace(/\s+/g, '_')}<br />
                    model = {tool.name.toLowerCase().replace(/\s+/g, '_')}.load_model('default')<br />
                    result = model.predict(data)
                  </code>
                </div>
                <Button className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Documentation
                </Button>
              </div>
            </div>
            
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Tool Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground/70">Category</h3>
                    <p>{tool.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground/70">Rating</h3>
                    <div className="flex items-center">
                      {[...Array(Math.floor(tool.rating))].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {tool.rating % 1 > 0 && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                      <span className="ml-2">{tool.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground/70">Price</h3>
                    <p>{tool.isPremium ? 'Premium (Paid)' : 'Open Source'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground/70">Last Updated</h3>
                    <p>March 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Share</h2>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolDetail;
