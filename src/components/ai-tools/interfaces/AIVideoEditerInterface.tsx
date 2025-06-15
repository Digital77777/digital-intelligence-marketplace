
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Scissors, Plus, PlayCircle, Layers, Image, UploadCloud, Download, Settings } from "lucide-react";

interface AIVideoEditerInterfaceProps {
  onBack?: () => void;
}

const sampleProjects = [
  {
    title: "Crop Growth Timelapse",
    thumb: "/placeholder.svg",
    updated: "2h ago",
    clips: 8,
    duration: "1:36",
  },
  {
    title: "Spring Harvest Highlights",
    thumb: "/placeholder.svg",
    updated: "Yesterday",
    clips: 12,
    duration: "2:17",
  },
];

const features = [
  { icon: Scissors, label: "Smart Cut" },
  { icon: Layers, label: "Auto Scene Detect" },
  { icon: Image, label: "AI Visual Effects" },
  { icon: PlayCircle, label: "Voice-over" },
  { icon: Settings, label: "Video Clean-up" },
];

const AIVideoEditerInterface: React.FC<AIVideoEditerInterfaceProps> = ({ onBack }) => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-sky-50 to-emerald-50 dark:from-purple-900/30 dark:via-sky-900/20 dark:to-emerald-900/20 text-gray-900 dark:text-gray-100">
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
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Project List & Features */}
        <aside className="w-72 border-r border-blue-100 dark:border-blue-800 p-4 bg-white dark:bg-gray-950 overflow-y-auto">
          <h2 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-wider">
            My Projects
          </h2>
          <div className="space-y-3 mb-6">
            {sampleProjects.map((project, idx) => (
              <Card key={idx} className="border border-blue-100 dark:border-blue-800 group hover:shadow-lg cursor-pointer">
                <CardHeader className="flex flex-row items-center gap-3 pb-1">
                  <img src={project.thumb} alt={project.title} className="h-10 w-14 rounded object-cover border border-blue-100 dark:border-blue-800" />
                  <div>
                    <CardTitle className="text-sm text-blue-900 dark:text-blue-100">{project.title}</CardTitle>
                    <div className="text-xs text-blue-700 dark:text-blue-300">{project.updated}</div>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center gap-2 py-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {project.clips} clips
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">•</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {project.duration}
                  </span>
                </CardContent>
              </Card>
            ))}
            <Button variant="ghost" size="sm" className="w-full justify-start text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 mt-1">
              <Plus className="h-4 w-4 mr-2" /> New Project
            </Button>
          </div>
          <Separator className="bg-blue-200 dark:bg-blue-800 mb-6" />
          <h2 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-wider">
            Editing Features
          </h2>
          <div className="flex flex-col gap-3">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer">
                <feat.icon className="h-5 w-5 text-blue-700 dark:text-blue-200" />
                <span className="text-gray-800 dark:text-gray-100 text-sm">{feat.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Editor */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 dark:text-blue-100">Quick Edit Workspace</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="flex flex-col items-center gap-4"
                  onSubmit={e => {
                    e.preventDefault();
                    // For a real app, you would add AI edit code here!
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
            </Card>
            {selectedVideo && (
              <Card className="border border-blue-100 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-base text-blue-900 dark:text-blue-100">Preview & Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
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
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        {/* Insights / Right sidebar */}
        <aside className="w-80 border-l border-blue-100 dark:border-blue-800 bg-white dark:bg-gray-950 p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-4">
            Project Insights
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <ul className="text-sm space-y-2">
              <li>
                <strong className="text-blue-900 dark:text-blue-100">AI Scene Split:</strong> 5 scenes identified
              </li>
              <li>
                <strong className="text-blue-900 dark:text-blue-100">Recommended Cut:</strong> 0:30–0:55 (long pause)
              </li>
              <li>
                <strong className="text-blue-900 dark:text-blue-100">Crop Focus:</strong> Wheat, Maize, Barley
              </li>
            </ul>
          </div>
          <Separator className="my-6 bg-blue-200 dark:bg-blue-800" />
          <h2 className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2">
            Activity Log
          </h2>
          <ul className="text-xs space-y-3">
            <li><span className="text-blue-800 dark:text-blue-200 font-medium">[2 min ago]</span> Auto edit complete.</li>
            <li><span className="text-blue-800 dark:text-blue-200 font-medium">[10 min ago]</span> Project "Crop Growth Timelapse" exported.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default AIVideoEditerInterface;
