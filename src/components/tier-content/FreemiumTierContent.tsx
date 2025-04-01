
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ShoppingBag, 
  BookText,
  Play,
  Users,
  BarChart3,
  FileText,
  Lock,
  ArrowRight
} from 'lucide-react';

const FreemiumTierContent = () => {
  return (
    <div className="py-10">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 bg-white/40 backdrop-blur-sm border-blue-200/50">
          <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
          <span className="text-blue-700 dark:text-blue-300">Free Access</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Discover the Power of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AI Tools</span>
        </h2>
        <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
          Explore our core AI tools, learning resources, and community features for free. Upgrade to unlock premium features.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          {
            icon: <ShoppingBag className="h-10 w-10 text-amber-500" />,
            title: "AI Marketplace",
            description: "Access our marketplace of AI tools and services",
            available: true,
            link: "/marketplace"
          },
          {
            icon: <BookText className="h-10 w-10 text-blue-500" />,
            title: "Learning Hub",
            description: "Learn about AI with our comprehensive guides and tutorials",
            available: true,
            link: "/learning-hub"
          },
          {
            icon: <Play className="h-10 w-10 text-purple-500" />,
            title: "AI Streams",
            description: "Watch live and recorded AI demonstrations and tutorials",
            available: true,
            link: "/ai-streams"
          },
          {
            icon: <Users className="h-10 w-10 text-emerald-500" />,
            title: "Team Collaboration",
            description: "Collaborate with your team on projects and workflows",
            available: false,
            requiredTier: "Basic"
          },
          {
            icon: <BarChart3 className="h-10 w-10 text-indigo-500" />,
            title: "Usage Analytics",
            description: "Track your API usage and tool performance",
            available: false,
            requiredTier: "Basic"
          },
          {
            icon: <FileText className="h-10 w-10 text-rose-500" />,
            title: "Compliance Tools",
            description: "Ensure your AI solutions meet regulatory requirements",
            available: false,
            requiredTier: "Pro"
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0088ff] to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{feature.description}</p>
              
              <div className="mt-auto">
                {feature.available ? (
                  <Link to={feature.link || "#"} className="w-full">
                    <Button variant="outline" className="w-full">
                      Explore Now
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-400 flex items-center w-fit">
                      <Lock className="h-3.5 w-3.5 mr-1.5" />
                      {feature.requiredTier} Tier Required
                    </Badge>
                    <Link to="/pricing" className="text-sm text-[#0088ff] hover:text-[#0066cc] dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 w-fit">
                      Upgrade now <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Link to="/pricing">
          <Button className="px-6 py-6 text-lg bg-gradient-to-r from-[#0088ff] to-purple-600 hover:from-[#0066cc] hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
            Upgrade to Basic Tier
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FreemiumTierContent;
