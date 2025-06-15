
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  Users, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Hash,
  Search,
  Filter,
  BarChart3,
  Activity,
  Zap,
  Brain,
  Settings,
  Download,
  Upload,
  Star,
  MessageCircle,
  UserCheck,
  Target
} from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  category: string;
  tags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
  status: 'approved' | 'pending' | 'flagged';
  priority: 'high' | 'medium' | 'low';
}

interface ModerationAction {
  id: string;
  type: 'approve' | 'reject' | 'flag' | 'escalate';
  reason: string;
  confidence: number;
  timestamp: Date;
}

const ForumAssistantInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('moderate');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);

  const [mockPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'Best practices for AI integration in business',
      content: 'I\'m looking for advice on implementing AI tools in my company. What are the key considerations?',
      author: 'BusinessPro',
      timestamp: new Date('2024-06-15T10:30:00'),
      category: 'Business',
      tags: ['AI', 'Business', 'Integration'],
      sentiment: 'neutral',
      engagement: 85,
      status: 'approved',
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Spam content here - buy cheap products now!',
      content: 'Click here for amazing deals on products you don\'t need!',
      author: 'SpamUser123',
      timestamp: new Date('2024-06-15T11:00:00'),
      category: 'General',
      tags: ['spam'],
      sentiment: 'negative',
      engagement: 5,
      status: 'flagged',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Thank you for the amazing AI tools!',
      content: 'The platform has been incredibly helpful for my workflow. Great job!',
      author: 'HappyUser',
      timestamp: new Date('2024-06-15T12:00:00'),
      category: 'Feedback',
      tags: ['positive', 'feedback'],
      sentiment: 'positive',
      engagement: 92,
      status: 'approved',
      priority: 'low'
    }
  ]);

  const categories = [
    { id: 'general', name: 'General Discussion', icon: '💬' },
    { id: 'business', name: 'Business & Enterprise', icon: '💼' },
    { id: 'technical', name: 'Technical Support', icon: '🔧' },
    { id: 'feedback', name: 'Feedback & Suggestions', icon: '💡' },
    { id: 'announcements', name: 'Announcements', icon: '📢' },
    { id: 'community', name: 'Community', icon: '👥' }
  ];

  const analyzeContent = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const analysis = {
        sentiment: Math.random() > 0.6 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative',
        toxicity: Math.random() * 0.3,
        spam_probability: Math.random() * 0.4,
        category_suggestions: categories.slice(0, 3).map(c => ({ ...c, confidence: Math.random() * 0.8 + 0.2 })),
        suggested_tags: ['AI', 'Discussion', 'Help', 'Question'].slice(0, Math.floor(Math.random() * 3) + 1),
        engagement_prediction: Math.floor(Math.random() * 40) + 60,
        moderation_recommendation: Math.random() > 0.7 ? 'approve' : Math.random() > 0.3 ? 'review' : 'flag',
        key_topics: ['artificial intelligence', 'business optimization', 'user experience'],
        response_suggestions: [
          'Thank you for sharing your experience!',
          'Have you considered exploring our documentation?',
          'This is a great question for our community experts.'
        ]
      };
      
      setCurrentAnalysis(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const moderatePost = (postId: string, action: 'approve' | 'reject' | 'flag') => {
    console.log(`Moderating post ${postId} with action: ${action}`);
    // Add moderation logic here
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'flagged': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Forum Assistant</h1>
              <p className="text-sm text-gray-500">AI-powered forum management and moderation</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Brain className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="moderate">Moderation</TabsTrigger>
            <TabsTrigger value="analyze">Content Analysis</TabsTrigger>
            <TabsTrigger value="insights">Community Insights</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          {/* Moderation Tab */}
          <TabsContent value="moderate" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Content Moderation Queue</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Flag className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {mockPosts.filter(p => p.status === 'flagged').length}
                        </p>
                        <p className="text-sm text-gray-600">Flagged Posts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {mockPosts.filter(p => p.status === 'pending').length}
                        </p>
                        <p className="text-sm text-gray-600">Pending Review</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {mockPosts.filter(p => p.status === 'approved').length}
                        </p>
                        <p className="text-sm text-gray-600">Approved Today</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {mockPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <Badge className={getPriorityColor(post.priority)}>
                              {post.priority}
                            </Badge>
                            <Badge className={getStatusColor(post.status)}>
                              {post.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>By {post.author}</span>
                            <span>{post.timestamp.toLocaleDateString()}</span>
                            <span>{post.category}</span>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {post.engagement}% engagement
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Badge className={getSentimentColor(post.sentiment)}>
                            {post.sentiment}
                          </Badge>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" onClick={() => moderatePost(post.id, 'approve')}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => moderatePost(post.id, 'flag')}>
                              <Flag className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => moderatePost(post.id, 'reject')}>
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Hash className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Content Analysis Tab */}
          <TabsContent value="analyze" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Input */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Content Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Content to Analyze
                        </Label>
                        <Textarea
                          placeholder="Paste forum post content, comment, or any text for AI analysis..."
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Target Category
                        </Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.icon} {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={analyzeContent}
                        disabled={!inputText.trim() || isAnalyzing}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <Activity className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            Analyze Content
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Analysis Results */}
                <div className="space-y-6">
                  {currentAnalysis ? (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Analysis Results
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Sentiment</p>
                              <p className={`font-semibold ${getSentimentColor(currentAnalysis.sentiment).split(' ')[0]}`}>
                                {currentAnalysis.sentiment.charAt(0).toUpperCase() + currentAnalysis.sentiment.slice(1)}
                              </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Toxicity Score</p>
                              <p className="font-semibold">{(currentAnalysis.toxicity * 100).toFixed(1)}%</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Spam Probability</p>
                              <p className="font-semibold">{(currentAnalysis.spam_probability * 100).toFixed(1)}%</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Engagement Prediction</p>
                              <p className="font-semibold">{currentAnalysis.engagement_prediction}%</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Recommended Action</p>
                            <Badge className={
                              currentAnalysis.moderation_recommendation === 'approve' ? 'bg-green-100 text-green-700' :
                              currentAnalysis.moderation_recommendation === 'review' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }>
                              {currentAnalysis.moderation_recommendation.charAt(0).toUpperCase() + currentAnalysis.moderation_recommendation.slice(1)}
                            </Badge>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Suggested Tags</p>
                            <div className="flex flex-wrap gap-1">
                              {currentAnalysis.suggested_tags.map((tag: string, index: number) => (
                                <Badge key={index} variant="outline">
                                  <Hash className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Category Suggestions</p>
                            <div className="space-y-2">
                              {currentAnalysis.category_suggestions.map((cat: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <span>{cat.icon} {cat.name}</span>
                                  <span className="text-sm text-gray-500">{(cat.confidence * 100).toFixed(0)}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Response Suggestions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {currentAnalysis.response_suggestions.map((suggestion: string, index: number) => (
                              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm">{suggestion}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                        <p className="text-gray-500">Enter content in the form to get AI-powered insights</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Community Insights Tab */}
          <TabsContent value="insights" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Community Insights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">1,234</p>
                        <p className="text-sm text-gray-600">Active Users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">5,678</p>
                        <p className="text-sm text-gray-600">Total Posts</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">89%</p>
                        <p className="text-sm text-gray-600">Avg Engagement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">4.8</p>
                        <p className="text-sm text-gray-600">Community Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.slice(0, 4).map((category, index) => (
                        <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + 50} posts</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trending Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['AI Integration', 'Business Automation', 'Community Guidelines', 'Feature Requests'].map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{topic}</span>
                          <Badge variant="outline">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {Math.floor(Math.random() * 50) + 10}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Automation Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Auto-Moderation Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Spam Detection</p>
                        <p className="text-sm text-gray-500">Automatically flag potential spam</p>
                      </div>
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Toxicity Filter</p>
                        <p className="text-sm text-gray-500">Block toxic or harmful content</p>
                      </div>
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Auto-Categorization</p>
                        <p className="text-sm text-gray-500">Suggest categories for new posts</p>
                      </div>
                      <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Pending</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Smart Responses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Welcome Messages</p>
                        <p className="text-sm text-gray-500">Greet new community members</p>
                      </div>
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">FAQ Suggestions</p>
                        <p className="text-sm text-gray-500">Suggest relevant FAQ responses</p>
                      </div>
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Expert Notifications</p>
                        <p className="text-sm text-gray-500">Notify experts for complex questions</p>
                      </div>
                      <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Beta</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ForumAssistantInterface;
