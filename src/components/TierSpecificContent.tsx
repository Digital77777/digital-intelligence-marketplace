
import React from 'react';
import { useTier } from '@/context/TierContext';
import { useUser } from '@/context/UserContext';
import FreemiumTierContent from './tier-content/FreemiumTierContent';
import BasicTierContent from './tier-content/BasicTierContent';
import ProTierContent from './tier-content/ProTierContent';
import { useLearningAcademyCourses } from '@/utils/learningAcademyService';
import { useBusinessInsights } from '@/utils/businessInsightsService';

const TierSpecificContent = () => {
  const { currentTier } = useTier();
  const { user } = useUser();
  
  // Fetch data for Pro tier content
  const { 
    data: courses, 
    isLoading: coursesLoading 
  } = useLearningAcademyCourses();
  
  const { 
    data: insights, 
    isLoading: insightsLoading 
  } = useBusinessInsights();

  // Pass relevant data to each tier component
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {currentTier === 'freemium' ? (
          <FreemiumTierContent />
        ) : currentTier === 'basic' ? (
          <BasicTierContent />
        ) : (
          <ProTierContent 
            isLoggedIn={!!user}
            featuredCourses={courses?.filter(c => c.is_featured) || []}
            businessInsights={insights || []}
            isLoading={coursesLoading || insightsLoading}
          />
        )}
      </div>
    </section>
  );
};

export default TierSpecificContent;
