
import React from 'react';
import RecentSessionItem from './RecentSessionItem';
import { RecentSession } from './types';

interface RecentSessionsListProps {
  sessions: RecentSession[];
}

const RecentSessionsList: React.FC<RecentSessionsListProps> = ({ sessions }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Training Sessions</h3>
      <div className="space-y-3">
        {sessions.map((session, index) => (
          <RecentSessionItem key={index} session={session} />
        ))}
      </div>
    </div>
  );
};

export default RecentSessionsList;
