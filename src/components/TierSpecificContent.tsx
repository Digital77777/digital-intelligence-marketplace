
import React from 'react';
import { useTier } from '@/context/TierContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Users, 
  GitBranch, 
  BarChart3, 
  Shield, 
  Sparkles, 
  Lock, 
  Check, 
  ArrowRight 
} from 'lucide-react';

const TierSpecificContent = () => {
  const { currentTier } = useTier();

  const renderFreemiumContent = () => (
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
          Explore our core AI tools and community features for free. Upgrade to unlock premium features.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          {
            icon: <Zap className="h-10 w-10 text-amber-500" />,
            title: "Core AI Tools",
            description: "Access to 10 essential AI tools to get started with your projects",
            available: true
          },
          {
            icon: <Users className="h-10 w-10 text-purple-500" />,
            title: "Team Collaboration",
            description: "Collaborate with your team on projects and workflows",
            available: false,
            requiredTier: "Basic"
          },
          {
            icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
            title: "Usage Analytics",
            description: "Track your API usage and tool performance",
            available: false,
            requiredTier: "Basic"
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{feature.description}</p>
              
              <div className="mt-auto">
                {feature.available ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800/60 flex items-center w-fit">
                    <Check className="h-3.5 w-3.5 mr-1.5" />
                    Available
                  </Badge>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-400 flex items-center w-fit">
                      <Lock className="h-3.5 w-3.5 mr-1.5" />
                      {feature.requiredTier} Tier Required
                    </Badge>
                    <Link to="/pricing" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 w-fit">
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
          <Button className="px-6 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
            Upgrade to Basic Tier
          </Button>
        </Link>
      </div>
    </div>
  );

  const renderBasicContent = () => (
    <div className="py-10">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 bg-blue-100/50 backdrop-blur-sm border-blue-200/50 dark:bg-blue-900/30 dark:border-blue-800/50">
          <Shield className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
          <span className="text-blue-800 dark:text-blue-300">Basic Tier Access</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome to the <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Basic Tier</span>
        </h2>
        <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
          Unlock advanced collaboration features and extended AI tool access
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: <GitBranch className="h-8 w-8 text-blue-500" />,
            title: "Workflow Designer",
            description: "Create custom automation workflows",
            link: "/workflow-designer"
          },
          {
            icon: <Users className="h-8 w-8 text-purple-500" />,
            title: "Collaboration Hub",
            description: "Work together with your team",
            link: "/collaboration-hub"
          },
          {
            icon: <BarChart3 className="h-8 w-8 text-amber-500" />,
            title: "Team Dashboard",
            description: "Monitor team performance and metrics",
            link: "/team-dashboard"
          }
        ].map((feature, index) => (
          <Link 
            key={index}
            to={feature.link}
            className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col h-full group"
          >
            <div className="h-14 w-14 bg-blue-100/80 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            <div className="mt-4 flex justify-end">
              <ArrowRight className="h-5 w-5 text-blue-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-20"></div>
        <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 max-w-4xl mx-auto shadow-xl border border-blue-100/50 dark:border-blue-900/50">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative h-32 w-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-inner">
                <div className="text-3xl font-bold text-white flex flex-col items-center">
                  <span>100+</span>
                  <span className="text-sm font-medium mt-1">AI Tools</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Explore Extended AI Tool Access</h3>
              <p className="text-lg text-foreground/70 mb-6">
                As a Basic tier member, you now have access to over 100 AI tools, advanced collaboration features, and priority support.
              </p>
              <Link to="/ai-tools">
                <Button variant="default" size="lg" className="font-medium">
                  Browse AI Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {currentTier === 'freemium' ? renderFreemiumContent() : renderBasicContent()}
      </div>
    </section>
  );
};

export default TierSpecificContent;
