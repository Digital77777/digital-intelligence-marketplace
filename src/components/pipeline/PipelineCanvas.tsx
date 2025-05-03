
import React from 'react';

const PipelineCanvas = () => {
  return (
    <div className="w-full h-full bg-indigo-950/60 rounded-md border border-dashed border-indigo-800 p-4 relative">
      <div className="absolute inset-0 flex items-center justify-center text-indigo-400 text-center p-6">
        <div>
          <p className="mb-2">Drag and drop components from the toolbox to design your pipeline</p>
          <p className="text-sm">Connect nodes by dragging between connection points</p>
        </div>
      </div>
    </div>
  );
};

export default PipelineCanvas;
