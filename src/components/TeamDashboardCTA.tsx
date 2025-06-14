
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowRight, CheckCircle, BarChart3, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamDashboardCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              New Feature
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Manage Your Team Like a Pro
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Get instant visibility into your team's progress, track tasks, and collaborate more effectively with our new Team Dashboard.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Real-time task tracking and progress monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-green-500" />
                <span>Visual analytics and team performance insights</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-500" />
                <span>Deadline management and milestone tracking</span>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/team-dashboard')}
              className="flex items-center gap-2"
              size="lg"
            >
              <Users className="h-5 w-5" />
              Try Team Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Dashboard Preview
              </CardTitle>
              <CardDescription>
                See what your team dashboard could look like
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-sm text-green-700">Completed Tasks</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-blue-700">In Progress</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Update user interface</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">High</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Database optimization</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">Medium</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TeamDashboardCTA;
