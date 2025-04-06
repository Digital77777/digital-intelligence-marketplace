
import React, { useState } from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useScrollToTop from '@/hooks/useScrollToTop';

// Import our new components
import { TeamMembersList } from '@/components/collaboration/TeamMembersList';
import { QuickActions } from '@/components/collaboration/QuickActions';
import { DiscussionsTab } from '@/components/collaboration/DiscussionsTab';
import { TasksTab } from '@/components/collaboration/TasksTab';
import { FilesTab } from '@/components/collaboration/FilesTab';

const CollaborationHub = () => {
  useScrollToTop(); // Add scroll to top on navigation
  
  // Mock data setup
  const mockTeamMembers = [
    { id: 1, name: "Alex Johnson", role: "Team Lead", avatar: "https://i.pravatar.cc/150?img=1", online: true },
    { id: 2, name: "Sarah Williams", role: "Data Scientist", avatar: "https://i.pravatar.cc/150?img=2", online: true },
    { id: 3, name: "Mike Chen", role: "ML Engineer", avatar: "https://i.pravatar.cc/150?img=3", online: false },
    { id: 4, name: "Emily Davis", role: "UX Designer", avatar: "https://i.pravatar.cc/150?img=4", online: true },
    { id: 5, name: "Chris Taylor", role: "Backend Dev", avatar: "https://i.pravatar.cc/150?img=5", online: false },
  ];

  const mockDiscussions = [
    {
      id: 1,
      user: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      message: "I've updated the training parameters for our NLP model. The accuracy has improved by 7%!",
      timestamp: "10:23 AM",
      replies: 3
    },
    {
      id: 2,
      user: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=2",
      message: "Just uploaded the new dataset for image recognition. @Mike can you review it when you get a chance?",
      timestamp: "9:45 AM",
      replies: 1,
      attachments: [
        { name: "dataset_v2.csv", size: "4.2MB" }
      ]
    },
    {
      id: 3,
      user: "Chris Taylor",
      avatar: "https://i.pravatar.cc/150?img=5",
      message: "I've deployed the new API endpoints. Documentation is in the shared folder.",
      timestamp: "Yesterday",
      replies: 5,
      attachments: [
        { name: "api_docs.pdf", size: "2.1MB" }
      ]
    },
  ];

  // Fixed mockTasks to use proper status literals that match the Task type
  const mockTasks = [
    { id: 1, title: "Optimize model training pipeline", assignee: "Mike Chen", status: "In Progress" as const, due: "Tomorrow" },
    { id: 2, title: "Review dataset quality", assignee: "Sarah Williams", status: "Done" as const, due: "Yesterday" },
    { id: 3, title: "Deploy updated API to staging", assignee: "Chris Taylor", status: "In Progress" as const, due: "Friday" },
    { id: 4, title: "Prepare presentation for client meeting", assignee: "Alex Johnson", status: "Not Started" as const, due: "Next Week" },
    { id: 5, title: "Fix UI bugs in dashboard", assignee: "Emily Davis", status: "In Progress" as const, due: "Wednesday" },
  ];

  const mockFiles = [
    { id: 1, name: "Project_Requirements.pdf", type: "PDF", size: "2.4MB", uploadedBy: "Alex Johnson", date: "2 days ago" },
    { id: 2, name: "Training_Data_v3.csv", type: "CSV", size: "8.7MB", uploadedBy: "Sarah Williams", date: "Yesterday" },
    { id: 3, name: "API_Documentation.docx", type: "DOCX", size: "1.2MB", uploadedBy: "Chris Taylor", date: "4 hours ago" },
    { id: 4, name: "Dashboard_Mockup.fig", type: "FIG", size: "5.1MB", uploadedBy: "Emily Davis", date: "1 week ago" },
  ];

  return (
    <BasicTierLayout pageTitle="Collaboration Hub" requiredFeature="collaboration-hub">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Tabs defaultValue="discussions">
            <TabsList className="mb-4">
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions">
              <DiscussionsTab discussions={mockDiscussions} />
            </TabsContent>

            <TabsContent value="tasks">
              <TasksTab tasks={mockTasks} />
            </TabsContent>

            <TabsContent value="files">
              <FilesTab files={mockFiles} />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <TeamMembersList teamMembers={mockTeamMembers} />
          <QuickActions />
        </div>
      </div>
    </BasicTierLayout>
  );
};

export default CollaborationHub;
