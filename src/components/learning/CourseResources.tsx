
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ExternalLink, Download, FileCode, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'pdf' | 'link' | 'download' | 'code' | 'video';
  url: string;
}

interface CourseResourcesProps {
  resources: Resource[];
  title: string;
  course?: any; // Optional course prop
}

const CourseResources: React.FC<CourseResourcesProps> = ({ resources, title, course }) => {
  // If no resources provided, use default empty array
  const courseResources = resources || [];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'link':
        return <ExternalLink className="h-5 w-5 text-blue-500" />;
      case 'download':
        return <Download className="h-5 w-5 text-green-500" />;
      case 'code':
        return <FileCode className="h-5 w-5 text-purple-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  if (courseResources.length === 0) {
    return (
      <div className="p-6 text-center border rounded-lg">
        <h3 className="mb-2 text-lg font-medium">No Resources Available</h3>
        <p className="text-muted-foreground">
          There are currently no additional resources for this course.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Resources</h2>
      <p className="text-muted-foreground mb-6">
        Additional materials to help you master {title}
      </p>

      <div className="space-y-4">
        {courseResources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-md">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    {resource.type === 'link' ? 'Visit Link' : 
                     resource.type === 'download' ? 'Download' : 
                     resource.type === 'video' ? 'Watch Video' : 'View Resource'}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseResources;
