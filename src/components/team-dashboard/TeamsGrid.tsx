
import React from 'react';
import TeamCard from './TeamCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';

interface Team {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  created_by: string;
}

interface TeamsGridProps {
  teams: Team[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const TeamsGrid: React.FC<TeamsGridProps> = ({ 
  teams, 
  isLoading = false, 
  error = null, 
  onRetry 
}) => {
  if (isLoading) {
    return <LoadingSpinner text="Loading teams..." className="py-8" />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load teams"
        message={error}
        onRetry={onRetry}
        className="my-4"
      />
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No teams found. Create your first team to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
};

export default TeamsGrid;
