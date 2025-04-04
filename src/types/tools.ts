export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  image_url?: string;
  use_cases: string[];
  rationale?: string;
  required_tier: string;
  created_at: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  count: number;
}

export interface ToolCategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
}
