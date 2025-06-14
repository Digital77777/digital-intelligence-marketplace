
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Achievement } from './types';

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-xl">{achievement.icon}</span>
        <span className="font-medium text-gray-900">{achievement.name}</span>
      </div>
      <Badge 
        variant={achievement.status === 'achieved' ? 'default' : 'secondary'}
        className={achievement.status === 'achieved' ? 'bg-green-500 text-white' : achievement.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}
      >
        {achievement.status === 'achieved' ? 'Achieved' : 
         achievement.status === 'in-progress' ? 'In Progress' : 'Locked'}
      </Badge>
    </div>
  );
};

export default AchievementItem;
