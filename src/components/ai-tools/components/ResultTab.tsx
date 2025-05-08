
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ResultDisplay from './ResultDisplay';
import ResultActions from './ResultActions';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchCourses, Course } from '@/utils/courseService';

interface ResultTabProps {
  output: string;
  setCurrentTab: (tab: string) => void;
  handleProcess: () => void;
  handleSave: () => void;
  isProcessing: boolean;
  hasInput: boolean;
  toolCategory: string;
}

const ResultTab: React.FC<ResultTabProps> = ({
  output,
  setCurrentTab,
  handleProcess,
  handleSave,
  isProcessing,
  hasInput,
  toolCategory
}) => {
  // Check if the output contains an HTML img tag
  const isImageOutput = output?.includes('<img');
  
  // Get related courses based on the tool category
  const relatedCourses = useRelatedCourses(toolCategory);
  
  return (
    <>
      {output ? (
        <div className="space-y-4">
          <Card className="flex-1">
            <CardContent className="p-4">
              <ResultDisplay 
                output={output} 
                toolCategory={toolCategory}
                isImageOutput={isImageOutput}
              />
            </CardContent>
          </Card>
          
          {relatedCourses.length > 0 && (
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center mb-3">
                <BookOpen className="h-4 w-4 mr-2 text-primary" />
                <h3 className="text-sm font-medium">Suggested Learning Resources</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {relatedCourses.map(course => (
                  <Link 
                    to={`/learning/${course.id}`} 
                    key={course.id}
                    className="group"
                  >
                    <Badge variant="outline" className="hover:bg-secondary transition-colors">
                      <span className="mr-1">{course.title}</span>
                      <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                        {course.difficulty}
                      </span>
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full bg-muted/30 rounded-md">
          <p className="text-muted-foreground">No result yet. Process some input first.</p>
        </div>
      )}
      
      <ResultActions 
        setCurrentTab={setCurrentTab}
        handleProcess={handleProcess}
        handleSave={handleSave}
        isProcessing={isProcessing}
        hasInput={hasInput}
        output={output}
      />
    </>
  );
};

// Custom hook to get related courses
function useRelatedCourses(toolCategory: string): Course[] {
  // Map AI tool categories to relevant course search terms
  const categoryToSearchTerm: Record<string, string> = {
    'text-generation': 'language prompting',
    'image-generation': 'image AI',
    'code-generation': 'programming',
    'data-analysis': 'data science',
    'summarization': 'text analysis',
    'translation': 'language',
    'audio': 'audio processing',
    'video': 'video AI',
    'chat': 'chatbot',
  };
  
  const searchTerm = categoryToSearchTerm[toolCategory] || toolCategory;
  
  // Use React Query to cache results
  const { data = [] } = useQuery({
    queryKey: ['related-courses', toolCategory],
    queryFn: () => searchCourses(searchTerm).slice(0, 3),  // Limit to 3 courses
  });
  
  return data;
}

export default ResultTab;
