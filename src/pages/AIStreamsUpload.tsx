import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AIStream } from '@/types/AIStreams';
import { useUser } from '@/context/UserContext';
import { useTier } from '@/context/TierContext';
import { toast } from 'sonner';
import { Upload, FileVideo, ChevronRight } from 'lucide-react';
import LoadingIndicator from '@/components/ui/loading-indicator';

const AIStreamsUpload = () => {
  const { user, profile } = useUser();
  const { currentTier } = useTier();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'tutorial' | 'research' | 'demo' | 'live'>('tutorial');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Check tier access
  const canUploadStreams = currentTier === 'basic' || currentTier === 'pro';
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile);
        
        // Create preview URL
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        
        // Auto-populate title from filename
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove extension
        if (!title) {
          setTitle(fileName);
        }
      } else {
        toast.error('Please select a valid video file');
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to upload AI streams');
      return;
    }
    
    if (!canUploadStreams) {
      toast.error('You need at least a Basic tier subscription to upload AI streams');
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
    
    setUploading(true);
    
    try {
      // In a real app, this would upload the file to a storage bucket
      // and create the database entry for the stream
      
      // Simulating upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample stream data that would be returned from the backend
      const newStream: AIStream = {
        id: `stream-${Date.now()}`,
        user_id: user.id,
        title,
        description,
        category,
        duration: '00:00:00', // Would be calculated by the backend
        views: 0,
        created_at: new Date().toISOString(),
        image_url: previewUrl || undefined,
        is_flagged: false,
        author: {
          id: user.id,
          username: profile?.username || user.email?.split('@')[0] || 'Anonymous',
          avatar_url: profile?.avatar_url
        }
      };
      
      // In a real app, this would be created in the database
      
      toast.success('Stream uploaded successfully!');
      navigate('/ai-streams');
    } catch (error) {
      console.error('Error uploading stream:', error);
      toast.error('Failed to upload stream. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  if (!canUploadStreams) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileVideo className="mr-2 h-6 w-6 text-amber-600" />
                  Premium Feature
                </CardTitle>
                <CardDescription>
                  AI Stream uploads are available for Basic and Pro tier subscribers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800 dark:text-amber-200 mb-4">
                  Upgrade to Basic or Pro tier to upload and share your AI streams with the community.
                </p>
                <Button onClick={() => navigate('/pricing')}>View Pricing Plans</Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4 md:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/ai-streams">AI Streams</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>Upload Stream</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
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
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          MP4, WebM or OGG up to 100MB
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
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={category}
                        onValueChange={(value: 'tutorial' | 'research' | 'demo' | 'live') => setCategory(value)}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIStreamsUpload;
