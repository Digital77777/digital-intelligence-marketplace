
import React from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface File {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  date: string;
}

interface FilesTabProps {
  files: File[];
}

export const FilesTab: React.FC<FilesTabProps> = ({ files }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Shared Files</CardTitle>
          <CardDescription>Documents and files shared by your team</CardDescription>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-4 py-3">Name</th>
                <th scope="col" className="px-4 py-3">Type</th>
                <th scope="col" className="px-4 py-3">Size</th>
                <th scope="col" className="px-4 py-3">Uploaded by</th>
                <th scope="col" className="px-4 py-3">Date</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">{file.name}</td>
                  <td className="px-4 py-3">{file.type}</td>
                  <td className="px-4 py-3">{file.size}</td>
                  <td className="px-4 py-3">{file.uploadedBy}</td>
                  <td className="px-4 py-3">{file.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Download</Button>
                      <Button variant="outline" size="sm">Share</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
