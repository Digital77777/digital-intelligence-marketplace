
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
    
    // The result from Supabase needs to be cast to our specific type.
    return (streams as any) || [];
};

export const useVideoStreams = () => {
    return useQuery<VideoStream[]>({
        queryKey: ['videoStreams'],
        queryFn: fetchVideoStreams,
    });
};
