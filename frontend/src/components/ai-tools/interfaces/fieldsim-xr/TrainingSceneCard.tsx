
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const TrainingSceneCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-lg p-6 text-white relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-2">XR Training Scene</h3>
        <p className="text-sm opacity-90 mb-4">Immersive 3D farming environment</p>
        <Button className="bg-white text-gray-900 hover:bg-gray-100">
          <Play className="h-4 w-4 mr-2" />
          Start Training
        </Button>
      </div>
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[url('/lovable-uploads/a04f2848-1f9e-4d8c-bdc1-8b50f4d86590.png')] bg-cover bg-center"></div>
      </div>
    </div>
  );
};

export default TrainingSceneCard;
