
import React from "react";
import { Separator } from "@/components/ui/separator";

const AIVideoEditerInsights = () => (
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
);

export default AIVideoEditerInsights;
