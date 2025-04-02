
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, ChevronRight, Lock } from 'lucide-react';
import { useTier } from '@/context/TierContext';
import { LearningPath } from '@/types/learning';

interface LearningPathsProps {
  paths: LearningPath[];
  userProgress?: Record<string, number>;
  isLoading?: boolean;
}

const LearningPaths: React.FC<LearningPathsProps> = ({ 
  paths, 
  userProgress = {},
  isLoading = false 
}) => {
  const navigate = useNavigate();
  const { currentTier, upgradePrompt } = useTier();

  const isPathLocked = (path: LearningPath) => {
    if (path.required_tier === 'freemium') return false;
    if (currentTier === 'pro') return false;
    if (path.required_tier === 'basic' && currentTier === 'basic') return false;
    return true;
  };

  const getPathProgress = (pathId: string) => {
    return userProgress[pathId] || 0;
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">Beginner</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">Intermediate</Badge>;
      case 'advanced':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800">Advanced</Badge>;
      default:
        return <Badge variant="outline">{difficulty}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <div className="h-40 bg-muted rounded-t-lg"></div>
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-muted rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (paths.length === 0) {
    return (
      <div className="text-center py-10">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No learning paths available</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find any learning paths matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {paths.map(path => (
        <Card key={path.id} className="overflow-hidden flex flex-col">
          <div className="relative">
            <div className={`h-40 bg-gradient-to-br ${
              path.required_tier === 'pro' 
                ? 'from-purple-600/90 to-indigo-800' 
                : path.required_tier === 'basic'
                ? 'from-blue-500/90 to-cyan-700' 
                : 'from-amber-500/90 to-orange-700'
            } flex items-center justify-center text-white`}>
              <BookOpen className="h-16 w-16 opacity-50" />
              {path.image_url && (
                <img 
                  src={path.image_url} 
                  alt={path.title} 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                />
              )}
            </div>
            {isPathLocked(path) && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="h-10 w-10 text-white opacity-80" />
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg line-clamp-1">{path.title}</CardTitle>
              {getDifficultyBadge(path.difficulty)}
            </div>
          </CardHeader>
          <CardContent className="pb-2 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {path.description}
            </p>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{Math.round(path.total_duration / 60)} hours total</span>
              <span className="mx-2">•</span>
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{path.courses.length} courses</span>
            </div>
            
            {getPathProgress(path.id) > 0 && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span>Progress</span>
                  <span>{getPathProgress(path.id)}%</span>
                </div>
                <Progress value={getPathProgress(path.id)} />
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-2">
            {isPathLocked(path) ? (
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => upgradePrompt(path.required_tier as any)}
              >
                <Lock className="mr-2 h-4 w-4" /> Upgrade to Unlock
              </Button>
            ) : (
              <Button className="w-full" onClick={() => navigate(`/learning-path/${path.id}`)}>
                {getPathProgress(path.id) > 0 ? 'Continue Learning' : 'Start Learning'} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LearningPaths;
