import React from 'react';
import { Bot, BookOpen, Users } from 'lucide-react';

export interface FeaturedResource {
  icon: () => React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  linkTo: string;
}

export const featuredResources: FeaturedResource[] = [
  {
    icon: () => <Bot className="h-8 w-8" />,
    title: "Explore 50+ AI Tools",
    description: "From NLP to Computer Vision—test, learn, and build with our comprehensive collection of AI tools.",
    buttonText: "Browse Tools",
    linkTo: "/ai-tools-directory",
  },
  {
    icon: () => <BookOpen className="h-8 w-8" />,
    title: "Master AI Basics",
    description: "Free courses, hands-on projects, and certifications to help you build practical AI skills.",
    buttonText: "Start Learning",
    linkTo: "/learning-hub",
  },
  {
    icon: () => <Users className="h-8 w-8" />,
    title: "Join 10K+ Innovators",
    description: "Collaborate, share projects, and get feedback from our global community of AI enthusiasts.",
    buttonText: "Introduce Yourself",
    linkTo: "/forums",
  },
];
