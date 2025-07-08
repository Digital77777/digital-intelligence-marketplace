
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Settings, DollarSign, Plus, Sparkles } from 'lucide-react';
import { useTier } from '@/context/TierContext';

interface MarketplaceHeroProps {
  onPostProject: () => void;
  onCreateFreelancerProfile: () => void;
}

const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({
  onPostProject,
  onCreateFreelancerProfile
}) => {
  const navigate = useNavigate();
  const { currentTier } = useTier();

  const handleSubmitTool = () => {
    navigate('/submit-tool');
  };

  const handleCreateService = () => {
    navigate('/marketplace/create-service');
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Digital Intelligence Marketplace
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with AI experts, discover innovative tools, and grow your business with cutting-edge solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onPostProject}>
          <CardContent className="p-6 text-center">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Post a Project</h3>
            <p className="text-sm text-muted-foreground">Find experts for your AI projects</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onCreateFreelancerProfile}>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Become an Expert</h3>
            <p className="text-sm text-muted-foreground">Offer your AI expertise</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleCreateService}>
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">Create Service</h3>
            <p className="text-sm text-muted-foreground">Offer your skills as a service</p>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-md transition-shadow cursor-pointer border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50" 
          onClick={handleSubmitTool}
        >
          <CardContent className="p-6 text-center">
            <div className="relative">
              <Plus className="h-12 w-12 mx-auto mb-4 text-amber-600" />
              {(currentTier === 'basic' || currentTier === 'pro') && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Sparkles className="h-3 w-3 mr-1" />
                  New
                </Badge>
              )}
            </div>
            <h3 className="font-semibold mb-2">Submit Your Tool</h3>
            <p className="text-sm text-muted-foreground">
              {currentTier === 'freemium' 
                ? 'Upgrade to submit tools' 
                : 'Share your AI tool or service'
              }
            </p>
            {currentTier === 'freemium' && (
              <Badge variant="secondary" className="mt-2">
                Basic+ Required
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Join thousands of innovators</h2>
        <p className="text-muted-foreground mb-4">
          Whether you're looking to hire, get hired, or discover tools - we've got you covered.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button onClick={onPostProject}>
            <Briefcase className="h-4 w-4 mr-2" />
            Post Project
          </Button>
          <Button variant="outline" onClick={handleSubmitTool}>
            <Plus className="h-4 w-4 mr-2" />
            Submit Tool
          </Button>
          <Button variant="outline" onClick={handleCreateService}>
            <DollarSign className="h-4 w-4 mr-2" />
            Create Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHero;
