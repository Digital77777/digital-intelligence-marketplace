
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { VideoStream } from '@/types/videoStreams';

const fetchVideoStreams = async (): Promise<VideoStream[]> => {
    // We fetch streams and join the author's profile information.
    // The foreign key relationship between video_streams.user_id and user_profiles.id
    // allows for this join.
    const { data: streams, error } = await supabase
        .from('video_streams')
        .select(`
            *,
            author:user_profiles (
                id,
                username,
                avatar_url
            )
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching video streams:', error);
        throw new Error(error.message);
    }

    const hardcodedStreams: VideoStream[] = [
      {
        id: '1',
        title: 'Introduction to AI',
        description: 'A beginner-friendly introduction to the world of artificial intelligence.',
        category: 'tutorial',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail_url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        created_at: new Date().toISOString(),
        user_id: '1',
        status: 'published',
        author: {
          id: '1',
          username: 'AI Tutorials',
          avatar_url: 'https://yt3.ggpht.com/ytc/AOP9yLixJ9JKSzLq9POjohqR-0_zwjX09w_o1_9m=s88-c-k-c0x00ffffff-no-rj'
        },
        code_snippets: [],
        duration: '10:00',
        is_flagged: false,
        is_public: true,
        likes: 0,
        views: 0,
        thumbnail_storage_path: '',
        updated_at: new Date().toISOString(),
        video_storage_path: ''
      },
      {
        id: '2',
        title: 'AI Research Presentation',
        description: 'A presentation on the latest AI research findings.',
        category: 'research',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail_url: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        created_at: new Date().toISOString(),
        user_id: '2',
        status: 'published',
        author: {
          id: '2',
          username: 'AI Research',
          avatar_url: 'https://yt3.ggpht.com/ytc/AOP9yLixJ9JKSzLq9POjohqR-0_zwjX09w_o1_9m=s88-c-k-c0x00ffffff-no-rj'
        },
        code_snippets: [],
        duration: '15:00',
        is_flagged: false,
        is_public: true,
        likes: 0,
        views: 0,
        thumbnail_storage_path: '',
        updated_at: new Date().toISOString(),
        video_storage_path: ''
      }
    ];
    
    // The result from Supabase needs to be cast to our specific type.
    return [...(streams as any) || [], ...hardcodedStreams];
};

export const useVideoStreams = () => {
    return useQuery<VideoStream[]>({
        queryKey: ['videoStreams'],
        queryFn: fetchVideoStreams,
    });
};
