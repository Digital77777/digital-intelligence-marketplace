import React from 'react';
import { Button } from '@/components/ui/button';
import { useTier } from '@/context/TierContext';
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {
  const { currentTier, upgradePrompt } = useTier();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (currentTier === 'basic' || currentTier === 'pro') {
      navigate('/ai-streams/upload');
    } else {
      upgradePrompt('basic');
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden mb-10">
      <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-purple-900 py-16 px-8 rounded-xl">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Streams</h1>
          <p className="text-indigo-100 text-lg mb-6">
            Watch tutorials, research presentations, live demos, and coding sessions from AI experts and community members.
          </p>
          <Button className="bg-white text-purple-900 hover:bg-indigo-50" onClick={handleUploadClick}>
            {currentTier === 'basic' || currentTier === 'pro' ? 'Upload Your Stream' : 'Upgrade to Upload'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
