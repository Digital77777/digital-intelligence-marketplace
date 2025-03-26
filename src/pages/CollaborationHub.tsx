
import React, { useState } from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Paperclip, Send, Plus, File, Users, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const CollaborationHub = () => {
  const [newMessage, setNewMessage] = useState('');
  
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

  const mockTasks = [
    { id: 1, title: "Optimize model training pipeline", assignee: "Mike Chen", status: "In Progress", due: "Tomorrow" },
    { id: 2, title: "Review dataset quality", assignee: "Sarah Williams", status: "Done", due: "Yesterday" },
    { id: 3, title: "Deploy updated API to staging", assignee: "Chris Taylor", status: "In Progress", due: "Friday" },
    { id: 4, title: "Prepare presentation for client meeting", assignee: "Alex Johnson", status: "Not Started", due: "Next Week" },
    { id: 5, title: "Fix UI bugs in dashboard", assignee: "Emily Davis", status: "In Progress", due: "Wednesday" },
  ];

  const mockFiles = [
    { id: 1, name: "Project_Requirements.pdf", type: "PDF", size: "2.4MB", uploadedBy: "Alex Johnson", date: "2 days ago" },
    { id: 2, name: "Training_Data_v3.csv", type: "CSV", size: "8.7MB", uploadedBy: "Sarah Williams", date: "Yesterday" },
    { id: 3, name: "API_Documentation.docx", type: "DOCX", size: "1.2MB", uploadedBy: "Chris Taylor", date: "4 hours ago" },
    { id: 4, name: "Dashboard_Mockup.fig", type: "FIG", size: "5.1MB", uploadedBy: "Emily Davis", date: "1 week ago" },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      // In a real app, this would send the message to Supabase
      setNewMessage('');
    }
  };

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
              <Card>
                <CardHeader>
                  <CardTitle>Team Discussions</CardTitle>
                  <CardDescription>Conversations, updates, and ideas from your team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockDiscussions.map((discussion) => (
                      <div key={discussion.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={discussion.avatar} />
                            <AvatarFallback>{discussion.user.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-medium">{discussion.user}</h4>
                              <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
                            </div>
                            <p className="text-sm mb-3">{discussion.message}</p>
                            
                            {discussion.attachments && (
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-2 mb-3">
                                {discussion.attachments.map((file, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs">
                                    <File className="h-4 w-4 text-blue-500" />
                                    <span>{file.name}</span>
                                    <span className="text-muted-foreground">({file.size})</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                <MessageSquare className="h-3 w-3 mr-1" /> 
                                Reply ({discussion.replies})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex items-end gap-3 w-full">
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Type your message here..." 
                        className="resize-none"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4 mr-2" /> 
                        Send
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Team Tasks</CardTitle>
                    <CardDescription>Track and manage your team's tasks</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Task
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground uppercase bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="px-4 py-3">Task</th>
                          <th scope="col" className="px-4 py-3">Assignee</th>
                          <th scope="col" className="px-4 py-3">Status</th>
                          <th scope="col" className="px-4 py-3">Due</th>
                          <th scope="col" className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTasks.map((task) => (
                          <tr key={task.id} className="border-b dark:border-gray-700">
                            <td className="px-4 py-3 font-medium">{task.title}</td>
                            <td className="px-4 py-3">{task.assignee}</td>
                            <td className="px-4 py-3">
                              <Badge variant={
                                task.status === "Done" ? "default" :
                                task.status === "In Progress" ? "outline" : "secondary"
                              }>
                                {task.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">{task.due}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                {task.status !== "Done" && (
                                  <Button variant="outline" size="sm" className="text-green-600">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="files">
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
                        {mockFiles.map((file) => (
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
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Users className="mr-2 h-4 w-4 text-blue-500" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {member.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Message</Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BasicTierLayout>
  );
};

export default CollaborationHub;
