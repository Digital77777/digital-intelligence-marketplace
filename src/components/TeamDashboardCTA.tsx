
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, CheckCircle, Clock, Target } from 'lucide-react';

const TeamDashboardCTA = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Real-time Analytics",
      description: "Track team performance and project progress"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Collaboration",
      description: "Manage team members and assignments"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Project Management",
      description: "Organize tasks and meet deadlines"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            ✨ Now Available
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Supercharge Your Team with
            <span className="text-blue-600"> Team Dashboard</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant insights into your team's performance, track project progress, and collaborate more effectively with our powerful dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-lg font-medium">Ready to use with sample data</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600">Takes less than 30 seconds to explore</span>
            </div>
            <Button 
              size="lg" 
              onClick={() => navigate('/team-dashboard')}
              className="w-full md:w-auto text-lg px-8 py-3"
            >
              Try Team Dashboard Now
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              No setup required • Explore with sample data
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDashboardCTA;
