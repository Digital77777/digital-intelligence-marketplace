
import React from 'react';
import BasicTierLayout from '@/components/layouts/BasicTierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, Play, Info, ArrowRight } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const WorkflowDesigner = () => {
  // Mock data for saved workflows
  const savedWorkflows = [
    { 
      id: 1, 
      name: "Slack Notification on New Data", 
      description: "Sends a Slack message when new data is uploaded to the database",
      lastRun: "2 days ago",
      status: "Active"
    },
    { 
      id: 2, 
      name: "Weekly Report Generator", 
      description: "Automatically generates analytics reports every Monday",
      lastRun: "5 days ago",
      status: "Active"
    },
    { 
      id: 3, 
      name: "Data Validation Pipeline", 
      description: "Validates incoming data and flags inconsistencies",
      lastRun: "Never",
      status: "Draft"
    },
  ];

  // Mock data for trigger and action options
  const triggerOptions = [
    { id: "new_data", name: "New Data Uploaded", service: "Database" },
    { id: "schedule", name: "Schedule", service: "System" },
    { id: "form_submission", name: "Form Submission", service: "Web" },
    { id: "api_call", name: "API Call", service: "External" },
    { id: "slack_message", name: "Slack Message", service: "Slack" },
  ];

  const actionOptions = [
    { id: "send_slack", name: "Send Slack Message", service: "Slack" },
    { id: "send_email", name: "Send Email", service: "Email" },
    { id: "create_task", name: "Create Task", service: "Task Manager" },
    { id: "run_model", name: "Run ML Model", service: "AI Tools" },
    { id: "update_database", name: "Update Database", service: "Database" },
  ];

  return (
    <BasicTierLayout pageTitle="Workflow Designer" requiredFeature="workflow-designer">
      <Tabs defaultValue="designer">
        <TabsList className="mb-4">
          <TabsTrigger value="designer">Designer</TabsTrigger>
          <TabsTrigger value="saved">Saved Workflows</TabsTrigger>
          <TabsTrigger value="runs">Execution History</TabsTrigger>
        </TabsList>

        <TabsContent value="designer">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Workflow Designer</CardTitle>
                      <CardDescription>Create automated workflows with triggers and actions</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </Button>
                      <Button>
                        <Play className="h-4 w-4 mr-2" />
                        Test Workflow
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Label htmlFor="workflow-name">Workflow Name</Label>
                    <Input id="workflow-name" placeholder="e.g., Data Processing Pipeline" className="mt-1" />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="workflow-description">Description (Optional)</Label>
                    <Input id="workflow-description" placeholder="Describe what this workflow does" className="mt-1" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-medium">Step 1: Choose a Trigger</h3>
                        <Badge>Required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Select what will start your workflow
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {triggerOptions.map((trigger) => (
                          <div 
                            key={trigger.id} 
                            className="border rounded-md p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{trigger.name}</p>
                                <p className="text-xs text-muted-foreground">{trigger.service}</p>
                              </div>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center my-4">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-medium">Step 2: Choose an Action</h3>
                        <Badge>Required</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Select what will happen when the trigger fires
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {actionOptions.map((action) => (
                          <div 
                            key={action.id} 
                            className="border rounded-md p-3 cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{action.name}</p>
                                <p className="text-xs text-muted-foreground">{action.service}</p>
                              </div>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center my-4">
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Workflow Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="schedule">Run Schedule</Label>
                      <select 
                        id="schedule" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option value="manual">Manual Trigger Only</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="error-handling">Error Handling</Label>
                      <select 
                        id="error-handling" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option value="continue">Continue on Error</option>
                        <option value="stop">Stop on Error</option>
                        <option value="retry">Retry (3 times)</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="timeout">Timeout (seconds)</Label>
                      <Input id="timeout" type="number" defaultValue={60} className="mt-1" />
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="notifications" 
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="notifications" className="ml-2 block text-sm">
                          Send notifications on completion
                        </Label>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="logging" 
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <Label htmlFor="logging" className="ml-2 block text-sm">
                          Enable detailed logging
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-base">Templates</CardTitle>
                  <CardDescription>Start with a pre-configured workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-left">
                      Data Processing Pipeline
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      Notification System
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      Report Generation
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      Model Training Workflow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Saved Workflows</CardTitle>
                  <CardDescription>Your team's automated workflows</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Workflow
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3">Name</th>
                      <th scope="col" className="px-4 py-3">Description</th>
                      <th scope="col" className="px-4 py-3">Last Run</th>
                      <th scope="col" className="px-4 py-3">Status</th>
                      <th scope="col" className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedWorkflows.map((workflow) => (
                      <tr key={workflow.id} className="border-b dark:border-gray-700">
                        <td className="px-4 py-3 font-medium">{workflow.name}</td>
                        <td className="px-4 py-3 max-w-xs truncate">{workflow.description}</td>
                        <td className="px-4 py-3">{workflow.lastRun}</td>
                        <td className="px-4 py-3">
                          <Badge variant={workflow.status === "Active" ? "default" : "secondary"}>
                            {workflow.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Run</Button>
                            <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
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

        <TabsContent value="runs">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>Recent workflow runs and their results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Workflow execution history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </BasicTierLayout>
  );
};

export default WorkflowDesigner;
