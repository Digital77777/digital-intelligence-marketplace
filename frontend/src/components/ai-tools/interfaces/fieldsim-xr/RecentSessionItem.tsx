
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { RecentSession } from './types';

interface RecentSessionItemProps {
  session: RecentSession;
}

const RecentSessionItem: React.FC<RecentSessionItemProps> = ({ session }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-lg">{session.icon}</span>
        <div>
          <div className="font-medium text-gray-900">{session.name}</div>
          <div className="text-sm text-gray-500">{session.time}</div>
        </div>
      </div>
      <Badge variant="outline" className="text-green-600 border-green-600">
        {session.score}
      </Badge>
    </div>
  );
};

export default RecentSessionItem;
