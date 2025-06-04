
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Clock, 
  Lock,
  BookOpen,
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  Play,
  Users,
  Award,
  Video,
  FileText,
  Download
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useLearningResources } from '@/hooks/useLearningResources';

const LearningHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  const { user } = useUser();
  const { currentTier, upgradePrompt, getTierFeatures } = useTier();
  const location = useLocation();

  const {
    resources,
    isLoading,
    userProgress,
    completedResources,
    markResourceComplete,
    totalCount
  } = useLearningResources({
    categoryFilter,
    difficultyFilter,
    searchQuery
  });

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'pro': 
        return <Zap className="h-4 w-4 text-purple-400" />;
      case 'basic': 
        return <Shield className="h-4 w-4 text-blue-400" />;
      default: 
        return <Sparkles className="h-4 w-4 text-amber-400" />;
    }
  };

  const mockLiveEvents = [
    {
      id: '1',
      title: 'AI Fundamentals Workshop',
      instructor: 'Dr. Sarah Chen',
      date: '2025-06-10',
      time: '14:00 UTC',
      duration: '2 hours',
      tier: 'freemium',
      attendees: 234
    },
    {
      id: '2',
      title: 'Advanced ML Techniques',
      instructor: 'Prof. Michael Rodriguez',
      date: '2025-06-12',
      time: '16:00 UTC',
      duration: '1.5 hours',
      tier: 'basic',
      attendees: 156
    },
    {
      id: '3',
      title: 'Deep Learning Masterclass',
      instructor: 'Dr. Emily Watson',
      date: '2025-06-15',
      time: '18:00 UTC',
      duration: '3 hours',
      tier: 'pro',
      attendees: 89
    }
  ];

  const mockCertifications = [
    {
      id: '1',
      title: 'AI Fundamentals Certificate',
      description: 'Basic understanding of AI concepts and applications',
      requirements: ['Complete 5 foundational courses', 'Pass final assessment'],
      tier: 'freemium',
      estimatedTime: '40 hours'
    },
    {
      id: '2',
      title: 'Machine Learning Specialist',
      description: 'Advanced ML techniques and practical implementation',
      requirements: ['Complete ML learning path', 'Build 3 projects', 'Peer review'],
      tier: 'basic',
      estimatedTime: '80 hours'
    },
    {
      id: '3',
      title: 'AI Expert Certification',
      description: 'Industry-recognized expert-level certification',
      requirements: ['Complete all paths', '5 projects', 'Capstone project', 'Mentor review'],
      tier: 'pro',
      estimatedTime: '150 hours'
    }
  ];

  const isContentLocked = (tier: string) => {
    if (tier === 'freemium') return false;
    if (currentTier === 'pro') return false;
    if (tier === 'basic' && currentTier === 'basic') return false;
    return true;
  };

  const handleJoinEvent = (eventId: string, tier: string) => {
    if (isContentLocked(tier)) {
      upgradePrompt(tier === 'basic' ? 'basic' : 'pro');
      return;
    }
    
    toast.success("You've been registered for the event!");
  };

  const handleStartCertification = (certId: string, tier: string) => {
    if (isContentLocked(tier)) {
      upgradePrompt(tier === 'basic' ? 'basic' : 'pro');
      return;
    }
    
    toast.success("Certification path started!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12 bg-gradient-to-b from-indigo-50/30 to-white dark:from-indigo-950/10 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
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
                <p className="text-indigo-100 text-lg mb-6">
                  {currentTier === 'pro' 
                    ? 'Access expert-level training, industry certifications, and exclusive events.' 
                    : currentTier === 'basic'
                    ? 'Enhance your skills with intermediate courses, learning paths, and live webinars.'
                    : 'Explore foundational AI courses and community resources to begin your learning journey.'}
                </p>
                <div className="flex gap-4">
                  <Button className="bg-white text-purple-900 hover:bg-indigo-50">
                    Start Learning
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Browse Catalog
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses, events, certifications..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Category <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setCategoryFilter('')}>All Categories</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('AI Fundamentals')}>AI Fundamentals</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Machine Learning')}>Machine Learning</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Deep Learning')}>Deep Learning</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('Computer Vision')}>Computer Vision</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter('NLP')}>Natural Language Processing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Difficulty <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setDifficultyFilter('')}>All Levels</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDifficultyFilter('beginner')}>Beginner</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDifficultyFilter('intermediate')}>Intermediate</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDifficultyFilter('advanced')}>Advanced</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Main content tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Live Events
              </TabsTrigger>
              <TabsTrigger value="certifications" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                Certifications
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resources
              </TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Available Courses</h2>
                <p className="text-muted-foreground">Choose from {totalCount} courses across various AI topics</p>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-40 bg-muted animate-pulse" />
                      <CardContent className="pt-4">
                        <div className="h-5 bg-muted animate-pulse mb-2 w-3/4" />
                        <div className="h-4 bg-muted animate-pulse mb-1 w-full" />
                        <div className="h-4 bg-muted animate-pulse w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 bg-gradient-to-br from-indigo-500 to-purple-600">
                        <div className="flex items-center justify-center h-full w-full">
                          <BookOpen className="h-12 w-12 text-white opacity-70" />
                        </div>
                        {isContentLocked(course.requiredTier) && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Lock className="h-6 w-6 text-white opacity-70" />
                          </div>
                        )}
                        {completedResources.has(course.id) && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{course.category}</Badge>
                          <Badge variant="outline">{course.difficulty}</Badge>
                        </div>
                        <h3 className="font-semibold line-clamp-1 mb-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.duration} min
                          </div>
                          {course.requiredTier !== 'freemium' && (
                            <Badge variant="outline" className="text-xs">
                              {course.requiredTier}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        {isContentLocked(course.requiredTier) ? (
                          <Button 
                            className="w-full" 
                            onClick={() => upgradePrompt(course.requiredTier === 'basic' ? 'basic' : 'pro')}
                          >
                            <Lock className="mr-2 h-4 w-4" />
                            Upgrade to Access
                          </Button>
                        ) : (
                          <div className="flex gap-2 w-full">
                            <Button className="flex-1" asChild>
                              <Link to={`/courses/${course.id}`}>
                                <Play className="mr-2 h-4 w-4" />
                                Start Course
                              </Link>
                            </Button>
                            {user && !completedResources.has(course.id) && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => markResourceComplete(course.id)}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Live Events Tab */}
            <TabsContent value="events" className="mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Upcoming Live Events</h2>
                <p className="text-muted-foreground">Join live workshops, webinars, and masterclasses</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockLiveEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="relative h-32 bg-gradient-to-r from-green-500 to-blue-600">
                      <div className="flex items-center justify-center h-full">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                      {isContentLocked(event.tier) && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Live Event</Badge>
                        {event.tier !== 'freemium' && (
                          <Badge variant="outline">{event.tier}</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">by {event.instructor}</p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>📅 {event.date} at {event.time}</div>
                        <div>⏱️ Duration: {event.duration}</div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {event.attendees} registered
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleJoinEvent(event.id, event.tier)}
                        disabled={isContentLocked(event.tier)}
                      >
                        {isContentLocked(event.tier) ? (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Upgrade Required
                          </>
                        ) : (
                          <>
                            <Video className="mr-2 h-4 w-4" />
                            Register Now
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Available Certifications</h2>
                <p className="text-muted-foreground">Earn industry-recognized certificates</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCertifications.map((cert) => (
                  <Card key={cert.id} className="overflow-hidden">
                    <div className="relative h-32 bg-gradient-to-r from-yellow-500 to-orange-600">
                      <div className="flex items-center justify-center h-full">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      {isContentLocked(cert.tier) && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Certification</Badge>
                        {cert.tier !== 'freemium' && (
                          <Badge variant="outline">{cert.tier}</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <strong>Requirements:</strong>
                          <ul className="list-disc list-inside text-muted-foreground mt-1">
                            {cert.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ⏱️ Estimated time: {cert.estimatedTime}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartCertification(cert.id, cert.tier)}
                        disabled={isContentLocked(cert.tier)}
                      >
                        {isContentLocked(cert.tier) ? (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Upgrade Required
                          </>
                        ) : (
                          <>
                            <Award className="mr-2 h-4 w-4" />
                            Start Certification
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Learning Resources</h2>
                <p className="text-muted-foreground">Additional materials and tools to support your learning</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Study Guides</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive guides for each topic</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Video className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Video Library</h3>
                    <p className="text-sm text-muted-foreground">Extensive collection of tutorial videos</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Watch
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Study Groups</h3>
                    <p className="text-sm text-muted-foreground">Connect with fellow learners</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Join
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <BookOpen className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Practice Labs</h3>
                    <p className="text-sm text-muted-foreground">Hands-on coding exercises</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Start Lab
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Tier upgrade banner */}
          {currentTier !== 'pro' && (
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30 p-6 mt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-400 mb-2">
                    {currentTier === 'freemium' ? 
                      'Upgrade to Unlock Advanced Learning Features' : 
                      'Upgrade to Pro for Premium Learning Experience'}
                  </h3>
                  <p className="text-purple-800/80 dark:text-purple-300/80 max-w-2xl">
                    {currentTier === 'freemium' ?
                      'Get access to intermediate courses, live events, and professional certifications.' :
                      'Unlock industry-recognized credentials, exclusive events, and 1:1 mentorship.'}
                  </p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white min-w-[150px]"
                  onClick={() => upgradePrompt(currentTier === 'basic' ? 'pro' : 'basic')}
                >
                  Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default LearningHub;
