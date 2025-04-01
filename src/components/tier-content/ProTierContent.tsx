
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Code, 
  LineChart, 
  GitBranch, 
  Users, 
  ShieldCheck, 
  MessageSquareText, 
  BookText,
  ArrowRight,
  Check
} from 'lucide-react';

const ProTierContent = () => {
  return (
    <div className="py-10">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 bg-purple-100/50 backdrop-blur-sm border-purple-200/50 dark:bg-purple-900/30 dark:border-purple-800/50">
          <Zap className="h-3.5 w-3.5 mr-1.5 text-[#00AAFF]" />
          <span className="text-purple-800 dark:text-purple-300">Pro Tier Access</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome to the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-[#00AAFF]">Pro Experience</span>
        </h2>
        <p className="mt-4 text-xl text-foreground/70 max-w-3xl mx-auto">
          Unlock enterprise-grade features, custom AI models, and advanced analytics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: <Code className="h-8 w-8 text-[#00AAFF]" />,
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
            className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/70 hover:border-[#00AAFF]/30 hover:shadow-lg hover:shadow-[#00AAFF]/5 transition-all duration-300 flex flex-col h-full group"
          >
            <div className="h-14 w-14 bg-gray-800/80 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-800 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00AAFF] transition-colors">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
            <div className="mt-4 flex justify-end">
              <ArrowRight className="h-5 w-5 text-[#00AAFF] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="relative col-span-1 md:col-span-2">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-[#00AAFF] to-indigo-600 rounded-2xl blur-lg opacity-20"></div>
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
                      <Check className="h-5 w-5 text-[#00AAFF]" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00AAFF] to-purple-600 rounded-full blur-md opacity-40 animate-pulse"></div>
                  <div className="relative h-40 w-40 bg-gradient-to-br from-[#00AAFF] to-purple-600 rounded-full flex items-center justify-center shadow-inner">
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
        
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/70 hover:border-[#00AAFF]/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquareText className="h-8 w-8 text-[#00AAFF]" />
            <h3 className="text-xl font-semibold text-white">Pro AI Assistant</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Our dedicated AI assistant is ready to help you with any questions about the platform, AI models, or your projects.
          </p>
          <Link to="/pro-chatbot">
            <Button variant="outline" className="w-full border-[#00AAFF]/30 text-[#00AAFF] hover:bg-[#00AAFF]/10">
              Launch AI Assistant
            </Button>
          </Link>
        </div>
        
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800/70 hover:border-[#00AAFF]/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <BookText className="h-8 w-8 text-[#00AAFF]" />
            <h3 className="text-xl font-semibold text-white">Learning Academy</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Access advanced courses, certifications, and expert-led workshops on AI development, MLOps, and more.
          </p>
          <Link to="/learning-academy">
            <Button variant="outline" className="w-full border-[#00AAFF]/30 text-[#00AAFF] hover:bg-[#00AAFF]/10">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProTierContent;
