
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrainingScenario } from './types';

interface TrainingScenarioItemProps {
  scenario: TrainingScenario;
}

const TrainingScenarioItem: React.FC<TrainingScenarioItemProps> = ({ scenario }) => {
  return (
    <div className="border rounded-lg p-4">
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
  );
};

export default TrainingScenarioItem;
