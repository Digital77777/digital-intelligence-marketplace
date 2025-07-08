
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image, Video, Archive, Download, Trash2 } from 'lucide-react';
import { CollaborationFile } from './types';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';

interface FilesTabProps {
  files: CollaborationFile[];
}

const FilesTab: React.FC<FilesTabProps> = ({ files }) => {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // Get user's first team (in a real app, you'd let them select)
      const { data: teamMembership } = await supabase
        .from('team_memberships')
        .select('team_id')
        .eq('user_id', user.id)
        .limit(1)
        .single();

      if (!teamMembership) {
        toast.error('You need to be part of a team to upload files');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('teamId', teamMembership.team_id);
      formData.append('fileName', file.name);

      const { data, error } = await supabase.functions.invoke('file-upload', {
        body: formData,
      });

      if (error) throw error;

      toast.success('File uploaded successfully!');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (file: CollaborationFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('collaboration-files')
        .createSignedUrl(file.storage_path, 3600); // 1 hour expiry

      if (error) throw error;

      // Open download in new tab
      window.open(data.signedUrl, '_blank');

      // Update download count
      await supabase
        .from('files')
        .update({ download_count: file.download_count + 1 })
        .eq('id', file.id);

    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image': return <Image className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video className="w-5 h-5 text-purple-500" />;
      case 'archive': return <Archive className="w-5 h-5 text-orange-500" />;
      case 'document': return <FileText className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'image': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'archive': return 'bg-orange-100 text-orange-800';
      case 'document': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Shared Files ({files.length})
            </span>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept=".pdf,.csv,.docx,.xlsx,.zip,.rar,.txt,.jpg,.jpeg,.png,.gif,.webp"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {files.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No files shared yet</h3>
                <p className="text-gray-600">Upload files to share them with your team.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          files.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(file.file_type)}
                    <div>
                      <h4 className="font-medium">{file.original_name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>by {file.user_profiles?.full_name || file.user_profiles?.username}</span>
                        <span>•</span>
                        <span>{formatFileSize(file.size_bytes)}</span>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getFileTypeColor(file.file_type)}>
                      {file.file_type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {file.download_count} downloads
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(file)}
                      className="flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FilesTab;
