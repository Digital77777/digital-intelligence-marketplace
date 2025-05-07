
import React from 'react';
import { AIToolItem } from '@/data/ai-tools-tiers';

interface ToolUseCasesProps {
  tool: AIToolItem;
}

const ToolUseCases: React.FC<ToolUseCasesProps> = ({ tool }) => {
  return (
    <div className="w-full max-w-lg">
      <h3 className="font-semibold mb-2">What you can do with {tool.name}:</h3>
      <ul className="text-left space-y-2 mb-6">
        {tool.use_cases?.map((useCase, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>{useCase}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolUseCases;
