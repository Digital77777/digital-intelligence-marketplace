
import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Menu } from 'lucide-react';

const FieldSimHeader: React.FC = () => {
  return (
    <div className="bg-white border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FieldSim XR</h1>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default FieldSimHeader;
