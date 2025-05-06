
import React from 'react';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ExploreContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Trending Topics</CardTitle>
          <CardDescription>Popular topics in our community right now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["AI Ethics", "Generative Art", "LLM Fine-tuning", "Computer Vision", "ChatGPT", "Stable Diffusion", "NLP", "MLOps", "AutoML", "Neural Networks"].map((topic) => (
              <Button key={topic} variant="outline" size="sm" className="rounded-full">
                {topic}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PopularToolsCard />
        <LatestCoursesCard />
      </div>
    </div>
  );
};

const PopularToolsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular AI Tools</CardTitle>
        <CardDescription>Most viewed tools this week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {["AI Image Generator", "Text-to-Speech Converter", "Code Assistant", "Video Enhancer", "Data Visualizer"].map((tool) => (
          <div key={tool} className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
            <span>{tool}</span>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const LatestCoursesCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Courses</CardTitle>
        <CardDescription>Recently added to our learning hub</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {["Advanced Computer Vision", "NLP with Transformers", "AI Ethics & Governance", "Machine Learning Operations", "Data Science Fundamentals"].map((course) => (
          <div key={course} className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-800 last:border-0">
            <span>{course}</span>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExploreContent;
