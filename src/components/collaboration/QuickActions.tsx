
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, CalendarPlus, FileUp, Settings, Users } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  const actions = [
    { 
      title: "New Discussion", 
      icon: <MessageCircle className="h-4 w-4 mr-2" />,
      path: "/forums/new-topic/general"
    },
    { 
      title: "Schedule Meeting", 
      icon: <CalendarPlus className="h-4 w-4 mr-2" />,
      path: "/team-dashboard/calendar"
    },
    { 
      title: "Share Document", 
      icon: <FileUp className="h-4 w-4 mr-2" />,
      path: "/collaboration-hub/files"
    },
    { 
      title: "Manage Team", 
      icon: <Users className="h-4 w-4 mr-2" />,
      path: "/team-dashboard"
    },
    { 
      title: "Project Settings", 
      icon: <Settings className="h-4 w-4 mr-2" />,
      path: "/collaboration-hub/settings"
    }
  ];

  const handleButtonClick = (path: string) => {
    // Make sure we scroll to top before navigating
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="w-full justify-start booking-btn-secondary"
              onClick={() => handleButtonClick(action.path)}
            >
              {action.icon}
              {action.title}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
