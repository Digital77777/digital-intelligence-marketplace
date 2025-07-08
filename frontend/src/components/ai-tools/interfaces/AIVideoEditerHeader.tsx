
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, UploadCloud, Download } from "lucide-react";

interface AIVideoEditerHeaderProps {
  onBack?: () => void;
  selectedVideo: File | null;
}

const AIVideoEditerHeader: React.FC<AIVideoEditerHeaderProps> = ({
  onBack,
  selectedVideo,
}) => (
  <header className="flex items-center justify-between p-4 border-b border-blue-100 dark:border-blue-900 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/40 dark:via-purple-900/30 dark:to-green-900/40">
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-blue-100 dark:hover:bg-blue-900/40">
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">AI Video Editer</h1>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 dark:border-blue-400 dark:hover:bg-blue-900">
        <UploadCloud className="mr-2 h-4 w-4" />
        Import
      </Button>
      <Button
        variant="default"
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white"
        disabled={!selectedVideo}
      >
        <Download className="mr-2 h-4 w-4" />
        Export Video
      </Button>
    </div>
  </header>
);

export default AIVideoEditerHeader;
