// Helper function to check for navigation intent
export const checkNavigationIntent = (message: string): { name: string, route: string } | null => {
  const navigationMappings = [
    { keywords: ['ai studio', 'studio'], name: 'AI Studio', route: '/ai-studio' },
    { keywords: ['ai tools', 'tools directory'], name: 'AI Tools', route: '/ai-tools' },
    { keywords: ['marketplace'], name: 'Marketplace', route: '/marketplace' },
    { keywords: ['learning hub', 'learning', 'courses'], name: 'Learning Hub', route: '/learning-hub' },
    { keywords: ['community', 'forums'], name: 'Community', route: '/community' },
    { keywords: ['profile', 'account'], name: 'Profile', route: '/profile' },
    { keywords: ['workflow'], name: 'Workflow Designer', route: '/workflow-designer' },
    { keywords: ['team dashboard', 'team'], name: 'Team Dashboard', route: '/team-dashboard' },
    { keywords: ['pricing', 'plans'], name: 'Pricing', route: '/pricing' },
    { keywords: ['discovery', 'search'], name: 'Discovery', route: '/discovery' }
  ];
  
  // Check if the message contains navigation intent words
  const hasNavigationIntent = 
    message.includes('take me to') || 
    message.includes('navigate to') || 
    message.includes('go to') || 
    message.includes('show me') || 
    message.includes('open');
  
  if (hasNavigationIntent) {
    for (const mapping of navigationMappings) {
      if (mapping.keywords.some(keyword => message.includes(keyword))) {
        return mapping;
      }
    }
  }
  
  return null;
};

export const handleNavigationIntent = (message: string) => {
  const navigationTarget = checkNavigationIntent(message.toLowerCase());
  if (navigationTarget) {
    // Add a delay to allow the AI response to be displayed first
    setTimeout(() => {
      window.location.href = navigationTarget.route;
    }, 1500);
  }
};
