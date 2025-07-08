
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, GraduationCap, BarChart3, FileText, ArrowRight, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LearningAcademyCourse } from '@/utils/learningAcademyService';
import { BusinessInsight } from '@/utils/businessInsightsService';

interface ProTierContentProps {
  isLoggedIn?: boolean;
  featuredCourses?: LearningAcademyCourse[];
  businessInsights?: BusinessInsight[];
  isLoading?: boolean;
}

const ProTierContent: React.FC<ProTierContentProps> = ({ 
  isLoggedIn = false,
  featuredCourses = [],
  businessInsights = [],
  isLoading = false
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-4 px-3 py-1 bg-[#00AAFF]/10 backdrop-blur-sm border-[#00AAFF]/30">
          <Sparkles className="h-3.5 w-3.5 mr-1.5 text-[#00AAFF]" />
          <span className="text-[#00AAFF]">Pro Tier</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AAFF] to-[#0066cc]">Pro Tier</span> Experience
        </h2>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
          Unlock advanced AI tools, exclusive learning resources, and professional insights
        </p>
      </div>

      {/* Pro Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Learning Academy Card */}
        <Card className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 hover:border-[#00AAFF]/30 transition-all duration-300 overflow-hidden group">
          <CardHeader className="pb-2">
            <div className="mb-2 w-12 h-12 rounded-lg bg-[#00AAFF]/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-[#00AAFF]" />
            </div>
            <CardTitle className="text-xl text-white">Learning Academy</CardTitle>
            <CardDescription>
              Advanced AI courses and certifications
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-300">
            <ul className="space-y-1">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                Expert-led workshops and training
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                Industry-recognized certifications
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                Hands-on projects and assessments
              </li>
            </ul>

            {isLoading ? (
              <div className="mt-4 h-8 bg-slate-800 animate-pulse rounded"></div>
            ) : featuredCourses.length > 0 ? (
              <div className="mt-4 space-y-2">
                <p className="font-medium text-white">Featured courses:</p>
                {featuredCourses.slice(0, 2).map(course => (
                  <div key={course.id} className="text-xs text-slate-300 flex items-center">
                    <Brain className="h-3 w-3 mr-1.5 flex-shrink-0 text-[#00AAFF]" />
                    {course.title}
                  </div>
                ))}
              </div>
            ) : null}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-gradient-to-r from-[#00AAFF] to-[#0066cc] hover:from-[#0088cc] hover:to-[#0055bb] group-hover:shadow-[0_0_15px_rgba(0,170,255,0.5)] transition-all"
              onClick={() => navigate('/learning-academy')}
            >
              Explore Academy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Business Insights Card */}
        <Card className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 hover:border-[#00AAFF]/30 transition-all duration-300 overflow-hidden group">
          <CardHeader className="pb-2">
            <div className="mb-2 w-12 h-12 rounded-lg bg-[#00AAFF]/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-[#00AAFF]" />
            </div>
            <CardTitle className="text-xl text-white">Business Insights</CardTitle>
            <CardDescription>
              Data-driven market intelligence
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-300">
            <ul className="space-y-1">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                Exclusive industry reports and analysis
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                AI market trends and forecasts
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                ROI calculators and benchmarking tools
              </li>
            </ul>

            {isLoading ? (
              <div className="mt-4 h-8 bg-slate-800 animate-pulse rounded"></div>
            ) : businessInsights.length > 0 ? (
              <div className="mt-4 space-y-2">
                <p className="font-medium text-white">Latest insights:</p>
                {businessInsights.slice(0, 2).map(insight => (
                  <div key={insight.id} className="text-xs text-slate-300 flex items-center">
                    <FileText className="h-3 w-3 mr-1.5 flex-shrink-0 text-[#00AAFF]" />
                    {insight.title}
                  </div>
                ))}
              </div>
            ) : null}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-gradient-to-r from-[#00AAFF] to-[#0066cc] hover:from-[#0088cc] hover:to-[#0055bb] group-hover:shadow-[0_0_15px_rgba(0,170,255,0.5)] transition-all"
              onClick={() => navigate('/business-insights')}
            >
              View Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* AI Studio Card */}
        <Card className="bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 hover:border-[#00AAFF]/30 transition-all duration-300 overflow-hidden group">
          <CardHeader className="pb-2">
            <div className="mb-2 w-12 h-12 rounded-lg bg-[#00AAFF]/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-[#00AAFF]" />
            </div>
            <CardTitle className="text-xl text-white">AI Studio</CardTitle>
            <CardDescription>
              Advanced model training and deployment
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-300">
            <ul className="space-y-1">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                Custom AI model development
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                Fine-tuning for specialized tasks
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                Enterprise-ready deployment options
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00AAFF] mr-2"></div>
                Performance analytics and monitoring
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-gradient-to-r from-[#00AAFF] to-[#0066cc] hover:from-[#0088cc] hover:to-[#0055bb] group-hover:shadow-[0_0_15px_rgba(0,170,255,0.5)] transition-all"
              onClick={() => navigate('/ai-studio')}
            >
              Open Studio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {!isLoggedIn && (
        <div className="mt-8 p-6 rounded-lg border border-slate-800 bg-slate-900/50 text-center">
          <p className="text-slate-300 mb-4">Sign in to access all your Pro tier features and benefits</p>
          <Button 
            className="bg-gradient-to-r from-[#00AAFF] to-[#0066cc] hover:from-[#0088cc] hover:to-[#0055bb]"
            onClick={() => navigate('/auth')}
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProTierContent;
