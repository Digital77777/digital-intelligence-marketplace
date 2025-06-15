import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { Upload, FileVideo, ChevronRight } from 'lucide-react';
import LoadingIndicator from '@/components/ui/loading-indicator';
import { useVideoUpload } from '@/hooks/useVideoUpload';

interface UploadFormProps {
  onUploadSuccess: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadSuccess }) => {
  const { user } = useUser();
  const { uploading, uploadStream } = useVideoUpload(onUploadSuccess);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'tutorial' | 'research' | 'demo' | 'live'>('tutorial');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile);
        
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
        if (!title) {
          setTitle(fileName);
        }
      } else {
        toast.error('Please select a valid video file (MP4, WebM, etc.)');
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to upload AI streams');
      return;
    }
    
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    
    if (!title.trim()) {
      toast.error('Please provide a title for your stream');
      return;
    }
    
    await uploadStream({ title, description, category, file });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Upload AI Stream</CardTitle>
        <CardDescription>
          Share your AI-powered creations, tutorials, or research with the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              {previewUrl ? (
                <div className="space-y-4">
                  <video 
                    src={previewUrl} 
                    controls 
                    className="w-full rounded-md max-h-[300px]" 
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Change Video
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <Upload className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="flex text-sm leading-6 text-gray-500">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                    >
                      <span className="px-2">Upload a file</span>
                      <Input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="video/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    MP4, WebM, MOV up to 100MB
                  </p>
                </div>
              )}
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a title for your stream"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={uploading}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your AI stream..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px]"
                  disabled={uploading}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value: 'tutorial' | 'research' | 'demo' | 'live') => setCategory(value)}
                  disabled={uploading}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="live">Live Stream</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full"
              disabled={uploading || !file}
            >
              {uploading ? (
                <LoadingIndicator text="Uploading..." />
              ) : (
                <>Upload Stream<ChevronRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
