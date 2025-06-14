
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { AIToolItem } from "@/data/ai-tools-tiers";

const ToolInfoHeader: React.FC<{ tool: AIToolItem }> = ({ tool }) => (
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4 mb-4">
    <div className="flex items-start gap-3">
      <div className="bg-blue-100 p-2 rounded-lg text-2xl">{tool.icon}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-900">{tool.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{tool.description}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {tool.category}
          </Badge>
          {tool.popularTool && (
            <Badge className="bg-amber-100 text-amber-800 text-xs">
              🔥 Popular
            </Badge>
          )}
        </div>
      </div>
    </div>
    {tool.function && (
      <div className="mt-3 p-3 bg-white rounded-md border border-blue-100">
        <div className="flex items-center gap-2 mb-1">
          <Info className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Function</span>
        </div>
        <p className="text-sm text-gray-700">{tool.function}</p>
      </div>
    )}
  </div>
);

export default ToolInfoHeader;
