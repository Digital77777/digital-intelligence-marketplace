
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Bell,
  FileText,
  Download,
  BarChart3,
  Heart,
  Activity
} from 'lucide-react';

import LivestockGuardianHeader from './livestock-guardian/LivestockGuardianHeader';
import CameraFeedCard from './livestock-guardian/CameraFeedCard';
import LiveStatsCard from './livestock-guardian/LiveStatsCard';
import AnalysisResultsCard from './livestock-guardian/AnalysisResultsCard';
import { mockAlerts, cameras } from './livestock-guardian/mockData';
import { getSeverityColor, getAlertIcon } from './livestock-guardian/alertUtils';
import { AnalysisResult } from './livestock-guardian/types';

const LivestockGuardianVisionInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('camera-1');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const analyzeVideo = async () => {
    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const analysis: AnalysisResult = {
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

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <LivestockGuardianHeader />

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
                  <CameraFeedCard
                    selectedCamera={selectedCamera}
                    setSelectedCamera={setSelectedCamera}
                    cameras={cameras}
                    isAnalyzing={isAnalyzing}
                    onAnalyze={analyzeVideo}
                  />
                </div>

                {/* Right Column - Quick Stats & Controls */}
                <div>
                  <LiveStatsCard />
                </div>
              </div>

              {/* Analysis Results */}
              {analysisResult && (
                <div className="mt-8">
                  <AnalysisResultsCard analysisResult={analysisResult} />
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
