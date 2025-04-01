
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
  ArrowRight,
  Code,
  LineChart,
  ShieldCheck,
  BookText,
  MessageSquareText,
  ShoppingBag,
  Play,
  FileText
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
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
              <div className="flex gap-4">
                <Link to="/ai-tools">
                  <Button variant="default" size="lg" className="font-medium">
                    Browse AI Tools
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="font-medium">
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProContent = () => (
    <div className="py-10">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 bg-purple-100/50 backdrop-blur-sm border-purple-200/50 dark:bg-purple-900/30 dark:border-purple-800/50">
          <Zap className="h-3.5 w-3.5 mr-1.5 text-[#6AC8FF]" />
          <span className="text-purple-800 dark:text-purple-300">Pro Tier Access</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome to the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Pro Experience</span>
        </h2>
        <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
          Unlock enterprise-grade features, custom AI models, and advanced analytics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: <Code className="h-8 w-8 text-[#6AC8FF]" />,
            title: "AI Studio",
            description: "Build and train custom AI models with a visual interface",
            link: "/ai-studio"
          },
          {
            icon: <Zap className="h-8 w-8 text-pink-500" />,
            title: "Model Marketplace",
            description: "Access 250+ premium AI models and tools",
            link: "/model-marketplace"
          },
          {
            icon: <GitBranch className="h-8 w-8 text-purple-500" />,
            title: "Pipeline Designer",
            description: "Create advanced data and AI pipelines",
            link: "/pipeline-designer"
          },
          {
            icon: <Users className="h-8 w-8 text-indigo-500" />,
            title: "Team Workspace",
            description: "Collaborate with unlimited team members",
            link: "/team-workspace"
          },
          {
            icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
            title: "Compliance Center",
            description: "Ensure GDPR/HIPAA compliance for your AI projects",
            link: "/compliance-center"
          },
          {
            icon: <LineChart className="h-8 w-8 text-amber-500" />,
            title: "Business Insights",
            description: "Generate reports and analytics for stakeholders",
            link: "/business-insights"
          }
        ].map((feature, index) => (
          <Link 
            key={index}
            to={feature.link}
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/70 hover:border-[#6AC8FF]/30 hover:shadow-lg hover:shadow-[#6AC8FF]/5 transition-all duration-300 flex flex-col h-full group"
          >
            <div className="h-14 w-14 bg-gray-800/80 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-800 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#6AC8FF] transition-colors">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
            <div className="mt-4 flex justify-end">
              <ArrowRight className="h-5 w-5 text-[#6AC8FF] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="relative col-span-1 md:col-span-2">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-[#6AC8FF] to-indigo-600 rounded-2xl blur-lg opacity-20"></div>
          <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Pro-Exclusive Features</h3>
                <p className="text-lg text-gray-300 mb-6">
                  As a Pro tier member, you have access to our complete suite of enterprise-grade tools, unlimited team members, dedicated support, and custom AI model development.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    "Custom AI Models", 
                    "Unlimited Team Members", 
                    "Dedicated Support", 
                    "Advanced Security", 
                    "Business Analytics", 
                    "API Access"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[#6AC8FF]" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6AC8FF] to-purple-600 rounded-full blur-md opacity-40 animate-pulse"></div>
                  <div className="relative h-40 w-40 bg-gradient-to-br from-[#6AC8FF] to-purple-600 rounded-full flex items-center justify-center shadow-inner">
                    <div className="text-3xl font-bold text-white flex flex-col items-center">
                      <span>250+</span>
                      <span className="text-sm font-medium mt-1">Premium Tools</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/70 hover:border-[#6AC8FF]/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquareText className="h-8 w-8 text-[#6AC8FF]" />
            <h3 className="text-xl font-semibold text-white">Pro AI Assistant</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Our dedicated AI assistant is ready to help you with any questions about the platform, AI models, or your projects.
          </p>
          <Link to="/pro-chatbot">
            <Button variant="outline" className="w-full border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
              Launch AI Assistant
            </Button>
          </Link>
        </div>
        
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/70 hover:border-[#6AC8FF]/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <BookText className="h-8 w-8 text-[#6AC8FF]" />
            <h3 className="text-xl font-semibold text-white">Learning Academy</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Access advanced courses, certifications, and expert-led workshops on AI development, MLOps, and more.
          </p>
          <Link to="/learning-academy">
            <Button variant="outline" className="w-full border-[#6AC8FF]/30 text-[#6AC8FF] hover:bg-[#6AC8FF]/10">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {currentTier === 'freemium' 
          ? renderFreemiumContent() 
          : currentTier === 'basic' 
            ? renderBasicContent() 
            : renderProContent()
        }
      </div>
    </section>
  );
};

export default TierSpecificContent;
