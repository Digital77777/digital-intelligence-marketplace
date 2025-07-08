
import React from 'react';
import AchievementItem from './AchievementItem';
import { Achievement } from './types';

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList: React.FC<AchievementsListProps> = ({ achievements }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <AchievementItem key={index} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsList;
