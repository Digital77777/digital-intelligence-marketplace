
import React from 'react';
import TrainingScenarioItem from './TrainingScenarioItem';
import { TrainingScenario } from './types';

interface TrainingScenariosListProps {
  scenarios: TrainingScenario[];
}

const TrainingScenariosList: React.FC<TrainingScenariosListProps> = ({ scenarios }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Scenarios</h3>
      <p className="text-sm text-gray-600 mb-4">
        Select a farming scenario to practice. VR training experiences available.
      </p>
      
      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <TrainingScenarioItem key={scenario.id} scenario={scenario} />
        ))}
      </div>
    </div>
  );
};

export default TrainingScenariosList;
