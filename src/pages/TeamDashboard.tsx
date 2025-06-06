
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import TeamDashboard from '@/components/team-dashboard/TeamDashboard';

const TeamDashboardPage = () => {
  return (
    <BasicTierLayout pageTitle="Team Dashboard" requiredFeature="team-dashboard">
      <TeamDashboard />
    </BasicTierLayout>
  );
};

export default TeamDashboardPage;
