import { useState, useEffect } from 'react';
import { AIToolItem, aiTools } from '@/data/ai-tools-tiers';
import { ToolChecklistItem, getChecklistForTool } from '@/data/checklistItems';

export const useAIToolChecklist = (toolId: string) => {
  const [tool, setTool] = useState<AIToolItem | null>(null);
  const [checklist, setChecklist] = useState<ToolChecklistItem[]>([]);

  useEffect(() => {
    const currentTool = aiTools.find(t => t.id === toolId);
    if (currentTool) {
      setTool(currentTool);
      setChecklist(getChecklistForTool(currentTool));
    }
  }, [toolId]);

  const runChecks = () => {
    setChecklist(prev => prev.map(item => ({ ...item, status: 'checking' })));
    setTimeout(() => {
      setChecklist(prev => prev.map(item => ({ ...item, status: Math.random() > 0.3 ? 'success' : 'error', message: 'Check complete' })));
    }, 1500);
  };

  return {
    tool,
    checklist,
    runChecks,
    allPassed: checklist.every(item => item.status === 'success'),
    hasErrors: checklist.some(item => item.status === 'error'),
  };
};
