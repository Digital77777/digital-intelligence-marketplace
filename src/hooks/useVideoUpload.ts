
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useVideoUpload = (onUploadSuccess: () => void) => {
    const { user } = useUser();
    const [uploading, setUploading] = useState(false);

    const uploadStream = async ({
        title,
        description,
        category,
        file,
    }: {
        title: string;
        description: string;
        category: string;
        file: File;
    }) => {
        if (!user) {
            toast.error('You must be logged in to upload a stream.');
            return;
        }

        setUploading(true);

        try {
            const fileExtension = file.name.split('.').pop();
            const fileName = `${user.id}/${uuidv4()}.${fileExtension}`;
            
            // 1. Upload video file to storage
            const { error: uploadError } = await supabase.storage
                .from('video-streams')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: file.type,
                });

            if (uploadError) {
                throw new Error(`Failed to upload video: ${uploadError.message}`);
            }

            // 2. Insert metadata into public.video_streams table
            // Status is 'published' for now. Could be 'processing' in a real scenario
            // with backend video processing.
            const { data, error: insertError } = await supabase.from('video_streams').insert({
                user_id: user.id,
                title,
                description,
                category,
                video_storage_path: fileName,
                status: 'published',
            }).select().single();

            if (insertError) {
                // Attempt to delete the orphaned file if DB insert fails
                await supabase.storage.from('video-streams').remove([fileName]);
                throw new Error(`Failed to save stream metadata: ${insertError.message}`);
            }

            toast.success('Stream uploaded successfully!');
            onUploadSuccess();
        } catch (error: any) {
            console.error('Error uploading stream:', error);
            toast.error(error.message || 'An unknown error occurred during upload.');
        } finally {
            setUploading(false);
        }
    };

    return { uploading, uploadStream };
};
