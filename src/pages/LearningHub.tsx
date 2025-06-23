import React, { useState } from 'react';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileStickyFooter from '@/components/MobileStickyFooter';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, BookOpen, Sparkles, Shield, Zap, ArrowRight, Award, Video } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { useLearningResources } from '@/hooks/useLearningResources';
import YouTubeCourses from '@/components/learning/YouTubeCourses';
import LearningHubAIAssistant from "@/components/learning/LearningHubAIAssistant";
import LearningHubHero from "@/components/learning/learning-hub/LearningHubHero";
import LearningHubFilters from "@/components/learning/learning-hub/LearningHubFilters";
import CourseCard from '@/components/learning/CourseCard';
import CourseDetails from '@/components/learning/CourseDetails';
import { Route, Routes, useParams } from 'react-router-dom';

interface CoursesTabProps {
  searchQuery: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  setDifficultyFilter: React.Dispatch<React.SetStateAction<string>>;
  setShowAIAssistant: React.Dispatch<React.SetStateAction<boolean>>;
}

const CoursesTab: React.FC<CoursesTabProps> = ({
  searchQuery,
  setCategoryFilter,
  setDifficultyFilter,
  setShowAIAssistant,
}) => {
  const { currentTier } = useTier();
  const {
    courses,
    isLoading,
    userProgress,
    completedCourses,
    markCourseComplete,
    totalCount
  } = useLearningResources({
    categoryFilter: '',
    difficultyFilter: '',
    searchQuery
  });

  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold mb-2">Available Courses</h2>
          <p className="text-muted-foreground">Choose from {totalCount} courses across various AI topics</p>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-700"
          onClick={() => setShowAIAssistant(true)}
        >
          <Sparkles className="h-5 w-5 text-amber-500" /> Ask the AI
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && [...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-40 bg-muted animate-pulse" />
            <CardContent className="pt-4">
              <div className="h-5 bg-muted animate-pulse mb-2 w-3/4" />
              <div className="h-4 bg-muted animate-pulse mb-1 w-full" />
              <div className="h-4 bg-muted animate-pulse w-2/3" />
            </CardContent>
          </Card>
        ))}
        {courses.map((course) => (
          <CourseCard 
            key={course.id}
            course={course}
            progress={userProgress[course.id] || 0}
            isCompleted={completedCourses.has(course.id)}
            onMarkComplete={() => markCourseComplete(course.id)}
          />
        ))}
      </div>
    </>
  );
};

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses } = useLearningResources();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <CourseDetails course={course} />
  );
};

const LearningHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { user } = useUser();
  const { currentTier, upgradePrompt } = useTier();
  
  const {
    liveEvents,
    certifications,
    learningPaths,
    isLoading,
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

  const isContentLocked = (requiredTier: string) => {
    const tierOrder: { [key: string]: number } = {
      freemium: 0,
      basic: 1,
      pro: 2
    };
    const requiredLevel = tierOrder[requiredTier] ?? 0;
    const userLevel = tierOrder[currentTier] ?? 0;
    return userLevel < requiredLevel;
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
          <Routes>
            <Route path="/" element={
              <>
                <LearningHubHero currentTier={currentTier} getTierIcon={getTierIcon} />
                <LearningHubFilters
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setCategoryFilter={setCategoryFilter}
                  setDifficultyFilter={setDifficultyFilter}
                />
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="courses" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Courses
                    </TabsTrigger>
                    <TabsTrigger value="paths" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Learning Paths
                    </TabsTrigger>
                    <TabsTrigger value="events" className="flex items-center gap-2">
                      <Video className="h-4 w-4" /> Live Events
                    </TabsTrigger>
                    <TabsTrigger value="certifications" className="flex items-center gap-2">
                      <Award className="h-4 w-4" /> Certifications
                    </TabsTrigger>
                    <TabsTrigger value="youtube" className="flex items-center gap-2">
                      <Video className="h-4 w-4" /> YouTube
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="courses" className="mt-6">
                    <CoursesTab
                      searchQuery={searchQuery}
                      setCategoryFilter={setCategoryFilter}
                      setDifficultyFilter={setDifficultyFilter}
                      setShowAIAssistant={setShowAIAssistant}
                    />
                  </TabsContent>
                  
                  <TabsContent value="paths" className="mt-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Curated Learning Paths</h2>
                      <p className="text-muted-foreground">
                        Each path combines high-impact courses leading to a practical outcome and credential.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {isLoading && <p>Loading paths...</p>}
                      {learningPaths.length === 0 && !isLoading && (
                        <div className="text-center text-muted-foreground col-span-full py-8">
                          No learning paths found for your tier.
                        </div>
                      )}
                      {learningPaths.map(path => (
                        <Card key={path.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                          <CardHeader>
                            <h3 className="font-semibold text-lg">{path.title}</h3>
                            <p className="text-sm text-muted-foreground">{path.description}</p>
                          </CardHeader>
                          <CardContent>
                            <ul className="mb-4 list-disc list-inside pl-1 space-y-1">
                              {path.courses.map(course => (
                                <li key={course.id}>
                                  <span className="font-medium">{course.title}</span>
                                </li>
                              ))}
                            </ul>
                             <div className="text-sm text-muted-foreground">
                              Total Duration: {path.total_duration} min
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" disabled>View Path</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="events" className="mt-6">
                     <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Upcoming Live Events</h2>
                      <p className="text-muted-foreground">Join live workshops, webinars, and masterclasses</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {isLoading && <p>Loading events...</p>}
                      {liveEvents.map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className="relative h-32 bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                            <Video className="h-8 w-8 text-white" />
                            {isContentLocked(event.required_tier) && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Lock className="h-5 w-5 text-white" />
                              </div>
                            )}
                          </div>
                          <CardContent className="pt-4">
                            <h3 className="font-semibold mb-2">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">by {event.host_name}</p>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full" 
                              onClick={() => handleJoinEvent(event.id, event.required_tier)}
                              disabled={isContentLocked(event.required_tier)}
                            >
                               {isContentLocked(event.required_tier) ? 'Upgrade Required' : 'Register Now'}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="certifications" className="mt-6">
                     <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Available Certifications</h2>
                      <p className="text-muted-foreground">Earn industry-recognized certificates</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {isLoading && <p>Loading certifications...</p>}
                      {certifications.map((cert) => (
                        <Card key={cert.id} className="overflow-hidden">
                           <div className="relative h-32 bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center">
                             <Award className="h-8 w-8 text-white" />
                              {isContentLocked(cert.required_tier) && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <Lock className="h-5 w-5 text-white" />
                                </div>
                              )}
                          </div>
                          <CardContent className="pt-4">
                             <h3 className="font-semibold mb-2">{cert.title}</h3>
                             <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full" 
                              onClick={() => handleStartCertification(cert.id, cert.required_tier)}
                              disabled={isContentLocked(cert.required_tier)}
                            >
                               {isContentLocked(cert.required_tier) ? 'Upgrade Required' : 'Start Certification'}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="youtube" className="mt-6">
                    <YouTubeCourses 
                      searchQuery={searchQuery}
                      category={categoryFilter}
                      difficulty={difficultyFilter}
                    />
                  </TabsContent>
                </Tabs>

                {/* Tier upgrade banner */}
                {currentTier !== 'pro' && <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30 p-6 mt-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-400 mb-2">
                        {currentTier === 'freemium' 
                          ? 'Upgrade to Unlock Advanced Learning Features' 
                          : 'Upgrade to Pro for Premium Learning Experience'}
                      </h3>
                      <p className="text-purple-800/80 dark:text-purple-300/80 max-w-2xl">
                        {currentTier === 'freemium' 
                          ? 'Get access to intermediate courses, live events, and professional certifications.' 
                          : 'Unlock industry-recognized credentials, exclusive events, and 1:1 mentorship.'}
                      </p>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white min-w-[150px]" 
                      onClick={() => upgradePrompt(currentTier === 'basic' ? 'pro' : 'basic')}
                    >
                      Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>}
              </>
            }/>
            <Route path="/course/:courseId" element={<CourseDetailsPage />} />
          </Routes>
        </div>
      </main>
      {showAIAssistant && <LearningHubAIAssistant open={showAIAssistant} onOpenChange={setShowAIAssistant} />}
      <Footer />
      <MobileStickyFooter />
    </div>
  );
};

export default LearningHub;
            