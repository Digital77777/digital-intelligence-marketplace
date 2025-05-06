
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock } from 'lucide-react';

const TeamProjects = () => {
  const topTools = [
    { name: "Hugging Face Transformers", usage: 423 },
    { name: "OpenCV", usage: 312 },
    { name: "Scikit-learn", usage: 287 }
  ];

  const upcomingDeadlines = [
    { project: "NLP Model Training", deadline: "Tomorrow" },
    { project: "Data Pipeline Setup", deadline: "In 3 days" },
    { project: "Image Recognition API", deadline: "Next week" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Star className="mr-2 h-4 w-4 text-yellow-400" />
            Top Tools
          </CardTitle>
          <CardDescription>Most frequently used tools this month</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {topTools.map((tool, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  <span>{tool.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{tool.usage} calls</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center">
            <Clock className="mr-2 h-4 w-4 text-red-500" />
            Upcoming Deadlines
          </CardTitle>
          <CardDescription>Project deadlines to keep in mind</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-orange-500 mr-2" />
                  <span>{deadline.project}</span>
                </div>
                <span className="text-sm text-red-500 font-medium">{deadline.deadline}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamProjects;
