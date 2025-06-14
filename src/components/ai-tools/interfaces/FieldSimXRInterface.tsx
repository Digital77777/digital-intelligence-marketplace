
import React, { useState } from 'react';
import FieldSimHeader from './fieldsim-xr/FieldSimHeader';
import WelcomeSection from './fieldsim-xr/WelcomeSection';
import StatsDisplayGrid from './fieldsim-xr/StatsDisplayGrid';
import TrainingSceneCard from './fieldsim-xr/TrainingSceneCard';
import TrainingScenariosList from './fieldsim-xr/TrainingScenariosList';
import UserProgressSection from './fieldsim-xr/UserProgressSection';
import AchievementsList from './fieldsim-xr/AchievementsList';
import RecentSessionsList from './fieldsim-xr/RecentSessionsList';
import { TrainingScenario, Achievement, RecentSession, StatItemData } from './fieldsim-xr/types';

const FieldSimXRInterface = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const trainingScenariosData: TrainingScenario[] = [
    {
      id: 'precision-planting',
      name: 'Precision Planting',
      difficulty: 'Beginner',
      duration: '15 min',
      completion: 85,
      description: 'Learn optimal planting techniques for different crop types and seasonal conditions.',
      color: 'bg-green-500',
      icon: '🌱'
    },
    {
      id: 'pest-identification',
      name: 'Pest Identification & Control',
      difficulty: 'Intermediate',
      duration: '25 min',
      completion: 0,
      description: 'Identify common agricultural pests and learn effective control methods.',
      color: 'bg-orange-500',
      icon: '🛡️'
    },
    {
      id: 'fertilizer-application',
      name: 'Fertilizer Application',
      difficulty: 'Advanced',
      duration: '30 min',
      completion: 0,
      description: 'Master optimal fertilizer application timing and techniques for maximum yield.',
      color: 'bg-red-500',
      icon: '🌾'
    },
    {
      id: 'seasonal-planning',
      name: 'Seasonal Planning',
      difficulty: 'Intermediate',
      duration: '20 min',
      completion: 0,
      description: 'Plan your farming activities across seasons for optimal crop rotation.',
      color: 'bg-blue-500',
      icon: '📅'
    }
  ];

  const topStatsData: StatItemData[] = [
    { label: 'XR Training Score', value: '650', unit: 'points' },
    { label: 'Modules Completed', value: '12', unit: 'modules' },
    { label: 'Success Rate', value: '98%', unit: '' },
    { label: 'Total Practice Time', value: '3', unit: 'hours' }
  ];

  const achievementsData: Achievement[] = [
    { name: 'First Harvest', status: 'achieved', icon: '🏆' },
    { name: 'Pest Expert', status: 'achieved', icon: '🛡️' },
    { name: 'Water Wise', status: 'in-progress', icon: '💧' },
    { name: 'Soil Master', status: 'locked', icon: '🌱' }
  ];
  
  const recentSessionsData: RecentSession[] = [
    { name: 'Pest Identification & Control', score: '95%', time: '2 hours ago', icon: '🛡️' },
    { name: 'Precision Planting', score: '88%', time: '1 day ago', icon: '🌱' },
    { name: 'Field Crop', score: '92%', time: '2 days ago', icon: '🌾' }
  ];

  // Data for UserProgressSection
  const userProgressProps = {
    levelScore: "650", // From "Your Progress" section, first item
    completedModules: "12", // From "Your Progress" section, second item
    achievementsCount: "3", // From "Your Progress" section, third item
    overallScore: "24.5", // From "Your Progress" section, fourth item (labeled "Level Score" in original)
    levelProgressValue: 65, // Hardcoded from Progress component
    currentLevel: "3", // Hardcoded from Progress component label
  };


  return (
    <div className="min-h-screen bg-white">
      <FieldSimHeader />

      <div className="p-4 space-y-6">
        <WelcomeSection />
        <StatsDisplayGrid stats={topStatsData} />
        <TrainingSceneCard />
        <TrainingScenariosList scenarios={trainingScenariosData} />
        <UserProgressSection {...userProgressProps} />
        <AchievementsList achievements={achievementsData} />
        <RecentSessionsList sessions={recentSessionsData} />
      </div>
    </div>
  );
};

export default FieldSimXRInterface;
