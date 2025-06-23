import React from "react";
import { MessageSquare, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const SupportLinks: React.FC = () => {
  return (
    <div className="flex justify-end gap-3">
      <Button variant="outline" className="text-blue-700 dark:text-blue-200">
        <MessageSquare className="h-4 w-4 mr-1" />
        Community
      </Button>
      <Button variant="default" className="bg-purple-700 text-white">
        <BookOpen className="h-4 w-4 mr-1" />
        Documentation
      </Button>
    </div>
  );
};

export default SupportLinks;
