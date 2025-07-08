
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Video, Play, Settings, Activity, Scan } from 'lucide-react';
import { Camera as CameraType } from './types';

interface CameraFeedCardProps {
  selectedCamera: string;
  setSelectedCamera: (value: string) => void;
  cameras: CameraType[];
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

const CameraFeedCard: React.FC<CameraFeedCardProps> = ({
  selectedCamera,
  setSelectedCamera,
  cameras,
  isAnalyzing,
  onAnalyze
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Live Camera Feed
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Play className="h-4 w-4" />
            </Button>
            <Select value={selectedCamera} onValueChange={setSelectedCamera}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cameras.map((camera) => (
                  <SelectItem key={camera.id} value={camera.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {camera.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
          <div className="text-center text-white">
            <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Live Camera Feed</p>
            <p className="text-sm opacity-75">Pasture A - Main Camera</p>
          </div>
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            ● LIVE
          </div>
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            24 Animals Detected
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isAnalyzing ? (
              <>
                <Activity className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Scan className="h-4 w-4 mr-2" />
                Analyze Current Feed
              </>
            )}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Camera Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraFeedCard;
