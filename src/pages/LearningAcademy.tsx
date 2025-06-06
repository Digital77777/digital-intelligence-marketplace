
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Award, BookOpen, Search, Users, Calendar, 
  Video, ArrowRight, Clock, Play, Star
} from 'lucide-react';

const LearningAcademy = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCourses = [
    {
      id: 1,
      title: "Advanced Machine Learning Techniques",
      instructor: "Dr. Sarah Chen",
      duration: "8 weeks",
      rating: 4.9,
      students: 1234,
      level: "Advanced",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Deep Learning Fundamentals",
      instructor: "Prof. Michael Zhang",
      duration: "6 weeks", 
      rating: 4.8,
      students: 2156,
      level: "Intermediate",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "AI Ethics and Governance",
      instructor: "Dr. Emily Rodriguez",
      duration: "4 weeks",
      rating: 4.7,
      students: 892,
      level: "Beginner",
      image: "/placeholder.svg"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Live Q&A: Building Production ML Systems",
      date: "Dec 15, 2024",
      time: "2:00 PM PST",
      speaker: "Alex Thompson, Senior ML Engineer"
    },
    {
      id: 2,
      title: "Workshop: Fine-tuning Large Language Models",
      date: "Dec 18, 2024", 
      time: "10:00 AM PST",
      speaker: "Dr. Maria Santos, Research Scientist"
    }
  ];

  return (
    <ProTierLayout pageTitle="Learning Academy" requiredFeature="learning-academy">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Learning Academy Pro</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master AI and machine learning with expert-led courses, live workshops, and industry certifications.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses, topics, or instructors..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="paths">Paths</TabsTrigger>
            <TabsTrigger value="certs">Certifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Featured Courses</h2>
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Play className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1">
                        <p>by {course.instructor}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                          <Users className="h-4 w-4 ml-3 mr-1" />
                          {course.students} students
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Enroll Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-muted-foreground">{event.speaker}</p>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date} at {event.time}
                        </div>
                      </div>
                      <Button>
                        <Video className="mr-2 h-4 w-4" />
                        Join Live
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="paths" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Paths</CardTitle>
                <CardDescription>Structured curricula to master specific skills</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Coming soon - personalized learning paths based on your goals.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Industry Certifications
                </CardTitle>
                <CardDescription>Earn recognized credentials in AI and machine learning</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Professional certification programs launching Q1 2025.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProTierLayout>
  );
};

export default LearningAcademy;
