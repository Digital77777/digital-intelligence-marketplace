
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Bell, BarChart3 } from 'lucide-react';

const TaskBotMiniInterface = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">TaskBot Mini</h1>
            <p className="text-gray-600">Smart Task Automation</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8">
        <Button
          variant={activeTab === 'dashboard' ? 'default' : 'outline'}
          onClick={() => setActiveTab('dashboard')}
          className={activeTab === 'dashboard' ? 'bg-blue-600' : ''}
        >
          Dashboard
        </Button>
        <Button
          variant={activeTab === 'schedule' ? 'default' : 'outline'}
          onClick={() => setActiveTab('schedule')}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule
        </Button>
        <Button
          variant={activeTab === 'notifications' ? 'default' : 'outline'}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </Button>
      </div>

      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Tasks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Total Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">0</div>
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Today's Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">0</div>
            </CardContent>
          </Card>

          {/* Active Automations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Active Automations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600">0</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Today's Schedule Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
          <p className="text-gray-600">Your automated tasks for today</p>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-gray-300 rounded-full border-dashed"></div>
          </div>
          <p className="text-gray-500 mb-2">No tasks scheduled for today. Enjoy your</p>
          <p className="text-gray-500">free time!</p>
        </CardContent>
      </Card>

      {/* Upcoming Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Upcoming
          </CardTitle>
          <p className="text-gray-600">Next automated tasks</p>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">No upcoming tasks</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskBotMiniInterface;
