
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
  Bug, 
  Camera, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Target,
  Zap,
  Brain,
  Settings,
  Download,
  Upload,
  Star,
  MapPin,
  Calendar,
  Activity,
  BarChart3,
  Leaf,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  Search,
  Filter,
  Bell,
  FileText,
  Microscope
} from 'lucide-react';

interface PestDetection {
  id: string;
  pestName: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  detectedAt: Date;
  cropType: string;
  imageUrl?: string;
  treatmentRecommended: boolean;
}

interface TreatmentPlan {
  id: string;
  pestType: string;
  treatmentMethod: string;
  applicationRate: string;
  timing: string;
  frequency: string;
  cost: number;
  effectiveness: number;
}

const SmartPestSentinelInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('detection');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [cropType, setCropType] = useState('corn');
  const [fieldLocation, setFieldLocation] = useState('');

  const [mockDetections] = useState<PestDetection[]>([
    {
      id: '1',
      pestName: 'Corn Borer',
      confidence: 94,
      severity: 'high',
      location: 'Field A - Section 3',
      detectedAt: new Date('2024-06-15T09:30:00'),
      cropType: 'Corn',
      treatmentRecommended: true
    },
    {
      id: '2',
      pestName: 'Aphids',
      confidence: 87,
      severity: 'medium',
      location: 'Field B - Section 1',
      detectedAt: new Date('2024-06-15T11:15:00'),
      cropType: 'Soybean',
      treatmentRecommended: true
    },
    {
      id: '3',
      pestName: 'Beneficial Ladybug',
      confidence: 91,
      severity: 'low',
      location: 'Field A - Section 5',
      detectedAt: new Date('2024-06-15T14:20:00'),
      cropType: 'Corn',
      treatmentRecommended: false
    }
  ]);

  const cropTypes = [
    { id: 'corn', name: 'Corn', icon: '🌽' },
    { id: 'soybean', name: 'Soybean', icon: '🫘' },
    { id: 'wheat', name: 'Wheat', icon: '🌾' },
    { id: 'cotton', name: 'Cotton', icon: '🌿' },
    { id: 'rice', name: 'Rice', icon: '🌾' },
    { id: 'tomato', name: 'Tomato', icon: '🍅' }
  ];

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      // Use TensorFlow/YOLO and OpenCV for pest detection
      const analysis = await analyzeImageWithAI(selectedImage, cropType);

      setAnalysisResult(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeImageWithAI = async (image: File, cropType: string) => {
    // Placeholder function for AI pest detection
    console.log('Analyzing image with TensorFlow/YOLO and OpenCV...');

    // Simulate AI pest detection
    await new Promise(resolve => setTimeout(resolve, 3000));

    const analysis = {
      detectedPests: [
        {
          name: 'Colorado Potato Beetle',
          confidence: 96,
          severity: 'high',
          description: 'Adult beetles and larvae detected on potato leaves'
        },
        {
          name: 'Aphids',
          confidence: 78,
          severity: 'medium',
          description: 'Small green aphids clustered on stem'
        }
      ],
      cropHealth: {
        overall: 72,
        leafDamage: 25,
        growthStage: 'Vegetative',
        stressLevel: 'Moderate'
      },
      recommendations: [
        'Apply targeted insecticide for Colorado Potato Beetle',
        'Monitor aphid population growth',
        'Consider introducing beneficial insects',
        'Increase field monitoring frequency'
      ],
      treatmentUrgency: 'high',
      estimatedYieldImpact: 15,
      weatherConsiderations: 'Apply treatment before expected rain in 2 days'
    };

    return analysis;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-300';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setAnalysisResult(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <Bug className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">SmartPest Sentinel</h1>
              <p className="text-sm text-gray-500">AI-powered pest detection and management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Brain className="h-3 w-3 mr-1" />
              AI Detection
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="detection">Pest Detection</TabsTrigger>
            <TabsTrigger value="monitoring">Field Monitoring</TabsTrigger>
            <TabsTrigger value="treatment">Treatment Plans</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Pest Detection Tab */}
          <TabsContent value="detection" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Image Upload & Analysis */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        Image Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          Upload Crop Image
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Label htmlFor="image-upload" className="cursor-pointer">
                            <Button variant="outline" asChild>
                              <span>
                                <Upload className="h-4 w-4 mr-2" />
                                Choose Image
                              </span>
                            </Button>
                          </Label>
                          <p className="text-sm text-gray-500 mt-2">
                            Upload a clear image of your crop for pest detection
                          </p>
                        </div>
                        {selectedImage && (
                          <p className="text-sm text-green-600 mt-2">
                            ✓ {selectedImage.name} selected
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Crop Type
                          </Label>
                          <Select value={cropType} onValueChange={setCropType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {cropTypes.map((crop) => (
                                <SelectItem key={crop.id} value={crop.id}>
                                  {crop.icon} {crop.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Field Location
                          </Label>
                          <Input
                            placeholder="e.g., Field A - Section 2"
                            value={fieldLocation}
                            onChange={(e) => setFieldLocation(e.target.value)}
                          />
                        </div>
                      </div>

                      <Button
                        onClick={analyzeImage}
                        disabled={!selectedImage || isAnalyzing}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <Activity className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing Image...
                          </>
                        ) : (
                          <>
                            <Microscope className="h-4 w-4 mr-2" />
                            Detect Pests
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Analysis Results */}
                <div className="space-y-6">
                  {analysisResult ? (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Detection Results
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {analysisResult.detectedPests.map((pest: any, index: number) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{pest.name}</h4>
                                <Badge className={getSeverityColor(pest.severity)}>
                                  {pest.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{pest.description}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Confidence:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-600 h-2 rounded-full" 
                                    style={{ width: `${pest.confidence}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{pest.confidence}%</span>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Leaf className="h-5 w-5" />
                            Crop Health Assessment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Overall Health</p>
                              <p className="text-2xl font-bold text-green-600">
                                {analysisResult.cropHealth.overall}%
                              </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Leaf Damage</p>
                              <p className="text-2xl font-bold text-red-600">
                                {analysisResult.cropHealth.leafDamage}%
                              </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Growth Stage</p>
                              <p className="font-semibold">{analysisResult.cropHealth.growthStage}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Stress Level</p>
                              <p className="font-semibold">{analysisResult.cropHealth.stressLevel}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Treatment Recommendations
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {analysisResult.recommendations.map((rec: string, index: number) => (
                              <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{rec}</p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-5 w-5 text-yellow-600" />
                              <span className="font-medium text-yellow-800">Weather Alert</span>
                            </div>
                            <p className="text-sm text-yellow-700">{analysisResult.weatherConsiderations}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Bug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for Analysis</h3>
                        <p className="text-gray-500">Upload an image to detect pests and get treatment recommendations</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Field Monitoring Tab */}
          <TabsContent value="monitoring" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Field Monitoring Dashboard</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-1" />
                    Alerts
                  </Button>
                </div>
              </div>

              {/* Placeholder Leaflet Map */}
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Leaflet map would display here</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Bug className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {mockDetections.filter(d => d.severity === 'high' || d.severity === 'critical').length}
                        </p>
                        <p className="text-sm text-gray-600">High Priority</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {mockDetections.filter(d => d.severity === 'medium').length}
                        </p>
                        <p className="text-sm text-gray-600">Medium Priority</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {mockDetections.filter(d => d.treatmentRecommended).length}
                        </p>
                        <p className="text-sm text-gray-600">Need Treatment</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Eye className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{mockDetections.length}</p>
                        <p className="text-sm text-gray-600">Total Detections</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Detections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDetections.map((detection) => (
                      <div key={detection.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Bug className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{detection.pestName}</h4>
                            <p className="text-sm text-gray-600">{detection.location} • {detection.cropType}</p>
                            <p className="text-xs text-gray-500">{detection.detectedAt.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getSeverityColor(detection.severity)}>
                            {detection.severity}
                          </Badge>
                          <span className="text-sm font-medium">{detection.confidence}%</span>
                          {detection.treatmentRecommended && (
                            <Button variant="outline" size="sm">
                              View Treatment
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Treatment Plans Tab */}
          <TabsContent value="treatment" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Treatment Plans & Recommendations</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Active Treatments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Corn Borer Control</h4>
                          <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Targeted insecticide application for European corn borer</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Method:</span>
                            <p className="font-medium">Foliar Spray</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Next Application:</span>
                            <p className="font-medium">June 18, 2024</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">Aphid Management</h4>
                          <Badge className="bg-green-100 text-green-700">Scheduled</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Biological control using beneficial insects</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Method:</span>
                            <p className="font-medium">Beneficial Release</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Start Date:</span>
                            <p className="font-medium">June 20, 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Treatment Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Pre-Treatment Checklist</h4>
                        <ul className="text-sm space-y-1">
                          <li>✓ Weather conditions favorable</li>
                          <li>✓ Equipment calibrated and ready</li>
                          <li>✓ Safety equipment available</li>
                          <li>⏳ Beneficial insect populations assessed</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Environmental Considerations</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Wind speed: &lt; 10 mph optimal</li>
                          <li>• Temperature: 60-85°F range</li>
                          <li>• No rain forecasted for 6 hours</li>
                          <li>• Avoid flowering periods</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Pest Analytics & Insights</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Pest Pressure Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Pest pressure analytics chart would display here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Treatment Effectiveness
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Corn Borer Control</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Aphid Management</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Preventive Measures</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                      </div>
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

export default SmartPestSentinelInterface;
