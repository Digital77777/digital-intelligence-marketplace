
import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';

interface ToolDescriptionProps {
  tool: AIToolItem;
}

const ToolDescription: React.FC<ToolDescriptionProps> = ({ tool }) => {
  return (
    <>
      <div className="text-6xl mb-6">{tool.icon}</div>
      <h2 className="text-2xl font-bold mb-2">Welcome to {tool.name}</h2>
      <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
        {tool.description}
      </p>
    </>
  );
};

export default ToolDescription;
