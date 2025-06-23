import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Scissors } from "lucide-react";
import AIVideoEditerHeader from "./AIVideoEditerHeader";
import AIVideoEditerSidebar from "./AIVideoEditerSidebar";
import AIVideoEditerInsights from "./AIVideoEditerInsights";
import VideoUploadForm from "./VideoUploadForm";

const AIVideoEditerInterface: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleStartAIEdit = () => {
    // Placeholder function for starting AI edit
    console.log("Starting AI edit for video:", selectedVideo);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-sky-50 to-emerald-50 dark:from-purple-900/30 dark:via-sky-900/20 dark:to-emerald-900/20 text-gray-900 dark:text-gray-100">
      <AIVideoEditerHeader onBack={onBack} selectedVideo={selectedVideo} />
      <div className="flex flex-1 overflow-hidden">
        <AIVideoEditerSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 dark:text-blue-100">Quick Edit Workspace</CardTitle>
              </CardHeader>
              <VideoUploadForm
                selectedVideo={selectedVideo}
                setSelectedVideo={setSelectedVideo}
                onStartAIEdit={handleStartAIEdit}
              />
            </Card>
            {selectedVideo && (
              <Card className="border border-blue-100 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-base text-blue-900 dark:text-blue-100">Preview & Timeline</CardTitle>
                </CardHeader>
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  <video
                    src={URL.createObjectURL(selectedVideo)}
                    controls
                    className="rounded w-full md:w-2/3 max-h-60 border border-blue-200"
                  />
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="text-sm font-medium mb-1">Timeline (AI Assisted)</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded h-20 flex items-center justify-center text-blue-400">
                      <Scissors className="h-6 w-6 mr-2" />
                      <span>Auto Scene Detection & Edits</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 border-blue-200 dark:border-blue-600">
                      <Download className="h-4 w-4 mr-1" />
                      Download Edited Video
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
        <AIVideoEditerInsights />
      </div>
    </div>
  );
};

export default AIVideoEditerInterface;
