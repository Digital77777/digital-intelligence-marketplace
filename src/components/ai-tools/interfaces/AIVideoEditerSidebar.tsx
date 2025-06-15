
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Scissors, PlayCircle, Layers, Image, Settings } from "lucide-react";

const features = [
  { icon: Scissors, label: "Smart Cut" },
  { icon: Layers, label: "Auto Scene Detect" },
  { icon: Image, label: "AI Visual Effects" },
  { icon: PlayCircle, label: "Voice-over" },
  { icon: Settings, label: "Video Clean-up" },
];

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

const AIVideoEditerSidebar = () => (
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
);

export default AIVideoEditerSidebar;
