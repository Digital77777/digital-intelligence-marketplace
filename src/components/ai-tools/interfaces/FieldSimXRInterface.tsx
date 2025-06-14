
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Trophy, Clock, Target, Leaf } from 'lucide-react';

const FieldSimXRInterface = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const trainingScenarios = [
    {
      id: 'precision-planting',
      name: 'Precision Planting',
      difficulty: 'Beginner',
      duration: '15 min',
      completion: 85,
      description: 'Learn optimal planting techniques for different crop types and seasonal farming conditions',
      color: 'bg-green-500',
      icon: <Leaf className="h-4 w-4" />
    },
    {
      id: 'pest-identification',
      name: 'Pest Identification & Control',
      difficulty: 'Intermediate',
      duration: '25 min',
      completion: 0,
      description: 'Identify common agricultural pests and learn effective, sustainable control methods',
      color: 'bg-orange-500',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 'fertilizer-application',
      name: 'Fertilizer Application',
      difficulty: 'Advanced',
      duration: '30 min',
      completion: 0,
      description: 'Master the art of optimal fertilizer application timing and techniques for maximum yield',
      color: 'bg-orange-500',
      icon: <Trophy className="h-4 w-4" />
    },
    {
      id: 'seasonal-planning',
      name: 'Seasonal Planning',
      difficulty: 'Intermediate',
      duration: '20 min',
      completion: 0,
      description: 'Plan your farming activities across seasons for optimal crop rotation and soil health',
      color: 'bg-blue-500',
      icon: <Clock className="h-4 w-4" />
    }
  ];

  const stats = [
    { label: 'XR Training Score', value: '650', unit: 'points' },
    { label: 'Modules Completed', value: '12', unit: 'modules' },
    { label: 'Success Rate', value: '98%', unit: '' },
    { label: 'Total Practice Time', value: '3', unit: 'hours' }
  ];

  const achievements = [
    { name: 'First Harvest', status: 'achieved', icon: '🌾' },
    { name: 'Pest Expert', status: 'achieved', icon: '🛡️' },
    { name: 'Water Wise', status: 'in-progress', icon: '💧' },
    { name: 'Soil Master', status: 'locked', icon: '🌱' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">FieldSim XR</h1>
              <p className="text-green-100">Master Farming with XR Training</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Advanced VR Training
          </Badge>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-green-100 mb-2">
            Gain essential farming knowledge through immersive virtual reality scenarios. Practice core techniques in a risk-free environment and earn certifications as a farming professional.
          </p>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Training Scenarios */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Training Scenarios
            </CardTitle>
            <p className="text-gray-600">Select a farming scenario to practice. VR training experiences available.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {trainingScenarios.map((scenario) => (
              <div key={scenario.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${scenario.color} rounded-lg flex items-center justify-center text-white`}>
                      {scenario.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{scenario.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📍 {scenario.difficulty}</span>
                        <span>⏱️ {scenario.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant={scenario.completion > 0 ? "outline" : "default"}
                    size="sm"
                    className={scenario.completion > 0 ? "" : "bg-green-600 hover:bg-green-700"}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    {scenario.completion > 0 ? "Continue" : "Start Training"}
                  </Button>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{scenario.description}</p>
                
                {scenario.completion > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{scenario.completion}%</span>
                    </div>
                    <Progress value={scenario.completion} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Your Progress */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <p className="text-gray-600">Track your farming skills development and level progression</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Level Progress</span>
                  <span>Level 3</span>
                </div>
                <Progress value={65} className="h-2 mb-4" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">24.5</div>
                <div className="text-sm text-gray-600">Level Score</div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <p className="text-gray-600">Unlock badges by completing training modules</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <span className="font-medium">{achievement.name}</span>
                    </div>
                    <Badge 
                      variant={achievement.status === 'achieved' ? 'default' : 'secondary'}
                      className={achievement.status === 'achieved' ? 'bg-green-600' : ''}
                    >
                      {achievement.status === 'achieved' ? 'Achieved' : 
                       achievement.status === 'in-progress' ? 'In Progress' : 'Locked'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Training Sessions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Training Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Pest Identification & Control 🛡️', score: '95%', time: '2 hours ago' },
                { name: 'Precision Planting 🌱', score: '88%', time: '1 day ago' },
                { name: 'Field Crop 🌾', score: '92%', time: '2 days ago' }
              ].map((session, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{session.name}</div>
                    <div className="text-sm text-gray-600">{session.time}</div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {session.score}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FieldSimXRInterface;
