import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { UploadCloud, PlayCircle } from "lucide-react";

interface VideoUploadFormProps {
  selectedVideo: File | null;
  setSelectedVideo: (video: File | null) => void;
  onStartAIEdit: () => void;
}

const VideoUploadForm: React.FC<VideoUploadFormProps> = ({ selectedVideo, setSelectedVideo, onStartAIEdit }) => {
  return (
    <CardContent>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={e => {
          e.preventDefault();
          onStartAIEdit();
        }}
      >
        <label className="block w-full text-center">
          <input
            type="file"
            accept="video/*"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setSelectedVideo(e.target.files[0]);
              }
            }}
            className="hidden"
            id="video-upload"
          />
          <span className="inline-flex items-center justify-center w-48 h-32 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/10 dark:text-blue-200 cursor-pointer border-2 border-dashed border-blue-200">
            <UploadCloud className="h-8 w-8 mr-2" />
            {selectedVideo ? selectedVideo.name : "Upload Video"}
          </span>
        </label>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          disabled={!selectedVideo}
        >
          <PlayCircle className="h-5 w-5 mr-2" />
          Start AI Edit
        </Button>
      </form>
    </CardContent>
  );
};

export default VideoUploadForm;
