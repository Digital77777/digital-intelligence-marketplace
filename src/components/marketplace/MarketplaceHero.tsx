import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Plus, Target, Briefcase, Users, Settings, Award } from 'lucide-react';
interface MarketplaceHeroProps {
  onPostProject: () => void;
  onCreateFreelancerProfile: () => void;
}
const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({
  onPostProject,
  onCreateFreelancerProfile
}) => {
  const stats = [{
    label: 'Active Projects',
    value: '1,234',
    icon: <Briefcase className="w-5 h-5" />,
    color: 'text-blue-600'
  }, {
    label: 'AI Experts',
    value: '2,567',
    icon: <Users className="w-5 h-5" />,
    color: 'text-green-600'
  }, {
    label: 'Tools Available',
    value: '890',
    icon: <Settings className="w-5 h-5" />,
    color: 'text-purple-600'
  }, {
    label: 'Success Rate',
    value: '98%',
    icon: <Award className="w-5 h-5" />,
    color: 'text-orange-600'
  }];
  return <div className="mb-12 relative overflow-hidden rounded-3xl">
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 h-96 md:h-[450px] flex items-center relative">
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl my-0 py-0">
            <div className="mb-6 my-[3px]">
              <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm border-white/30 text-white">
                <Zap className="w-4 h-4 mr-2" />
                World's Premier AI Marketplace
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight text-left md:text-4xl">
              Connect with
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                AI Experts
              </span>
              Worldwide
            </h1>
            <p className="text-white/90 text-xl max-w-3xl mb-8 animate-slide-up leading-relaxed md:text-xl py-0 my-0">
              Hire top AI talent, discover cutting-edge tools, and grow your business with the most trusted AI marketplace platform.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => <div key={index} className="text-center my-0 py-0">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mb-2 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>)}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{
            animationDelay: "0.2s"
          }}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg" onClick={onPostProject}>
                <Plus className="w-5 h-5 mr-2" />
                Post a Project
              </Button>
              <Button variant="outline" size="lg" onClick={onCreateFreelancerProfile} className="border-white text-white font-semibold px-8 py-4 text-lg backdrop-blur-sm bg-gray-900 hover:bg-gray-800">
                <Target className="w-5 h-5 mr-2" />
                Start Freelancing
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/4 top-1/4 w-64 h-64 bg-yellow-400/20 rounded-full filter blur-2xl"></div>
      </div>
    </div>;
};
export default MarketplaceHero;