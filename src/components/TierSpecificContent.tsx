
import React from 'react';
import { useTier } from '@/context/TierContext';
import FreemiumTierContent from './tier-content/FreemiumTierContent';
import BasicTierContent from './tier-content/BasicTierContent';
import ProTierContent from './tier-content/ProTierContent';

const TierSpecificContent = () => {
  const { currentTier } = useTier();

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {currentTier === 'freemium' 
          ? <FreemiumTierContent /> 
          : currentTier === 'basic' 
            ? <BasicTierContent /> 
            : <ProTierContent />
        }
      </div>
    </section>
  );
};

export default TierSpecificContent;
