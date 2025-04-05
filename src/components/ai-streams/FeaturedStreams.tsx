
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { User, Play, Eye } from 'lucide-react';
import { AIStream } from '@/types/AIStreams';

interface FeaturedStreamsProps {
  streams: AIStream[];
  getCategoryIcon: (category: string) => JSX.Element;
  getCategoryColor: (category: string) => string;
}

const FeaturedStreams: React.FC<FeaturedStreamsProps> = ({ 
  streams, 
  getCategoryIcon,
  getCategoryColor
}) => {
  if (streams.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-6">Featured Streams</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {streams.map((stream) => (
          <Card key={stream.id} className="overflow-hidden">
            <div className="relative h-48 bg-gray-800 flex items-center justify-center">
              {stream.image_url ? (
                <img 
                  src={stream.image_url} 
                  alt={stream.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-indigo-900 to-purple-900">
                  <Play className="h-16 w-16 text-white opacity-70" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <Badge 
                    className={`${getCategoryColor(stream.category)} text-white mb-2`}
                  >
                    {getCategoryIcon(stream.category)}
                    <span className="ml-1 capitalize">{stream.category}</span>
                  </Badge>
                  <h3 className="text-xl font-medium">{stream.title}</h3>
                </div>
              </div>
              <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                {stream.duration}
              </Badge>
            </div>
            <CardContent className="pt-4">
              <p className="text-muted-foreground line-clamp-2">{stream.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-7 w-7">
                  {stream.author?.avatar_url ? (
                    <img src={stream.author.avatar_url} alt={stream.author.username} />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </Avatar>
                <span className="text-sm font-medium">{stream.author?.username}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" /> {stream.views.toLocaleString()}
              </div>
            </CardFooter>
            <Link to={`/ai-streams/${stream.id}`} className="absolute inset-0">
              <span className="sr-only">View stream</span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedStreams;
