
import React from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import TeamDashboardContent from './TeamDashboardContent';
import { useTeamDashboardData } from './hooks/useTeamDashboardData';

const TeamDashboard = () => {
  const { data, isLoading, isError, error, refetch, invalidateQueries } = useTeamDashboardData();

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." className="py-12" />;
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load dashboard"
        message={error?.message || 'Unable to load dashboard data'}
        onRetry={refetch}
        className="my-8"
      />
    );
  }

  const tasks = data?.tasks || [];
  const teams = data?.teams || [];

  return (
    <TeamDashboardContent
      tasks={tasks}
      teams={teams}
      onInvalidateQueries={invalidateQueries}
    />
  );
};

export default TeamDashboard;
