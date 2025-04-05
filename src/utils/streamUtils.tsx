
import React from 'react';
import { BookOpen, FlaskConical, Code, Radio, Play } from 'lucide-react';

export const getCategoryIcon = (category: string): JSX.Element => {
  switch (category) {
    case 'tutorial':
      return <BookOpen className="h-4 w-4" />;
    case 'research':
      return <FlaskConical className="h-4 w-4" />;
    case 'demo':
      return <Code className="h-4 w-4" />;
    case 'live':
      return <Radio className="h-4 w-4" />;
    default:
      return <Play className="h-4 w-4" />;
  }
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'tutorial':
      return "bg-blue-500";
    case 'research':
      return "bg-purple-500";
    case 'demo':
      return "bg-green-500";
    case 'live':
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Added tool utils
export const getToolAccessText = (toolTier: string, userTier: string): string => {
  if (toolTier === 'freemium') return 'Available to all users';
  if (toolTier === 'basic') {
    if (userTier === 'basic' || userTier === 'pro') return 'Available with your subscription';
    return 'Requires Basic subscription';
  }
  if (toolTier === 'pro') {
    if (userTier === 'pro') return 'Available with your subscription';
    return 'Requires Pro subscription';
  }
  return 'Subscription required';
};
