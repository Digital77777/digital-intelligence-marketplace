
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ModelDetailsProps {
  modelName: string;
  setModelName: (name: string) => void;
  modelVersion: string;
  setModelVersion: (version: string) => void;
  modelDescription: string;
  setModelDescription: (description: string) => void;
}

const ModelDetails: React.FC<ModelDetailsProps> = ({
  modelName,
  setModelName,
  modelVersion,
  setModelVersion,
  modelDescription,
  setModelDescription,
}) => {
  return (
    <Card className="bg-gray-900/50 border-gray-800 text-white">
      <CardHeader className="border-b border-gray-800 bg-gray-950/50 pb-3">
        <CardTitle className="text-sm font-medium">Model Details</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-gray-400 block mb-1">Model Name</Label>
            <Input
              placeholder="My Custom Model"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>
          
          <div>
            <Label className="text-xs text-gray-400 block mb-1">Version</Label>
            <Input
              placeholder="1.0.0"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              value={modelVersion}
              onChange={(e) => setModelVersion(e.target.value)}
            />
          </div>
          
          <div>
            <Label className="text-xs text-gray-400 block mb-1">Model Type</Label>
            <Select>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select model type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="classification">Classification</SelectItem>
                <SelectItem value="regression">Regression</SelectItem>
                <SelectItem value="clustering">Clustering</SelectItem>
                <SelectItem value="nlp">Natural Language Processing</SelectItem>
                <SelectItem value="computer-vision">Computer Vision</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-xs text-gray-400 block mb-1">Description</Label>
            <textarea
              placeholder="Enter a description..."
              className="w-full h-20 rounded-md bg-gray-800 border border-gray-700 text-white p-2 text-sm placeholder:text-gray-500"
              value={modelDescription}
              onChange={(e) => setModelDescription(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelDetails;
