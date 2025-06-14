
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Trophy, Clock, Target, Leaf, Menu } from 'lucide-react';

const FieldSimXRInterface = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const trainingScenarios = [
    {
      id: 'precision-planting',
      name: 'Precision Planting',
      difficulty: 'Beginner',
      duration: '15 min',
      completion: 85,
      description: 'Learn optimal planting techniques for different crop types and seasonal conditions.',
      color: 'bg-green-500',
      icon: '🌱'
    },
    {
      id: 'pest-identification',
      name: 'Pest Identification & Control',
      difficulty: 'Intermediate',
      duration: '25 min',
      completion: 0,
      description: 'Identify common agricultural pests and learn effective control methods.',
      color: 'bg-orange-500',
      icon: '🛡️'
    },
    {
      id: 'fertilizer-application',
      name: 'Fertilizer Application',
      difficulty: 'Advanced',
      duration: '30 min',
      completion: 0,
      description: 'Master optimal fertilizer application timing and techniques for maximum yield.',
      color: 'bg-red-500',
      icon: '🌾'
    },
    {
      id: 'seasonal-planning',
      name: 'Seasonal Planning',
      difficulty: 'Intermediate',
      duration: '20 min',
      completion: 0,
      description: 'Plan your farming activities across seasons for optimal crop rotation.',
      color: 'bg-blue-500',
      icon: '📅'
    }
  ];

  const stats = [
    { label: 'XR Training Score', value: '650', unit: 'points' },
    { label: 'Modules Completed', value: '12', unit: 'modules' },
    { label: 'Success Rate', value: '98%', unit: '' },
    { label: 'Total Practice Time', value: '3', unit: 'hours' }
  ];

  const achievements = [
    { name: 'First Harvest', status: 'achieved', icon: '🏆' },
    { name: 'Pest Expert', status: 'achieved', icon: '🛡️' },
    { name: 'Water Wise', status: 'in-progress', icon: '💧' },
    { name: 'Soil Master', status: 'locked', icon: '🌱' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FieldSim XR</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Master Farming with XR Training</h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
            Gain essential farming knowledge through immersive virtual reality 
            scenarios. Practice core techniques in a risk-free environment and earn 
            certifications as a farming professional.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">650</div>
            <div className="text-xs text-gray-600">XR Training Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-600">Modules Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-xs text-gray-600">Total Practice Time</div>
          </div>
        </div>

        {/* 3D Training Scene */}
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-semibold mb-2">XR Training Scene</h3>
            <p className="text-sm opacity-90 mb-4">Immersive 3D farming environment</p>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              <Play className="h-4 w-4 mr-2" />
              Start Training
            </Button>
          </div>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[url('/lovable-uploads/a04f2848-1f9e-4d8c-bdc1-8b50f4d86590.png')] bg-cover bg-center"></div>
          </div>
        </div>

        {/* Training Scenarios */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Scenarios</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select a farming scenario to practice. VR training experiences available.
          </p>
          
          <div className="space-y-3">
            {trainingScenarios.map((scenario) => (
              <div key={scenario.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${scenario.color} rounded-lg flex items-center justify-center text-white`}>
                      <span className="text-sm">{scenario.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{scenario.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{scenario.difficulty}</span>
                        <span>{scenario.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className={`${scenario.completion > 0 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                  >
                    {scenario.completion > 0 ? 'Continue' : 'Start Training'}
                  </Button>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                
                {scenario.completion > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Progress</span>
                      <span>{scenario.completion}%</span>
                    </div>
                    <Progress value={scenario.completion} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your Progress */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
          <p className="text-sm text-gray-600 mb-4">Track your farming skills development</p>
          
          <div className="grid grid-cols-4 gap-4 text-center mb-6">
            <div>
              <div className="text-2xl font-bold text-green-600">650</div>
              <div className="text-xs text-gray-600">Level Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-xs text-gray-600">Achievements</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">24.5</div>
              <div className="text-xs text-gray-600">Level Score</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Level Progress</span>
              <span>Level 3</span>
            </div>
            <Progress value={65} className="h-3" />
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{achievement.icon}</span>
                  <span className="font-medium text-gray-900">{achievement.name}</span>
                </div>
                <Badge 
                  variant={achievement.status === 'achieved' ? 'default' : 'secondary'}
                  className={achievement.status === 'achieved' ? 'bg-green-500' : ''}
                >
                  {achievement.status === 'achieved' ? 'Achieved' : 
                   achievement.status === 'in-progress' ? 'In Progress' : 'Locked'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Training Sessions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Training Sessions</h3>
          <div className="space-y-3">
            {[
              { name: 'Pest Identification & Control', score: '95%', time: '2 hours ago', icon: '🛡️' },
              { name: 'Precision Planting', score: '88%', time: '1 day ago', icon: '🌱' },
              { name: 'Field Crop', score: '92%', time: '2 days ago', icon: '🌾' }
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{session.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{session.name}</div>
                    <div className="text-sm text-gray-500">{session.time}</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {session.score}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldSimXRInterface;
