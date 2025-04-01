
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Play,
  Award,  // Replaced Certificate with Award
  Clock,
  User,
  Star,
  ChevronRight,
  Filter,
  Search,
  Calendar,
  GraduationCap,
  Zap,
  Code,
  Database,
  LineChart,
  ShieldCheck,
  FileText
} from 'lucide-react';

// Sample course data
const advancedCourses = [
  {
    id: 1,
    title: "Advanced Neural Network Architectures",
    description: "Master the design and implementation of complex neural network architectures for enterprise applications.",
    level: "Advanced",
    duration: "8 weeks",
    instructor: "Dr. Maya Patel",
    rating: 4.9,
    students: 1245,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    categories: ["AI Development", "Deep Learning"],
    progress: 0,
    certification: true,
    premium: true
  },
  {
    id: 2,
    title: "Enterprise MLOps & Model Governance",
    description: "Learn best practices for MLOps in enterprise environments, including model governance and compliance.",
    level: "Expert",
    duration: "6 weeks",
    instructor: "James Wilson",
    rating: 4.8,
    students: 987,
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3",
    categories: ["MLOps", "Data Science"],
    progress: 35,
    certification: true,
    premium: true
  },
  {
    id: 3,
    title: "AI Ethics & Responsible Development",
    description: "Explore the ethical implications of AI and learn how to build responsible, unbiased AI systems.",
    level: "Intermediate",
    duration: "4 weeks",
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    students: 1568,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    categories: ["AI Ethics", "Responsible AI"],
    progress: 78,
    certification: true,
    premium: false
  },
  {
    id: 4,
    title: "Reinforcement Learning for Production",
    description: "Implement reinforcement learning algorithms in production environments with scalability in mind.",
    level: "Advanced",
    duration: "10 weeks",
    instructor: "Dr. Alex Morgan",
    rating: 4.7,
    students: 842,
    image: "https://images.unsplash.com/photo-1533344807481-a98b435911b8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
    categories: ["Reinforcement Learning", "Production AI"],
    progress: 15,
    certification: true,
    premium: true
  },
  {
    id: 5,
    title: "Big Data Analytics with AI",
    description: "Process and analyze massive datasets using state-of-the-art AI and big data technologies.",
    level: "Intermediate",
    duration: "6 weeks",
    instructor: "David Kumar",
    rating: 4.6,
    students: 1124,
    image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    categories: ["Big Data", "Analytics"],
    progress: 0,
    certification: true,
    premium: false
  },
  {
    id: 6,
    title: "Natural Language Processing Masterclass",
    description: "Develop advanced NLP models for enterprise applications like sentiment analysis and text generation.",
    level: "Expert",
    duration: "8 weeks",
    instructor: "Prof. Eliza Johnson",
    rating: 4.9,
    students: 975,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3",
    categories: ["NLP", "Language Models"],
    progress: 0,
    certification: true,
    premium: true
  }
];

// Sample workshop data
const upcomingWorkshops = [
  {
    id: 1,
    title: "GPT-4 Architecture Deep Dive",
    date: "June 15, 2023",
    time: "10:00 AM - 2:00 PM EST",
    instructor: "Dr. Alan Turing",
    description: "An exclusive workshop exploring the architecture and capabilities of GPT-4 and similar large language models."
  },
  {
    id: 2,
    title: "Building Robust Computer Vision Systems",
    date: "June 22, 2023",
    time: "9:00 AM - 1:00 PM PST",
    instructor: "Maria Rodriguez",
    description: "Learn to build computer vision systems that perform reliably across different environments and conditions."
  },
  {
    id: 3,
    title: "AI Security & Threat Mitigation",
    date: "July 8, 2023",
    time: "11:00 AM - 3:00 PM EST",
    instructor: "Kevin Chen",
    description: "Discover how to identify and mitigate security threats in AI systems and protect your models from attacks."
  }
];

// Sample certification paths
const certificationPaths = [
  {
    id: 1,
    title: "Enterprise AI Architect",
    description: "Become certified in designing and implementing enterprise-scale AI solutions",
    courses: 5,
    duration: "6 months",
    level: "Expert",
    icon: <GraduationCap className="h-8 w-8 text-[#00AAFF]" />
  },
  {
    id: 2,
    title: "AI Development Specialist",
    description: "Master the technical skills needed for advanced AI model development",
    courses: 4,
    duration: "4 months",
    level: "Advanced",
    icon: <Code className="h-8 w-8 text-purple-500" />
  },
  {
    id: 3,
    title: "MLOps Professional",
    description: "Learn to deploy, monitor, and maintain AI models in production",
    courses: 3,
    duration: "3 months",
    level: "Intermediate",
    icon: <Database className="h-8 w-8 text-emerald-500" />
  },
  {
    id: 4,
    title: "AI Business Analyst",
    description: "Develop skills to translate business problems into AI solutions",
    courses: 4,
    duration: "4 months",
    level: "Intermediate",
    icon: <LineChart className="h-8 w-8 text-amber-500" />
  }
];

