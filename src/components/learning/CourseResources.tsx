
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Video,
  Book,
  Code,
  Link
} from 'lucide-react';

interface CourseResourcesProps {
  courseCategory: string;
  courseDifficulty: string;
}

const CourseResources: React.FC<CourseResourcesProps> = ({
  courseCategory,
  courseDifficulty
}) => {
  // In a real app, these would be fetched from the database
  // Here we're simulating resources based on category and difficulty
  const resources = [
    {
      title: "Complete Course Slides",
      type: "slides",
      format: "PDF",
      size: "2.4 MB",
      icon: <FileText className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Supplementary Reading Material",
      type: "document",
      format: "PDF",
      size: "1.8 MB",
      icon: <Book className="h-8 w-8 text-purple-500" />
    },
    {
      title: "Practice Exercises",
      type: "exercises",
      format: "ZIP",
      size: "3.1 MB",
      icon: <Code className="h-8 w-8 text-green-500" />
    },
    {
      title: "Video Tutorial",
      type: "video",
      format: "MP4",
      size: "45.7 MB",
      icon: <Video className="h-8 w-8 text-red-500" />
    }
  ];
  
  const externalLinks = [
    {
      title: "Official Documentation",
      url: "https://example.com/docs",
      description: "Complete reference for this topic"
    },
    {
      title: "Community Forum",
      url: "https://example.com/forum",
      description: "Discuss with other learners and experts"
    },
    {
      title: "Related Course",
      url: "https://example.com/related",
      description: "Advanced topics to explore next"
    }
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Course Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-muted p-4 rounded-lg">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{resource.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{resource.format}</Badge>
                      <span>{resource.size}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 px-3">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <h3 className="text-xl font-semibold mb-4">External Links</h3>
      <div className="space-y-4">
        {externalLinks.map((link, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-3">
            <div>
              <div className="flex items-center">
                <Link className="h-4 w-4 mr-2 text-blue-500" />
                <h4 className="font-medium">{link.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" /> Visit
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseResources;
