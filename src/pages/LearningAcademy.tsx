
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Award, BookOpen, Search, Users, Calendar, 
  BookMarked, ChevronRight, Video, 
  ArrowRight, Clock, FileText, PenTool
} from 'lucide-react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import LearningPaths from '@/components/learning/LearningPaths';
import Certifications from '@/components/learning/Certifications';
import LiveEvents from '@/components/learning/LiveEvents';
import { sampleLearningPaths, sampleCertifications, sampleLiveEvents } from '@/components/learning/sampleLearningData';

const LearningAcademy = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter paths based on search query
  const filteredPaths = searchQuery 
    ? sampleLearningPaths.filter(path => 
        path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleLearningPaths;
  
  // Filter certifications based on search query
  const filteredCertifications = searchQuery
    ? sampleCertifications.filter(cert => 
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleCertifications;
  
  // Filter events based on search query
  const filteredEvents = searchQuery
    ? sampleLiveEvents.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleLiveEvents;
  
  return (
    <ProTierLayout pageTitle="Learning Academy" requiredFeature="learning-academy">
      <div className="space-y-10">
        {/* Featured Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-800"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <img 
                  src="/images/academy-hero.jpg" 
                  alt="Learning Academy" 
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <Badge variant="outline" className="w-fit mb-2 bg-white/10 border-white/20 backdrop-blur-sm">
                    Pro Exclusive
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">Learning Academy Pro</h2>
                  <p className="mb-4 text-white/90 max-w-lg">
                    Access advanced courses, expert-led workshops, and industry-recognized certifications.
                  </p>
                  <div className="flex space-x-2">
                    <Button className="bg-white text-purple-900 hover:bg-white/90">
                      Explore Courses
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      Your Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-100 dark:border-amber-900/30 flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-amber-800 dark:text-amber-400">
                    <Award className="h-5 w-5 mr-2" /> Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-amber-800/80 dark:text-amber-300/80">
                  <p className="text-sm mb-2">Earn industry-recognized credentials to showcase your expertise.</p>
                  <p className="text-sm font-medium">3 Pro level certifications available</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-amber-900/20">
                    View Certifications <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-100 dark:border-blue-900/30 flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-blue-800 dark:text-blue-400">
                    <Video className="h-5 w-5 mr-2" /> Masterclasses
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-800/80 dark:text-blue-300/80">
                  <p className="text-sm mb-2">Join live sessions with industry experts and AI thought leaders.</p>
                  <p className="text-sm font-medium">2 upcoming masterclasses this month</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full border-blue-200 dark:border-blue-900/50 text-blue-800 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-900/20">
                    View Schedule <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Search and Tabs Navigation */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search learning resources..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1">
                <PenTool className="h-4 w-4" /> Your Progress
              </Button>
              <Button variant="outline" className="flex items-center gap-1">
                <BookMarked className="h-4 w-4" /> Bookmarks
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="featured" className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> Featured
              </TabsTrigger>
              <TabsTrigger value="paths" className="flex items-center gap-1.5">
                <ArrowRight className="h-4 w-4" /> Learning Paths
              </TabsTrigger>
              <TabsTrigger value="certifications" className="flex items-center gap-1.5">
                <Award className="h-4 w-4" /> Certifications
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> Live Events
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="featured">
              <div className="space-y-8">
                {/* Featured Learning Paths */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Featured Learning Paths</h3>
                    <Button variant="ghost" asChild>
                      <Link to="/learning-paths">View All <ChevronRight className="ml-1 h-4 w-4" /></Link>
                    </Button>
                  </div>
                  <LearningPaths 
                    paths={filteredPaths.filter(path => path.id === '4' || path.id === '5')}
                  />
                </div>
                
                {/* Featured Certifications */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Professional Certifications</h3>
                    <Button variant="ghost" asChild>
                      <Link to="/certifications">View All <ChevronRight className="ml-1 h-4 w-4" /></Link>
                    </Button>
                  </div>
                  <Certifications 
                    certifications={filteredCertifications.filter(cert => cert.is_industry_recognized)}
                  />
                </div>
                
                {/* Upcoming Events */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Upcoming Events</h3>
                    <Button variant="ghost" asChild>
                      <Link to="/events">View Calendar <ChevronRight className="ml-1 h-4 w-4" /></Link>
                    </Button>
                  </div>
                  <LiveEvents 
                    events={filteredEvents.filter(
                      event => new Date(event.datetime) > new Date()
                    ).slice(0, 3)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="paths">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">All Learning Paths</h3>
                <LearningPaths paths={filteredPaths} />
              </div>
            </TabsContent>
            
            <TabsContent value="certifications">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">All Certifications</h3>
                <Certifications certifications={filteredCertifications} />
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">All Events</h3>
                <LiveEvents events={filteredEvents} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Pro Member Benefits */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <Badge variant="outline" className="mb-2 bg-white/10 border-white/20 text-white">
                  Pro Member Benefits
                </Badge>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Exclusive Learning Academy Features
                </h3>
                <p className="text-gray-300 max-w-2xl mb-6">
                  As a Pro tier member, you have access to the complete Learning Academy experience.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white">
                  <div className="flex items-start gap-2">
                    <Video className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Live Masterclasses</h4>
                      <p className="text-sm text-gray-400">Interactive sessions with experts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">1:1 Mentorship</h4>
                      <p className="text-sm text-gray-400">Personalized guidance from AI experts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Industry Certifications</h4>
                      <p className="text-sm text-gray-400">Credentials recognized by employers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Research Library</h4>
                      <p className="text-sm text-gray-400">Access to whitepapers and journals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Priority Support</h4>
                      <p className="text-sm text-gray-400">Fast-tracked responses to queries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Advanced Content</h4>
                      <p className="text-sm text-gray-400">200+ expert-level courses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProTierLayout>
  );
};

export default LearningAcademy;
