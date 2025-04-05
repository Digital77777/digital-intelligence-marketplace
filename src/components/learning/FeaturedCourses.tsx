
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Clock, Users, BarChart, ChevronRight } from 'lucide-react';
import { useTier } from '@/context/TierContext';

// Sample featured courses data
const sampleCourses = [
  {
    id: '1',
    title: 'Getting Started with AI Tools',
    description: 'Learn the basics of working with AI tools and applications',
    instructor: 'Dr. Alex Morgan',
    level: 'Beginner',
    duration: '2 hours',
    rating: 4.8,
    students: 1240,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    tier: 'freemium'
  },
  {
    id: '2',
    title: 'Advanced Machine Learning Techniques',
    description: 'Dive deep into the latest machine learning algorithms and applications',
    instructor: 'Prof. Sarah Chen',
    level: 'Advanced',
    duration: '8 hours',
    rating: 4.9,
    students: 850,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    tier: 'basic'
  },
  {
    id: '3',
    title: 'AI in Business Strategy',
    description: 'Strategically implement AI solutions in your business operations',
    instructor: 'Michael Jordan',
    level: 'Intermediate',
    duration: '5 hours',
    rating: 4.7,
    students: 1120,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    tier: 'basic'
  },
  {
    id: '4',
    title: 'Enterprise AI Implementation',
    description: 'Learn how to implement and manage AI systems at enterprise scale',
    instructor: 'Dr. Emily Rodriguez',
    level: 'Expert',
    duration: '10 hours',
    rating: 4.9,
    students: 520,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1558402529-d2638a7023e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    tier: 'pro'
  }
];

const FeaturedCourses: React.FC = () => {
  const navigate = useNavigate();
  const { currentTier } = useTier();
  
  // Filter courses based on user's tier
  const availableCourses = sampleCourses.filter(course => {
    switch (course.tier) {
      case 'freemium':
        return true; // Available to all
      case 'basic':
        return currentTier === 'basic' || currentTier === 'pro';
      case 'pro':
        return currentTier === 'pro';
      default:
        return false;
    }
  });
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/learning/${courseId}`);
  };
  
  const viewAllCourses = () => {
    navigate('/learning-hub');
  };
  
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };
  
  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
            <p className="text-muted-foreground">
              Enhance your AI skills with our curated learning content
            </p>
          </div>
          
          <Button 
            onClick={viewAllCourses}
            variant="ghost" 
            className="hidden sm:flex items-center gap-1"
          >
            Browse Learning Hub <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableCourses.map(course => (
            <Card 
              key={course.id} 
              className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
              onClick={() => handleCourseClick(course.id)}
            >
              <div className="h-44 overflow-hidden relative">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <Badge className={getLevelBadgeColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <BookOpen className="h-4 w-4" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                {course.progress > 0 ? (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1" />
                  </div>
                ) : null}
              </CardContent>
              
              <CardFooter className="px-5 py-4 border-t bg-muted/50">
                <Button className="w-full" variant="secondary" size="sm">
                  {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Button onClick={viewAllCourses} variant="outline">
            Browse Learning Hub <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
