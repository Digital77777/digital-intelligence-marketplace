
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CourseContentProps {
  content: string;
  onProgressUpdate: (progress: number) => void;
  course?: any; // Add optional course prop
}

const CourseContent: React.FC<CourseContentProps> = ({ content, onProgressUpdate, course }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [readSections, setReadSections] = useState<number[]>([]);
  
  // Parse sections from content (in a real app, this would be structured data)
  // For now, we'll split by h2 tags or simulate sections
  const sections = content.split('\n\n').filter(section => section.trim());
  
  useEffect(() => {
    // Calculate progress based on read sections
    const progress = Math.round((readSections.length / sections.length) * 100);
    if (readSections.length > 0) {
      onProgressUpdate(progress);
    }
  }, [readSections, sections.length, onProgressUpdate]);
  
  const markSectionAsRead = (index: number) => {
    if (!readSections.includes(index)) {
      setReadSections(prev => [...prev, index]);
    }
    
    // If this is the last section, show a toast
    if (index === sections.length - 1) {
      toast.success("You've reached the end of this course!");
    }
  };
  
  const renderSectionList = () => {
    return (
      <div className="mb-6 border rounded-lg overflow-hidden">
        {sections.map((section, index) => (
          <div 
            key={index} 
            className={`
              border-b last:border-b-0 p-3 flex justify-between items-center cursor-pointer
              ${currentSection === index ? 'bg-muted' : ''}
              hover:bg-muted/50 transition-colors
            `}
            onClick={() => setCurrentSection(index)}
          >
            <div className="flex items-center">
              <div className={`
                w-6 h-6 rounded-full mr-3 flex items-center justify-center 
                ${readSections.includes(index) 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                {readSections.includes(index) 
                  ? <CheckCircle className="h-4 w-4" /> 
                  : index + 1
                }
              </div>
              <span className="text-sm">Section {index + 1}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    );
  };
  
  const renderCurrentSection = () => {
    const section = sections[currentSection];
    
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Section {currentSection + 1}</h2>
        <div dangerouslySetInnerHTML={{ __html: section }} />
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => {
              if (currentSection > 0) {
                setCurrentSection(currentSection - 1);
              }
            }}
            disabled={currentSection === 0}
          >
            Previous Section
          </Button>
          
          <Button
            onClick={() => {
              markSectionAsRead(currentSection);
              if (currentSection < sections.length - 1) {
                setCurrentSection(currentSection + 1);
              }
            }}
          >
            {currentSection < sections.length - 1 ? 'Next Section' : 'Complete Course'}
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Content</h2>
      {renderSectionList()}
      {renderCurrentSection()}
    </div>
  );
};

export default CourseContent;
