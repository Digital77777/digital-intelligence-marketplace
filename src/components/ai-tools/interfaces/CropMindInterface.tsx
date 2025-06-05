
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Satellite, 
  MessageSquare, 
  CloudRain, 
  Sprout, 
  Mic, 
  Send, 
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  FarmProfile, 
  CropRecommendation, 
  SatelliteData, 
  WeatherData,
  cropTypes,
  soilTypes,
  languages,
  generateRecommendations
} from '@/data/cropMindData';

interface CropMindInterfaceProps {
  onClose?: () => void;
}

const CropMindInterface: React.FC<CropMindInterfaceProps> = ({ onClose }) => {
  const [farmProfile, setFarmProfile] = useState<FarmProfile | null>(null);
  const [currentTab, setCurrentTab] = useState('setup');
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [satelliteData, setSatelliteData] = useState<SatelliteData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Setup form state
  const [setupForm, setSetupForm] = useState({
    location: '',
    cropType: '',
    farmSize: '',
    soilType: '',
    plantingDate: '',
    language: 'en'
  });

  useEffect(() => {
    if (farmProfile) {
      fetchSatelliteData();
      fetchWeatherData();
    }
  }, [farmProfile]);

  useEffect(() => {
    if (farmProfile && satelliteData && weatherData) {
      const newRecommendations = generateRecommendations(farmProfile, satelliteData, weatherData);
      setRecommendations(newRecommendations);
    }
  }, [farmProfile, satelliteData, weatherData]);

  const fetchSatelliteData = async () => {
    // Mock satellite data fetch
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSatelliteData({
      ndvi: 0.65 + Math.random() * 0.3,
      growthStage: ['germination', 'vegetative', 'flowering', 'maturity'][Math.floor(Math.random() * 4)],
      healthIndex: 70 + Math.random() * 25,
      lastUpdate: new Date().toISOString()
    });
  };

  const fetchWeatherData = async () => {
    // Mock weather data fetch
    await new Promise(resolve => setTimeout(resolve, 800));
    setWeatherData({
      temperature: 25 + Math.random() * 10,
      humidity: 40 + Math.random() * 40,
      rainfall: Math.random() * 20,
      windSpeed: 5 + Math.random() * 10,
      forecast: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temperature: { min: 18 + Math.random() * 5, max: 28 + Math.random() * 8 },
        condition: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
        rainfall: Math.random() * 15
      }))
    });
  };

  const handleSetupSubmit = () => {
    if (!setupForm.location || !setupForm.cropType || !setupForm.soilType) {
      toast.error('Please fill in all required fields');
      return;
    }

    const profile: FarmProfile = {
      id: Date.now().toString(),
      location: {
        latitude: 0, // Would be geocoded from address
        longitude: 0,
        address: setupForm.location
      },
      cropType: setupForm.cropType,
      farmSize: parseFloat(setupForm.farmSize) || 1,
      soilType: setupForm.soilType,
      plantingDate: setupForm.plantingDate,
      language: setupForm.language
    };

    setFarmProfile(profile);
    setCurrentTab('dashboard');
    toast.success('Farm profile created successfully!');
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: currentMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Mock AI response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = [
      "Based on your satellite data, your crop is showing good NDVI values of 0.67. Continue current irrigation schedule.",
      "I see low rainfall in your area this week. Consider increasing irrigation frequency to every 2 days.",
      "Your crop is in the flowering stage. This is critical time - monitor for pests and ensure adequate water supply.",
      "Soil moisture appears optimal. Focus on nutrient management with potassium-rich fertilizer for fruit development."
    ];

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant' as const,
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const startVoiceRecording = () => {
    setIsListening(true);
    toast.info('Voice recording started (demo mode)');
    // Mock voice recording
    setTimeout(() => {
      setIsListening(false);
      setCurrentMessage('How is my maize crop doing today?');
      toast.success('Voice message recorded');
    }, 3000);
  };

  if (!farmProfile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            🌾 CropMind AI
            <Badge variant="secondary">Agricultural Assistant</Badge>
          </h1>
          <p className="text-muted-foreground">
            AI-powered agronomist providing hyperlocal crop recommendations using satellite and weather data
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Farm Profile Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Farm Location *</label>
                <Input
                  placeholder="e.g., Nairobi, Kenya or coordinates"
                  value={setupForm.location}
                  onChange={(e) => setSetupForm(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Crop Type *</label>
                <Select value={setupForm.cropType} onValueChange={(value) => setSetupForm(prev => ({ ...prev, cropType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropTypes.map(crop => (
                      <SelectItem key={crop.id} value={crop.id}>
                        {crop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Farm Size (acres)</label>
                <Input
                  type="number"
                  placeholder="e.g., 2.5"
                  value={setupForm.farmSize}
                  onChange={(e) => setSetupForm(prev => ({ ...prev, farmSize: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Soil Type *</label>
                <Select value={setupForm.soilType} onValueChange={(value) => setSetupForm(prev => ({ ...prev, soilType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map(soil => (
                      <SelectItem key={soil.id} value={soil.id}>
                        {soil.name} - {soil.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Planting Date</label>
                <Input
                  type="date"
                  value={setupForm.plantingDate}
                  onChange={(e) => setSetupForm(prev => ({ ...prev, plantingDate: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Preferred Language</label>
                <Select value={setupForm.language} onValueChange={(value) => setSetupForm(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSetupSubmit} className="w-full" size="lg">
              Create Farm Profile & Start Monitoring
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          🌾 CropMind AI
          <Badge variant="secondary">{farmProfile.location.address}</Badge>
        </h1>
        <p className="text-muted-foreground">
          Monitoring {cropTypes.find(c => c.id === farmProfile.cropType)?.name} • {farmProfile.farmSize} acres
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="satellite">Satellite</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Satellite className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">NDVI Index</span>
                </div>
                <div className="text-2xl font-bold">{satelliteData?.ndvi.toFixed(2) || '---'}</div>
                <div className="text-xs text-muted-foreground">Health: {satelliteData?.healthIndex.toFixed(0)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Temperature</span>
                </div>
                <div className="text-2xl font-bold">{weatherData?.temperature.toFixed(1) || '---'}°C</div>
                <div className="text-xs text-muted-foreground">Humidity: {weatherData?.humidity.toFixed(0)}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Rainfall</span>
                </div>
                <div className="text-2xl font-bold">{weatherData?.rainfall.toFixed(1) || '---'}mm</div>
                <div className="text-xs text-muted-foreground">This week</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sprout className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Growth Stage</span>
                </div>
                <div className="text-lg font-bold capitalize">{satelliteData?.growthStage || '---'}</div>
                <div className="text-xs text-muted-foreground">Current stage</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Today's Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map(rec => (
                  <div key={rec.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{rec.title}</h3>
                      <Badge variant={rec.urgency === 'high' ? 'destructive' : rec.urgency === 'medium' ? 'default' : 'secondary'}>
                        {rec.urgency} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <div className="mb-3">
                      <h4 className="text-sm font-medium mb-1">Action Steps:</h4>
                      <ul className="text-sm space-y-1">
                        {rec.actionSteps.map((step, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {rec.estimatedCost && (
                      <div className="text-sm text-muted-foreground">
                        Estimated cost: {rec.estimatedCost}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-4">
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with CropMind AI
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Ask me anything about your crop! Try:
                    <div className="mt-2 space-y-1 text-sm">
                      <div>"How is my crop doing today?"</div>
                      <div>"When should I apply fertilizer?"</div>
                      <div>"What's the weather forecast?"</div>
                    </div>
                  </div>
                )}
                {chatMessages.map(message => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={startVoiceRecording}
                  disabled={isListening}
                  className={isListening ? 'bg-red-100' : ''}
                >
                  <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
                </Button>
                <Input
                  placeholder="Ask about your crops..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!currentMessage.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satellite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="h-5 w-5" />
                Satellite Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">NDVI Trend</h3>
                  <div className="bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 h-32 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{satelliteData?.ndvi.toFixed(3)}</div>
                      <div className="text-sm text-muted-foreground">Current NDVI</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Crop Health Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall Health:</span>
                      <Badge variant="secondary">{satelliteData?.healthIndex.toFixed(0)}%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth Stage:</span>
                      <Badge variant="outline" className="capitalize">{satelliteData?.growthStage}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Update:</span>
                      <span className="text-sm text-muted-foreground">
                        {satelliteData ? new Date(satelliteData.lastUpdate).toLocaleDateString() : '---'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.filter(r => r.urgency === 'high').map(alert => (
                  <div key={alert.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-semibold text-red-800">{alert.title}</span>
                    </div>
                    <p className="text-red-700 text-sm">{alert.description}</p>
                  </div>
                ))}
                
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-blue-800">WhatsApp Integration</span>
                  </div>
                  <p className="text-blue-700 text-sm mb-3">
                    Enable daily WhatsApp alerts to receive recommendations directly on your phone.
                  </p>
                  <Button variant="outline" size="sm">
                    Connect WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CropMindInterface;
