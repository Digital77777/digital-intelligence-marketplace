
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Play, Clock, Eye } from 'lucide-react';
import { VideoStream } from '@/types/videoStreams';
import { getSupabasePublicUrl } from '@/lib/utils';

interface StreamCardProps {
  stream: VideoStream;
  getCategoryIcon: (category: string) => JSX.Element;
  formatDate: (dateString: string) => string;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream, getCategoryIcon, formatDate }) => {
  const thumbnailUrl = getSupabasePublicUrl('stream-thumbnails', stream.thumbnail_storage_path) || getSupabasePublicUrl('video-streams', stream.video_storage_path);

  return (
    <Card className="overflow-hidden relative group">
      <Link to={`/ai-stream/${stream.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {stream.title}</span>
      </Link>
      <div className="relative h-40 bg-gray-800">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={stream.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-800 to-gray-900">
            <Play className="h-12 w-12 text-white opacity-50" />
          </div>
        )}
        <Badge 
          className="absolute top-3 left-3 capitalize"
          variant="secondary"
        >
          {getCategoryIcon(stream.category)}
          <span className="ml-1">{stream.category}</span>
        </Badge>
        {stream.duration && (
          <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">
            <Clock className="h-3 w-3 mr-1" />
            {stream.duration}
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <Badge variant="secondary" className="h-9 px-4 py-2">
            <Play className="h-4 w-4 mr-2" />
            Play
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-medium line-clamp-1 mb-1">{stream.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{stream.description || 'No description available.'}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={stream.author?.avatar_url || undefined} alt={stream.author?.username} />
            <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{stream.author?.username || 'Anonymous'}</span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Eye className="h-3 w-3 mr-1" /> {stream.views.toLocaleString()}
          </span>
          <span>{formatDate(stream.created_at)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StreamCard;
