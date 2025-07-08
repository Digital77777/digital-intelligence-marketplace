
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  Presentation, 
  Plus, 
  Download, 
  Share2, 
  Eye, 
  Settings, 
  Palette, 
  Type, 
  Image,
  BarChart3,
  Sparkles,
  Clock,
  Users
} from 'lucide-react';

const templates = [
  { id: 'business', name: 'Business Pitch', preview: '📊', color: 'bg-blue-500' },
  { id: 'creative', name: 'Creative Portfolio', preview: '🎨', color: 'bg-purple-500' },
  { id: 'academic', name: 'Academic Research', preview: '🎓', color: 'bg-green-500' },
  { id: 'startup', name: 'Startup Deck', preview: '🚀', color: 'bg-orange-500' },
  { id: 'minimal', name: 'Minimal Clean', preview: '⚪', color: 'bg-gray-500' },
  { id: 'corporate', name: 'Corporate Report', preview: '🏢', color: 'bg-indigo-500' }
];

const AIPresentationMakerInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [duration, setDuration] = useState([10]);
  const [selectedTemplate, setSelectedTemplate] = useState('business');
  const [tone, setTone] = useState('professional');
  const [slides, setSlides] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setSlides([1, 2, 3, 4, 5, 6, 7, 8]);
      setIsGenerating(false);
      setActiveTab('preview');
    }, 3000);
  };

  const handleNewPresentation = () => {
    setSlides([]);
    setTopic('');
    setAudience('');
    setActiveTab('create');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Presentation className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Presentation Maker</h1>
              <p className="text-sm text-gray-500">Create stunning presentations with AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
            {slides.length > 0 && (
              <Button onClick={handleNewPresentation} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="preview" disabled={slides.length === 0}>Preview</TabsTrigger>
            <TabsTrigger value="customize" disabled={slides.length === 0}>Customize</TabsTrigger>
          </TabsList>

          {/* Create Tab */}
          <TabsContent value="create" className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Input Form */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Type className="h-5 w-5" />
                        Presentation Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Topic or Title
                        </label>
                        <Input
                          placeholder="e.g., 'Quarterly Sales Review' or 'Product Launch Strategy'"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Target Audience
                        </label>
                        <Select value={audience} onValueChange={setAudience}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="executives">Executives & Leadership</SelectItem>
                            <SelectItem value="team">Team Members</SelectItem>
                            <SelectItem value="clients">Clients & Customers</SelectItem>
                            <SelectItem value="investors">Investors</SelectItem>
                            <SelectItem value="students">Students</SelectItem>
                            <SelectItem value="general">General Audience</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Presentation Length: {duration[0]} minutes
                        </label>
                        <Slider
                          value={duration}
                          onValueChange={setDuration}
                          max={60}
                          min={5}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>5 min</span>
                          <span>60 min</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Tone & Style
                        </label>
                        <Select value={tone} onValueChange={setTone}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual & Friendly</SelectItem>
                            <SelectItem value="formal">Formal & Academic</SelectItem>
                            <SelectItem value="creative">Creative & Bold</SelectItem>
                            <SelectItem value="persuasive">Persuasive & Sales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Choose Template
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {templates.map((template) => (
                          <div
                            key={template.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedTemplate === template.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedTemplate(template.id)}
                          >
                            <div className={`w-12 h-8 ${template.color} rounded mb-2 flex items-center justify-center text-white text-lg`}>
                              {template.preview}
                            </div>
                            <div className="text-sm font-medium">{template.name}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Additional Options */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Advanced Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Additional Context (Optional)
                        </label>
                        <Textarea
                          placeholder="Provide any specific requirements, key points to include, or company information..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Include Charts
                          </label>
                          <Select defaultValue="auto">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto-suggest</SelectItem>
                              <SelectItem value="yes">Yes, include</SelectItem>
                              <SelectItem value="no">No charts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Include Images
                          </label>
                          <Select defaultValue="auto">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto">Auto-suggest</SelectItem>
                              <SelectItem value="yes">Yes, include</SelectItem>
                              <SelectItem value="minimal">Minimal images</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-900 mb-1">AI Will Generate:</h3>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Compelling slide content and structure</li>
                            <li>• Professional design and layout</li>
                            <li>• Relevant charts and visuals</li>
                            <li>• Speaker notes for each slide</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={handleGenerate}
                    disabled={!topic || !audience || isGenerating}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Generating Presentation...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Presentation
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">{topic || 'Your Presentation'}</h2>
                  <p className="text-gray-600">{slides.length} slides • {duration[0]} minute presentation</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {slides.map((slide, index) => (
                  <Card key={slide} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center">
                        {index === 0 && <Type className="h-8 w-8 text-blue-600" />}
                        {index === 1 && <Users className="h-8 w-8 text-purple-600" />}
                        {index === 2 && <BarChart3 className="h-8 w-8 text-green-600" />}
                        {index === 3 && <Image className="h-8 w-8 text-orange-600" />}
                        {index > 3 && <Presentation className="h-8 w-8 text-gray-600" />}
                      </div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        Slide {index + 1}
                      </div>
                      <div className="text-xs text-gray-500">
                        {index === 0 && 'Title Slide'}
                        {index === 1 && 'Introduction'}
                        {index === 2 && 'Key Metrics'}
                        {index === 3 && 'Visual Overview'}
                        {index > 3 && 'Content Slide'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Customize Tab */}
          <TabsContent value="customize" className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12">
                <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customization Tools</h3>
                <p className="text-gray-600">Advanced customization features coming soon</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIPresentationMakerInterface;
