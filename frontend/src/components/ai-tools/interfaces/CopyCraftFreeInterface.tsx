
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, FileText, Package } from 'lucide-react';

const CopyCraftFreeInterface = () => {
  const [activeTab, setActiveTab] = useState('marketing');
  const [productName, setProductName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [toneOfVoice, setToneOfVoice] = useState('Professional');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = () => {
    setGeneratedContent('Your generated content will appear here...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 text-white">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">CopyCraft Free</h1>
        </div>
        <p className="text-purple-100">AI-Powered Copywriting Tool for Marketing Copy, Blogs & Product Descriptions</p>
      </div>

      <div className="px-6 pb-6">
        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-6 bg-white/10 p-1 rounded-lg">
          <Button
            variant={activeTab === 'marketing' ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab('marketing')}
            className={`flex-1 ${activeTab === 'marketing' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
          >
            Marketing Copy
          </Button>
          <Button
            variant={activeTab === 'blog' ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab('blog')}
            className={`flex-1 ${activeTab === 'blog' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
          >
            <FileText className="h-4 w-4 mr-2" />
            Blog Posts
          </Button>
          <Button
            variant={activeTab === 'product' ? 'secondary' : 'ghost'}
            onClick={() => setActiveTab('product')}
            className={`flex-1 ${activeTab === 'product' ? 'bg-white text-gray-900' : 'text-white hover:bg-white/20'}`}
          >
            Product Descriptions
          </Button>
        </div>

        {/* Marketing Copy Generator */}
        {activeTab === 'marketing' && (
          <Card className="bg-white text-gray-900 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Sparkles className="h-5 w-5" />
                Marketing Copy Generator
              </CardTitle>
              <p className="text-gray-600">Create compelling marketing copy that converts visitors into customers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-name">Product/Service Name</Label>
                <Input
                  id="product-name"
                  placeholder="e.g., Premium Fitness App"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input
                  id="target-audience"
                  placeholder="e.g., busy professionals, fitness enthusiasts"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="tone">Tone of Voice</Label>
                <Select value={toneOfVoice} onValueChange={setToneOfVoice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Authoritative">Authoritative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={handleGenerate}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Marketing Copy
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Generated Content Section */}
        <Card className="bg-white text-gray-900">
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <div className="bg-gray-50 p-4 rounded-lg min-h-32">
                <p className="text-gray-600">{generatedContent}</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Your generated content will appear here...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-center py-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <span className="font-semibold">CopyCraft Free</span>
        </div>
        <p className="text-gray-400 text-sm">Empowering creators with AI-powered copywriting tools</p>
      </div>
    </div>
  );
};

export default CopyCraftFreeInterface;
