
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface UserProgressSectionProps {
  levelScore: string | number;
  completedModules: string | number;
  achievementsCount: string | number;
  overallScore: string | number; // Renamed from "Level Score" to avoid confusion
  levelProgressValue: number;
  currentLevel: string | number;
}

const UserProgressSection: React.FC<UserProgressSectionProps> = ({
  levelScore,
  completedModules,
  achievementsCount,
  overallScore,
  levelProgressValue,
  currentLevel,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
      <p className="text-sm text-gray-600 mb-4">Track your farming skills development</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-6">
        <div>
          <div className="text-2xl font-bold text-green-600">{levelScore}</div>
          <div className="text-xs text-gray-600">Level Score</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-600">{completedModules}</div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">{achievementsCount}</div>
          <div className="text-xs text-gray-600">Achievements</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-orange-600">{overallScore}</div>
          <div className="text-xs text-gray-600">Overall Score</div> {/* Changed label */}
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Level Progress</span>
          <span>Level {currentLevel}</span>
        </div>
        <Progress value={levelProgressValue} className="h-3" />
      </div>
    </div>
  );
};

export default UserProgressSection;
