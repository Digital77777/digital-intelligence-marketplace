
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Zap } from "lucide-react";

type LearningHubHeroProps = {
  currentTier: string;
  getTierIcon: (tier: string) => React.ReactNode;
};

const LearningHubHero: React.FC<LearningHubHeroProps> = ({ currentTier, getTierIcon }) => {
  // Determine which tagline to show
  const subtitle =
    currentTier === "pro"
      ? "Access expert-level training, industry certifications, and exclusive events."
      : currentTier === "basic"
      ? "Enhance your skills with intermediate courses, learning paths, and live webinars."
      : "Explore foundational AI courses and community resources to begin your learning journey.";

  return (
    <div className="relative rounded-xl overflow-hidden mb-10">
      <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-purple-900 py-16 px-8 rounded-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            {getTierIcon(currentTier)}
            <Badge variant="outline" className="capitalize bg-white/10 text-white border-white/20">
              {currentTier} Tier
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Learning Hub</h1>
          <p className="text-indigo-100 text-lg mb-6">{subtitle}</p>
          <div className="flex gap-4">
            <Button className="bg-white text-purple-900 hover:bg-indigo-50">Start Learning</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Browse Catalog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningHubHero;
