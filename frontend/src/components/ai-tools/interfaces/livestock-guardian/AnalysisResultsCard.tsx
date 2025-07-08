
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Users } from 'lucide-react';
import { AnalysisResult } from './types';

interface AnalysisResultsCardProps {
  analysisResult: AnalysisResult;
}

const AnalysisResultsCard: React.FC<AnalysisResultsCardProps> = ({ analysisResult }) => {
  return (
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
            {analysisResult.individualAnimals.map((animal, index) => (
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
  );
};

export default AnalysisResultsCard;
