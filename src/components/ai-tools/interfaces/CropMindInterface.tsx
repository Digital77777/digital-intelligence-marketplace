
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Mic, 
  Send, 
  Satellite, 
  CloudRain, 
  Sprout,
  ArrowLeft,
  Settings,
  BarChart3,
  Bell,
  User
} from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { 
  FarmProfile, 
  CropRecommendation, 
  SatelliteData, 
  WeatherData,
  generateRecommendations
} from '@/data/cropMindData';
import CropMindOnboarding from './CropMindOnboarding';
import CropDashboard from './CropDashboard';

interface CropMindInterfaceProps {
  tool: AIToolItem;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'voice';
  language?: string;
}

const CropMindInterface: React.FC<CropMindInterfaceProps> = ({ tool, onBack }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [farmProfile, setFarmProfile] = useState<FarmProfile | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  
  // Mock data - in real implementation, this would come from APIs
  const [satelliteData] = useState<SatelliteData>({
    ndvi: 0.65,
    growthStage: 'vegetative',
    healthIndex: 78,
    lastUpdate: new Date().toISOString()
  });

  const [weatherData] = useState<WeatherData>({
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    windSpeed: 8,
    forecast: [
      { date: '2024-01-15', temperature: { min: 18, max: 29 }, condition: 'Sunny', rainfall: 0 },
      { date: '2024-01-16', temperature: { min: 19, max: 31 }, condition: 'Partly Cloudy', rainfall: 2 },
      { date: '2024-01-17', temperature: { min: 20, max: 28 }, condition: 'Rainy', rainfall: 15 },
      { date: '2024-01-18', temperature: { min: 17, max: 26 }, condition: 'Cloudy', rainfall: 8 },
      { date: '2024-01-19', temperature: { min: 18, max: 27 }, condition: 'Sunny', rainfall: 0 },
      { date: '2024-01-20', temperature: { min: 19, max: 30 }, condition: 'Sunny', rainfall: 0 },
      { date: '2024-01-21', temperature: { min: 20, max: 32 }, condition: 'Hot', rainfall: 0 }
    ]
  });

  useEffect(() => {
    if (farmProfile && satelliteData && weatherData) {
      const newRecommendations = generateRecommendations(farmProfile, satelliteData, weatherData);
      setRecommendations(newRecommendations);

      // Add welcome message and recommendations to chat
      if (messages.length === 0) {
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          text: `Hello! I'm CropMind AI, your personal farming assistant. I've analyzed your ${farmProfile.cropType} farm and have some recommendations for you. How can I help you today?`,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text',
          language: farmProfile.language
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [farmProfile, satelliteData, weatherData]);

  const handleOnboardingComplete = (profile: FarmProfile) => {
    setFarmProfile(profile);
    setIsOnboarded(true);
  };

  const handleSkipOnboarding = () => {
    // Create a default profile for demo purposes
    const defaultProfile: FarmProfile = {
      id: 'demo-farm',
      location: { latitude: -1.2921, longitude: 36.8219, address: 'Nakuru, Kenya' },
      cropType: 'maize',
      farmSize: 2.5,
      soilType: 'loamy',
      plantingDate: '2024-01-01',
      language: 'en'
    };
    setFarmProfile(defaultProfile);
    setIsOnboarded(true);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text',
        language: farmProfile?.language
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputMessage('');
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('water') || input.includes('irrigat')) {
      return "Based on current weather data, your soil moisture levels are adequate. However, with the upcoming dry spell forecasted, I recommend increasing irrigation frequency to every 2 days starting tomorrow. Apply 15-20mm of water per session.";
    }
    
    if (input.includes('fertilizer') || input.includes('nutrient')) {
      return "Your satellite data shows NDVI of 0.65, which is good but can be improved. I recommend applying 50kg/acre of NPK 20-10-10 fertilizer during the vegetative stage. Split the application into two doses for better absorption.";
    }
    
    if (input.includes('pest') || input.includes('disease')) {
      return "No significant pest activity detected from satellite imagery. However, as you're in the vegetative stage, monitor for aphids and caterpillars. Apply neem oil spray preventively twice a week during early morning hours.";
    }
    
    if (input.includes('harvest') || input.includes('when')) {
      return "Based on your planting date and current growth stage, your maize should be ready for harvest in approximately 8-10 weeks. I'll send you weekly updates as we approach maturity stage.";
    }
    
    return "I understand your concern. Based on your farm's current conditions - NDVI of 0.65, adequate rainfall, and vegetative growth stage - your crops are developing well. Is there a specific aspect of farming you'd like advice on? I can help with irrigation, fertilization, pest control, or harvest timing.";
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real implementation, this would start/stop voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        // Simulate voice-to-text conversion
        setInputMessage("What's the best time to apply fertilizer?");
      }, 3000);
    }
  };

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 bg-white border-b shadow-sm">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Button>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Sprout className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">CropMind AI</h1>
              <p className="text-sm text-gray-600">Smart Farming Assistant</p>
            </div>
          </div>
        </div>
        
        <CropMindOnboarding 
          onComplete={handleOnboardingComplete}
          onSkip={handleSkipOnboarding}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="bg-green-100 p-2 rounded-full">
              <Sprout className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">CropMind AI</h1>
              <p className="text-sm text-gray-600">{farmProfile?.location.address}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {farmProfile?.cropType} • {farmProfile?.farmSize} acres
            </Badge>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Chat with CropMind AI
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 mb-4 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about your crops..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant={isRecording ? 'destructive' : 'outline'}
                    size="icon"
                    onClick={toggleRecording}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            {farmProfile && (
              <CropDashboard 
                farmProfile={farmProfile}
                satelliteData={satelliteData}
                weatherData={weatherData}
              />
            )}
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Current Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        rec.urgency === 'high'
                          ? 'border-red-500 bg-red-50'
                          : rec.urgency === 'medium'
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-green-500 bg-green-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{rec.title}</h3>
                        <Badge
                          variant="outline"
                          className={
                            rec.urgency === 'high'
                              ? 'border-red-500 text-red-700'
                              : rec.urgency === 'medium'
                              ? 'border-yellow-500 text-yellow-700'
                              : 'border-green-500 text-green-700'
                          }
                        >
                          {rec.urgency.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-600">Action Steps:</p>
                        <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                          {rec.actionSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      {rec.estimatedCost && (
                        <p className="text-xs text-gray-500 mt-2">
                          Estimated cost: {rec.estimatedCost}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Farm Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                {farmProfile && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p>{farmProfile.location.address}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Crop Type</p>
                        <p className="capitalize">{farmProfile.cropType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Farm Size</p>
                        <p>{farmProfile.farmSize} acres</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Soil Type</p>
                        <p className="capitalize">{farmProfile.soilType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Planting Date</p>
                        <p>{farmProfile.plantingDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Language</p>
                        <p>{farmProfile.language}</p>
                      </div>
                    </div>
                    <Button className="mt-4">
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CropMindInterface;
