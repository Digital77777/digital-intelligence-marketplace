import { useState, useEffect } from 'react';
import { VideoStream } from '@/types/videoStreams';

export const useFeaturedStreams = (streams: VideoStream[]) => {
  const [featuredStreams, setFeaturedStreams] = useState<VideoStream[]>([]);

  useEffect(() => {
    setFeaturedStreams(streams.slice(0, 2));
  }, [streams]);

  return featuredStreams;
};
