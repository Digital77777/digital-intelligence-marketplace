
import { ModelComponent } from '@/components/ai-studio/ModelDesigner';

export interface AIModel {
  id: string;
  name: string;
  version: string;
  description: string;
  components: ModelComponent[];
  created_at: string;
  updated_at: string;
  status: 'draft' | 'training' | 'trained' | 'deployed';
}

// Sample data for model version history
export const getSampleVersionHistory = () => {
  return [
    { version: "1.3.0", date: "2 days ago", author: "Alex Morgan", changes: "Added data normalization step" },
    { version: "1.2.0", date: "1 week ago", author: "Alex Morgan", changes: "Improved model accuracy by 12%" },
    { version: "1.1.0", date: "2 weeks ago", author: "Sophia Chen", changes: "Added validation dataset" },
    { version: "1.0.0", date: "3 weeks ago", author: "Alex Morgan", changes: "Initial model creation" }
  ];
};

// This is a placeholder service - in a real app, this would connect to Supabase or another backend
export const saveModel = async (model: Partial<AIModel>): Promise<AIModel> => {
  console.log('Saving model:', model);
  
  // Mock API response
  return {
    id: model.id || `model-${Date.now()}`,
    name: model.name || 'Untitled Model',
    version: model.version || '1.0.0',
    description: model.description || '',
    components: model.components || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 'draft'
  };
};

export const fetchModelById = async (id: string): Promise<AIModel | null> => {
  console.log('Fetching model by ID:', id);
  // This would be replaced with a real API call
  
  // For now, return null to simulate a "not found" response
  return null;
};
