
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Award, Users, Play, Video, Calendar, 
  MessageSquare, FileText, Brain, ArrowRight, Clock,
  Shield, Zap, Lock
} from 'lucide-react';
import { useTier } from '@/context/TierContext';
import LearningPaths from './LearningPaths';
import Certifications from './Certifications';
import LiveEvents from './LiveEvents';

// Sample data - in a real app, you would fetch this from your API
import { sampleLearningPaths, sampleCertifications, sampleLiveEvents } from './sampleLearningData';

const TierLearningFeatures = () => {
  const { currentTier, upgradePrompt } = useTier();
  const [activeTab, setActiveTab] = React.useState<string>("courses");
  
  const getTierIcon = () => {
    switch (currentTier) {
      case 'pro':
        return <Zap className="h-5 w-5 text-purple-500" />;
      case 'basic':
        return <Shield className="h-5 w-5 text-blue-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-amber-500" />;
    }
  };
  
  const getTierTitle = () => {
    switch (currentTier) {
      case 'pro':
        return "Pro Learning Hub";
      case 'basic':
        return "Basic Learning Hub";
      default:
        return "Learning Hub";
    }
  };
  
  const getTierDescription = () => {
    switch (currentTier) {
      case 'pro':
        return "Access expert-level courses, industry-recognized certifications, and exclusive live events.";
      case 'basic':
        return "Enhance your skills with intermediate courses, structured learning paths, and live webinars.";
      default:
        return "Explore foundational AI courses and community resources to begin your learning journey.";
    }
  };
  
  const getFilteredLearningPaths = () => {
    if (currentTier === 'pro') {
      return sampleLearningPaths;
    } else if (currentTier === 'basic') {
      return sampleLearningPaths.filter(path => path.required_tier !== 'pro');
    } else {
      return sampleLearningPaths.filter(path => path.required_tier === 'freemium');
    }
  };
  
  const getFilteredCertifications = () => {
    if (currentTier === 'pro') {
      return sampleCertifications;
    } else if (currentTier === 'basic') {
      return sampleCertifications.filter(cert => cert.required_tier !== 'pro');
    } else {
      return sampleCertifications.filter(cert => cert.required_tier === 'freemium');
    }
  };
  
  const getFilteredLiveEvents = () => {
    if (currentTier === 'pro') {
      return sampleLiveEvents;
    } else if (currentTier === 'basic') {
      return sampleLiveEvents.filter(event => event.required_tier !== 'pro');
    } else {
      return sampleLiveEvents.filter(event => event.required_tier === 'freemium');
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {getTierIcon()}
            <h2 className="text-2xl font-bold">{getTierTitle()}</h2>
            <Badge variant="outline" className="capitalize">{currentTier} Tier</Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">{getTierDescription()}</p>
        </div>
        
        {currentTier !== 'pro' && (
          <Button 
            onClick={() => upgradePrompt(currentTier === 'basic' ? 'pro' : 'basic')}
            className="hidden md:flex"
          >
            Upgrade for More Content <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="courses" className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" /> Courses
          </TabsTrigger>
          <TabsTrigger value="paths" className="flex items-center gap-1.5">
            <Brain className="h-4 w-4" /> Learning Paths
          </TabsTrigger>
          <TabsTrigger value="certifications" className="flex items-center gap-1.5">
            <Award className="h-4 w-4" /> Certifications
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> Live Events
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentTier === 'freemium' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI 101: Understanding Machine Learning</CardTitle>
                    <CardDescription>Beginner friendly introduction to AI concepts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>30 minutes</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>5 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn the fundamentals of machine learning and AI terminology.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </div>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Getting Started with Data Visualization</CardTitle>
                    <CardDescription>Learn to create meaningful data visualizations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>45 minutes</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>4 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Explore techniques for visualizing data to extract meaningful insights.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </div>
                </Card>
                
                <Card className="opacity-70">
                  <CardHeader>
                    <CardTitle className="text-lg">Building Machine Learning Pipelines</CardTitle>
                    <CardDescription>Intermediate level ML workflows</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>2 hours</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>8 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn to create end-to-end machine learning pipelines for production.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="outline" className="w-full" onClick={() => upgradePrompt('basic')}>
                      <Lock className="mr-2 h-4 w-4" /> Upgrade to Access
                    </Button>
                  </div>
                </Card>
              </>
            )}
            
            {currentTier === 'basic' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Building Machine Learning Pipelines</CardTitle>
                    <CardDescription>Intermediate level ML workflows</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>2 hours</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>8 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn to create end-to-end machine learning pipelines for production.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </div>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI for Business Analytics</CardTitle>
                    <CardDescription>Apply AI to solve business problems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>3 hours</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>10 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Discover how to apply AI solutions to real business analytics challenges.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </div>
                </Card>
                
                <Card className="opacity-70">
                  <CardHeader>
                    <CardTitle className="text-lg">Mastering Neural Networks with TensorFlow</CardTitle>
                    <CardDescription>Advanced deep learning techniques</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>5 hours</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>15 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Deep dive into neural network architectures and TensorFlow implementation.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button variant="outline" className="w-full" onClick={() => upgradePrompt('pro')}>
                      <Lock className="mr-2 h-4 w-4" /> Upgrade to Access
                    </Button>
                  </div>
                </Card>
              </>
            )}
            
            {currentTier === 'pro' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mastering Neural Networks with TensorFlow</CardTitle>
                    <CardDescription>Advanced deep learning techniques</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>5 hours</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>15 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Deep dive into neural network architectures and TensorFlow implementation.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </div>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ethical AI & Bias Mitigation</CardTitle>
                    <CardDescription>Ensuring responsible AI implementation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>4 hours</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>12 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn strategies to identify and mitigate bias in AI systems and models.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </div>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Enterprise AI Integration</CardTitle>
                    <CardDescription>Scaling AI solutions for enterprise</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>6 hours</span>
                      <span className="mx-2">•</span>
                      <FileText className="h-4 w-4 mr-1" />
                      <span>18 lessons</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Strategies for successfully deploying AI solutions at enterprise scale.
                    </p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  </div>
                </Card>
              </>
            )}
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline">View All Courses</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="paths" className="space-y-6">
          <LearningPaths paths={getFilteredLearningPaths()} />
          
          <div className="flex justify-center">
            <Button variant="outline">View All Learning Paths</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="certifications" className="space-y-6">
          <Certifications certifications={getFilteredCertifications()} />
          
          <div className="flex justify-center">
            <Button variant="outline">View All Certifications</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <LiveEvents events={getFilteredLiveEvents()} />
          
          <div className="flex justify-center">
            <Button variant="outline">View All Events</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {currentTier !== 'pro' && (
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30 p-6 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-400 mb-2">
                {currentTier === 'freemium' ? 'Unlock More Learning Content' : 'Access Pro Learning Features'}
              </h3>
              <p className="text-purple-800/80 dark:text-purple-300/80 max-w-2xl">
                {currentTier === 'freemium' 
                  ? 'Upgrade to Basic or Pro to access intermediate courses, learning paths, and certifications.'
                  : 'Upgrade to Pro to access advanced courses, industry-recognized certifications, and exclusive events.'}
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white min-w-[150px]"
              onClick={() => upgradePrompt(currentTier === 'freemium' ? 'basic' : 'pro')}
            >
              Upgrade Now
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TierLearningFeatures;
