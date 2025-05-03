
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const templates = [
  {
    id: 1,
    title: "Document Processing",
    description: "Extract data from documents with OCR and process with AI",
    complexity: "Medium",
    category: "Document"
  },
  {
    id: 2,
    title: "Customer Support Bot",
    description: "Automated customer support workflow with sentiment analysis",
    complexity: "Advanced",
    category: "ChatBot"
  },
  {
    id: 3,
    title: "Data ETL Pipeline",
    description: "Extract, transform and load data from multiple sources",
    complexity: "Simple",
    category: "Data"
  },
  {
    id: 4,
    title: "Image Analysis",
    description: "Detect objects and extract metadata from images",
    complexity: "Medium",
    category: "Vision"
  }
];

const WorkflowTemplates = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{template.title}</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                {template.category}
              </Badge>
            </div>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Complexity:</span> {template.complexity}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
            <Button variant="outline" size="sm">Preview</Button>
            <Button size="sm">Use Template</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default WorkflowTemplates;
