
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, GraduationCap } from 'lucide-react';
import { CuratedCourse } from '../types/course';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: CuratedCourse | null;
  onOpenExternal: (url: string) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  course,
  onOpenExternal
}) => {
  const getYouTubeEmbedUrl = (embedId: string) => {
    if (embedId.startsWith('PL')) {
      return `https://www.youtube.com/embed/videoseries?list=${embedId}&rel=0&modestbranding=1`;
    } else {
      return `https://www.youtube.com/embed/${embedId}?rel=0&modestbranding=1`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{course?.title}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => course && onOpenExternal(course.videoUrl)}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in YouTube
            </Button>
          </DialogTitle>
        </DialogHeader>
        {course && (
          <div className="space-y-4">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(course.embedId)}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                {course.instructor}
                {course.institution && ` • ${course.institution}`}
              </div>
              <p className="text-sm">{course.description}</p>
              <div className="flex flex-wrap gap-1">
                {course.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
