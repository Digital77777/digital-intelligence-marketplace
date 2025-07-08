
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  category?: string;
}

export const forumData: ForumPost[] = [
  {
    id: 'cropmind-discussion',
    title: 'CropMind AI: Best Practices and Tips',
    content: 'Share your experience using CropMind AI for crop management and farming optimization',
    tags: ['cropmind', 'farming', 'ai', 'tips'],
    category: 'Agriculture'
  },
  {
    id: 'data-analytics-help',
    title: 'Getting Started with Data Analytics Tools',
    content: 'Need help choosing the right analytics tool for your business? Discussion here.',
    tags: ['analytics', 'tools', 'help', 'business'],
    category: 'Analytics'
  },
  {
    id: 'automation-workflows',
    title: 'Workflow Automation Success Stories',
    content: 'Share how automation tools have improved your business processes',
    tags: ['automation', 'workflows', 'business', 'success'],
    category: 'Automation'
  },
  {
    id: 'ai-tool-recommendations',
    title: 'Best AI Tools for Small Businesses',
    content: 'What are your favorite AI tools for small business operations?',
    tags: ['ai tools', 'small business', 'recommendations'],
    category: 'General'
  },
  {
    id: 'machine-learning-tips',
    title: 'Machine Learning Implementation Tips',
    content: 'Share your tips and tricks for implementing ML in production',
    tags: ['machine learning', 'implementation', 'production'],
    category: 'Development'
  }
];
