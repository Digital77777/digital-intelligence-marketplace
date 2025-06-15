
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  name: string;
  region: string;
  status: string;
  carbonCredits: number;
  blockchain: string;
  type: string;
}
interface ProjectsSidebarProps {
  projects: Project[];
  selectedProject: string;
  onSelectProject: (project: string) => void;
}

const statusVariant = (status: string) => {
  switch (status) {
    case "certified":
      return "default";
    case "pending":
      return "outline";
    case "in review":
      return "secondary";
    default:
      return "outline";
  }
};

const ProjectsSidebar: React.FC<ProjectsSidebarProps> = ({
  projects,
  selectedProject,
  onSelectProject,
}) => {
  return (
    <div className="w-80 space-y-4">
      <Card className="border-green-100 dark:border-green-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-green-900 dark:text-green-100 text-lg">
            Regen Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedProject === project.name
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/50"
                  : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700"
              }`}
              onClick={() => onSelectProject(project.name)}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{project.name}</h4>
                <Badge variant={statusVariant(project.status)}>{project.status}</Badge>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {project.region} • {project.type}
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-0.5">
                Carbon Credits: {project.carbonCredits}
              </div>
              <div className="text-xs text-gray-400">{project.blockchain !== "-" ? `Blockchain: ${project.blockchain}` : ""}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectsSidebar;
