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
  Camera, 
  Eye, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
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
  Users,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  Search,
  Filter,
  Bell,
  FileText,
  Scan,
  Video,
  Play,
  Pause,
  AlertCircle
} from 'lucide-react';

interface LivestockAlert {
  id: string;
  animalId: string;
  alertType: 'health' | 'behavior' | 'predator' | 'environmental';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: string;
  timestamp: Date;
  resolved: boolean;
}

interface AnimalHealth {
  id: string;
  animalType: string;
  animalId: string;
  healthScore: number;
  temperature: number;
  heartRate: number;
  activityLevel: number;
  lastCheckup: Date;
  issues: string[];
}

const LivestockGuardianVisionInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('camera-1');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [livestockType, setLivestockType] = useState('cattle');

  const [mockAlerts] = useState<LivestockAlert[]>([
    {
      id: '1',
      animalId: 'COW-001',
      alertType: 'health',
      severity: 'high',
      message: 'Abnormal body temperature detected (103.2°F)',
      location: 'Pasture A - North Section',
      timestamp: new Date('2024-06-15T09:30:00'),
      resolved: false
    },
    {
      id: '2',
      animalId: 'COW-015',
      alertType: 'behavior',
      severity: 'medium',
      message: 'Unusual movement pattern - possible lameness',
      location: 'Barn 2 - Stall 15',
      timestamp: new Date('2024-06-15T11:15:00'),
      resolved: false
    },
    {
      id: '3',
      animalId: 'GENERAL',
      alertType: 'predator',
      severity: 'critical',
      message: 'Coyote detected near perimeter fence',
      location: 'South Pasture - Camera 7',
      timestamp: new Date('2024-06-15T14:20:00'),
      resolved: true
    }
  ]);

  const livestockTypes = [
    { id: 'cattle', name: 'Cattle', icon: <Users className="h-4 w-4" /> },
    { id: 'sheep', name: 'Sheep', icon: <Users className="h-4 w-4" /> },
    { id: 'goats', name: 'Goats', icon: <Users className="h-4 w-4" /> },
    { id: 'pigs', name: 'Pigs', icon: <Users className="h-4 w-4" /> },
    { id: 'horses', name: 'Horses', icon: <Users className="h-4 w-4" /> },
    { id: 'chickens', name: 'Chickens', icon: <Users className="h-4 w-4" /> }
  ];

  const cameras = [
    { id: 'camera-1', name: 'Pasture A - Main', status: 'online' },
    { id: 'camera-2', name: 'Barn 1 - Interior', status: 'online' },
    { id: 'camera-3', name: 'Feeding Area', status: 'online' },
    { id: 'camera-4', name: 'South Perimeter', status: 'offline' },
    { id: 'camera-5', name: 'Water Station', status: 'online' }
  ];

  const analyzeVideo = async () => {
    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const analysis = {
        animalCount: 24,
        healthAlerts: 2,
        behaviorChanges: 1,
        predatorDetections: 0,
        averageHealthScore: 87,
        environmentalConditions: {
          temperature: 72,
          humidity: 65,
          windSpeed: 8,
          weatherCondition: 'Partly Cloudy'
        },
        individualAnimals: [
          {
            id: 'COW-001',
            healthScore: 65,
            temperature: 103.2,
            activity: 'Low',
            alert: 'Elevated temperature'
          },
          {
            id: 'COW-002',
            healthScore: 92,
            temperature: 100.8,
            activity: 'Normal',
            alert: null
          },
          {
            id: 'COW-003',
            healthScore: 88,
            temperature: 101.1,
            activity: 'High',
            alert: null
          }
        ],
        recommendations: [
          'Isolate COW-001 for veterinary examination',
          'Monitor feeding patterns in Barn 2',
          'Increase water station surveillance',
          'Schedule routine health checks for herd'
        ]
      };
      
      setAnalysisResult(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-700 bg-red-100 border-red-300';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'health': return <Heart className="h-4 w-4" />;
      case 'behavior': return <Activity className="h-4 w-4" />;
      case 'predator': return <Shield className="h-4 w-4" />;
      case 'environmental': return <Thermometer className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Livestock Guardian Vision</h1>
              <p className="text-sm text-gray-500">AI-powered livestock monitoring and protection</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Brain className="h-3 w-3 mr-1" />
              AI Vision
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
            <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
            <TabsTrigger value="health">Health Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Security</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Live Monitoring Tab */}
          <TabsContent value="monitoring" className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Camera Feed */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Video className="h-5 w-5" />
                          Live Camera Feed
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {cameras.map((camera) => (
                                <SelectItem key={camera.id} value={camera.id}>
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    {camera.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
                        <div className="text-center text-white">
                          <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">Live Camera Feed</p>
                          <p className="text-sm opacity-75">Pasture A - Main Camera</p>
                        </div>
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                          ● LIVE
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                          24 Animals Detected
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button
                          onClick={analyzeVideo}
                          disabled={isAnalyzing}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        >
                          {isAnalyzing ? (
                            <>
                              <Activity className="h-4 w-4 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Scan className="h-4 w-4 mr-2" />
                              Analyze Current Feed
                            </>
                          )}
                        </Button>
                        <Button variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Camera Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Quick Stats & Controls */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Live Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Total Animals</p>
                          <p className="text-2xl font-bold text-blue-600">247</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Healthy</p>
                          <p className="text-2xl font-bold text-green-600">234</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-gray-600">Alerts</p>
                          <p className="text-2xl font-bold text-yellow-600">8</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-gray-600">Critical</p>
                          <p className="text-2xl font-bold text-red-600">2</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Health Score</span>
                            <span>87%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Activity Level</span>
                            <span>Normal</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="h-4 w-4 mr-2" />
                        Set Alert
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Camera className="h-4 w-4 mr-2" />
                        Switch Camera
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Record Feed
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Analysis Results */}
              {analysisResult && (
                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        AI Analysis Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Animals Detected</h4>
                          <p className="text-2xl font-bold text-blue-600">{analysisResult.animalCount}</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Health Alerts</h4>
                          <p className="text-2xl font-bold text-red-600">{analysisResult.healthAlerts}</p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Behavior Changes</h4>
                          <p className="text-2xl font-bold text-yellow-600">{analysisResult.behaviorChanges}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold mb-2">Avg Health Score</h4>
                          <p className="text-2xl font-bold text-green-600">{analysisResult.averageHealthScore}%</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Individual Animal Status</h4>
                        <div className="space-y-3">
                          {analysisResult.individualAnimals.map((animal: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-gray-600" />
                                <div>
                                  <p className="font-medium">{animal.id}</p>
                                  <p className="text-sm text-gray-600">Temp: {animal.temperature}°F • Activity: {animal.activity}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Health: {animal.healthScore}%</span>
                                {animal.alert && (
                                  <Badge className="bg-red-100 text-red-700">
                                    {animal.alert}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Health Analytics Tab */}
          <TabsContent value="health" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Health Analytics Dashboard</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Health Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Health trend charts would display here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Activity Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Average Daily Activity</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Feeding Behavior</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Rest Patterns</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Alerts & Security Tab */}
          <TabsContent value="alerts" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Alerts & Security Monitor</h2>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-1" />
                  Configure Alerts
                </Button>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAlerts.filter(alert => !alert.resolved).map((alert) => (
                        <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {getAlertIcon(alert.alertType)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{alert.message}</h4>
                              <p className="text-sm text-gray-600">{alert.location} • Animal ID: {alert.animalId}</p>
                              <p className="text-xs text-gray-500">{alert.timestamp.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Resolve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="flex-1 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Livestock Reports & Analytics</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Generate Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Report Type</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily Health Report</SelectItem>
                          <SelectItem value="weekly">Weekly Activity Summary</SelectItem>
                          <SelectItem value="monthly">Monthly Analytics</SelectItem>
                          <SelectItem value="custom">Custom Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Date Range</Label>
                      <Input type="date" />
                    </div>
                    
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Daily Health Report</p>
                          <p className="text-sm text-gray-600">June 15, 2024</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Weekly Activity Summary</p>
                          <p className="text-sm text-gray-600">June 9-15, 2024</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
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

export default LivestockGuardianVisionInterface;
