
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, Database, FileText, Image, BarChart3, Target, Brain } from 'lucide-react';
import { useDatasets } from '@/hooks/useModelState';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DatasetManager: React.FC = () => {
  const { data: datasets, isLoading } = useDatasets();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    dataset_type: '',
    file: null as File | null
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text_classification':
        return <FileText className="h-4 w-4" />;
      case 'image_classification':
        return <Image className="h-4 w-4" />;
      case 'regression':
        return <BarChart3 className="h-4 w-4" />;
      case 'object_detection':
        return <Target className="h-4 w-4" />;
      case 'nlp':
        return <Brain className="h-4 w-4" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, file }));
    }
  };

  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.name || !uploadForm.dataset_type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a file.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload file to Supabase storage (this would be implemented with actual storage)
      const fileUrl = `https://example.com/datasets/${uploadForm.file.name}`;
      
      const { error } = await supabase
        .from('datasets')
        .insert({
          name: uploadForm.name,
          description: uploadForm.description,
          dataset_type: uploadForm.dataset_type as any,
          file_url: fileUrl,
          file_size: uploadForm.file.size,
          file_format: uploadForm.file.name.split('.').pop()
        });

      if (error) throw error;

      toast({
        title: "Dataset Uploaded",
        description: "Your dataset has been successfully uploaded and validated."
      });

      setUploadForm({ name: '', description: '', dataset_type: '', file: null });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload dataset. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Dataset
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataset-name">Dataset Name</Label>
              <Input
                id="dataset-name"
                value={uploadForm.name}
                onChange={(e) => setUploadForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My Training Dataset"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataset-type">Dataset Type</Label>
              <Select value={uploadForm.dataset_type} onValueChange={(value) => 
                setUploadForm(prev => ({ ...prev, dataset_type: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select dataset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text_classification">Text Classification</SelectItem>
                  <SelectItem value="image_classification">Image Classification</SelectItem>
                  <SelectItem value="regression">Regression</SelectItem>
                  <SelectItem value="object_detection">Object Detection</SelectItem>
                  <SelectItem value="nlp">Natural Language Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dataset-description">Description</Label>
            <Textarea
              id="dataset-description"
              value={uploadForm.description}
              onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your dataset..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dataset-file">Dataset File</Label>
            <Input
              id="dataset-file"
              type="file"
              onChange={handleFileChange}
              accept=".csv,.json,.zip,.tar.gz"
            />
            <p className="text-sm text-gray-500">
              Supported formats: CSV, JSON, ZIP, TAR.GZ
            </p>
          </div>
          
          <Button 
            onClick={handleUpload} 
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Dataset'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Your Datasets
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : datasets?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No datasets uploaded yet
            </div>
          ) : (
            <div className="space-y-4">
              {datasets?.map((dataset) => (
                <div key={dataset.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(dataset.dataset_type)}
                      <div>
                        <h3 className="font-medium">{dataset.name}</h3>
                        <p className="text-sm text-gray-500">{dataset.description}</p>
                      </div>
                      <Badge variant="outline">
                        {dataset.dataset_type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="ml-2">{formatFileSize(dataset.file_size)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Format:</span>
                      <span className="ml-2 uppercase">{dataset.file_format}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Uploaded:</span>
                      <span className="ml-2">
                        {new Date(dataset.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasetManager;
