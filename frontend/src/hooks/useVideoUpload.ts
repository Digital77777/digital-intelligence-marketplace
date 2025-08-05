import { useState } from 'react';
import { useUser } from '@/context/UserContext';
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
            // Mock upload for frontend-only version
            const fileExtension = file.name.split('.').pop();
            const fileName = `${user.id}/${uuidv4()}.${fileExtension}`;
            
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create mock video data
            const mockVideoData = {
                id: uuidv4(),
                user_id: user.id,
                title,
                description,
                category,
                video_storage_path: fileName,
                status: 'published',
                created_at: new Date().toISOString()
            };

            console.log('Mock video uploaded:', mockVideoData);
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