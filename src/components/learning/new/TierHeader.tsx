import React from 'react';

interface TierHeaderProps {
  tier: string;
}

const TierHeader: React.FC<TierHeaderProps> = ({ tier }) => {
  return (
    <div className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md shadow-md">
      {tier}
    </div>
  );
};

export default TierHeader;