const LearningAcademy = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ProTierLayout pageTitle="Learning Academy" requiredFeature="learning-academy">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 to-[#003366] p-8 mb-8">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.6))]"></div>
          <div className="relative z-10 max-w-3xl">
            <Badge className="mb-4 bg-[#00AAFF]/20 text-[#00AAFF] border-[#00AAFF]/30 py-1 px-3">
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              Pro Exclusive
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Advanced AI Learning & Certification</h1>
            <p className="text-lg text-indigo-200 mb-6">
              Access exclusive advanced courses, expert-led workshops, and industry-recognized certifications designed for AI professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#00AAFF] hover:bg-[#0088ff] text-white">
                <GraduationCap className="mr-2 h-4 w-4" />
                View Certification Paths
              </Button>
              <Button variant="outline" className="border-indigo-400 text-indigo-100 hover:bg-indigo-900/50">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming Workshops
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search courses and workshops..."
              className="w-full bg-indigo-950/30 border-indigo-800 pl-10 text-indigo-100 placeholder:text-indigo-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 bg-indigo-950/30 border-indigo-800 text-indigo-100">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="bg-indigo-950/30 border border-indigo-900 w-full sm:w-auto">
            <TabsTrigger value="courses" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-indigo-100 text-indigo-300">
              Advanced Courses
            </TabsTrigger>
            <TabsTrigger value="workshops" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-indigo-100 text-indigo-300">
              Expert Workshops
            </TabsTrigger>
            <TabsTrigger value="certifications" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-indigo-100 text-indigo-300">
              Certification Paths
            </TabsTrigger>
            <TabsTrigger value="mylearning" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-indigo-100 text-indigo-300">
              My Learning
            </TabsTrigger>
          </TabsList>

          {/* Advanced Courses Tab */}
          <TabsContent value="courses" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden bg-indigo-950/20 border-indigo-900/50 hover:border-[#00AAFF]/30 transition-all duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    {course.premium && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[#00AAFF] to-purple-600 border-none text-white">
                        <Zap className="h-3 w-3 mr-1" /> Premium
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-xl">{course.title}</CardTitle>
                        <CardDescription className="text-indigo-300 mt-1">
                          {course.instructor} • {course.level}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-indigo-900/30 text-indigo-300 border-indigo-800/50">
                        {course.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-indigo-200 text-sm line-clamp-2 mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center text-amber-400">
                        <Star className="h-4 w-4 fill-amber-400 mr-1" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center text-indigo-300">
                        <User className="h-4 w-4 mr-1" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                    </div>
                    {course.progress > 0 && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-indigo-300">Progress</span>
                          <span className="text-indigo-300">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5 bg-indigo-900/50" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full bg-gradient-to-r from-[#00AAFF] to-[#0066cc] hover:from-[#0088ff] hover:to-[#0055aa] text-white">
                      {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Expert Workshops Tab */}
          <TabsContent value="workshops" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingWorkshops.map((workshop) => (
                <Card key={workshop.id} className="bg-indigo-950/20 border-indigo-900/50 hover:border-[#00AAFF]/30 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{workshop.title}</CardTitle>
                    <CardDescription className="text-indigo-300">
                      <div className="flex items-center gap-1 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{workshop.date} • {workshop.time}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-indigo-200 mb-4">{workshop.description}</p>
                    <div className="flex items-center text-indigo-300 text-sm">
                      <User className="h-4 w-4 mr-2" />
                      <span>Instructor: {workshop.instructor}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="border-indigo-800 text-indigo-200 hover:bg-indigo-900/50">
                      Learn More
                    </Button>
                    <Button className="bg-[#00AAFF] hover:bg-[#0088ff] text-white">
                      Register Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certification Paths Tab */}
          <TabsContent value="certifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificationPaths.map((path) => (
                <Card key={path.id} className="bg-indigo-950/20 border-indigo-900/50 hover:border-[#00AAFF]/30 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-lg bg-indigo-900/50 flex items-center justify-center">
                        {path.icon}
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{path.title}</CardTitle>
                        <Badge variant="outline" className="mt-1 bg-indigo-900/30 text-indigo-300 border-indigo-800/50">
                          {path.level}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-indigo-200 mb-4">{path.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-indigo-300">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>{path.courses} Courses</span>
                      </div>
                      <div className="flex items-center text-indigo-300">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{path.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-[#00AAFF] to-[#0066cc] hover:from-[#0088ff] hover:to-[#0055aa] text-white">
                      Explore Certification
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Learning Tab */}
          <TabsContent value="mylearning" className="mt-6">
            <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-8 text-center">
              <div className="flex flex-col items-center max-w-md mx-auto">
                <BookOpen className="h-16 w-16 text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Start Your Learning Journey</h3>
                <p className="text-indigo-300 mb-6">
                  Enroll in courses and workshops to track your progress and earn certifications.
                </p>
                <Button className="bg-[#00AAFF] hover:bg-[#0088ff] text-white">
                  Browse Courses
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Resources */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-indigo-900/80 to-[#00265e]/80 border-indigo-800/50 text-white">
              <CardHeader className="pb-2">
                <Code className="h-8 w-8 text-[#00AAFF] mb-2" />
                <CardTitle>Advanced Model Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-200 text-sm">
                  Learn techniques for training high-performance AI models with limited data.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-indigo-700 text-indigo-100 hover:bg-indigo-800/30">
                  Download Guide
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-indigo-900/80 to-[#00265e]/80 border-indigo-800/50 text-white">
              <CardHeader className="pb-2">
                <ShieldCheck className="h-8 w-8 text-emerald-400 mb-2" />
                <CardTitle>AI Security Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-200 text-sm">
                  Essential checklist for ensuring your AI applications are secure and protected.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-indigo-700 text-indigo-100 hover:bg-indigo-800/30">
                  Download Checklist
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-indigo-900/80 to-[#00265e]/80 border-indigo-800/50 text-white">
              <CardHeader className="pb-2">
                <FileText className="h-8 w-8 text-amber-400 mb-2" />
                <CardTitle>Enterprise AI Whitepaper</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-200 text-sm">
                  Research insights on implementing AI at enterprise scale with case studies.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-indigo-700 text-indigo-100 hover:bg-indigo-800/30">
                  Download Whitepaper
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </ProTierLayout>
  );
};

export default LearningAcademy;
