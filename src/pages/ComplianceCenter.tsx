
import React, { useState } from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  FileText,
  Download,
  Settings,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Info,
  RefreshCw,
  Eye,
  Lock,
  FileBarChart,
  FileCog,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const ComplianceCenter = () => {
  const [complianceScore, setComplianceScore] = useState(87);
  
  const handleRunCheck = () => {
    toast.success("Compliance check initiated", {
      description: "The check will run in the background and update your dashboard."
    });
  };
  
  const handleExportReport = () => {
    toast.success("Report is being generated", {
      description: "Your compliance report will be ready for download shortly."
    });
  };

  return (
    <ProTierLayout pageTitle="Compliance Center" requiredFeature="compliance-center">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">AI Compliance Dashboard</h2>
            <p className="text-indigo-200">Monitor and ensure compliance with industry regulations and standards</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-indigo-950/50 border-indigo-900 text-indigo-100 hover:bg-indigo-900/70" onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button className="bg-[#6AC8FF] hover:bg-[#5BB8EF] text-indigo-950" onClick={handleRunCheck}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Compliance Check
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <Card className="bg-indigo-950/40 border-indigo-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Compliance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-indigo-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6AC8FF] to-indigo-600 rounded-full" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${100 - complianceScore}%, 0 ${100 - complianceScore}%)` }}></div>
                  <div className="z-10 text-3xl font-bold text-white">{complianceScore}%</div>
                </div>
                <p className="mt-3 text-center text-sm text-indigo-200">
                  {complianceScore >= 90 ? 'Excellent' : complianceScore >= 80 ? 'Good' : complianceScore >= 70 ? 'Fair' : 'Needs Improvement'}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-950/40 border-indigo-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Compliance Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-[#6AC8FF] mr-2" />
                    <span className="text-white">GDPR</span>
                  </div>
                  <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/50 border-green-800/50">
                    92% Compliant
                  </Badge>
                </div>
                <Separator className="bg-indigo-900/50" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-[#6AC8FF] mr-2" />
                    <span className="text-white">HIPAA</span>
                  </div>
                  <Badge className="bg-amber-900/30 text-amber-400 hover:bg-amber-900/50 border-amber-800/50">
                    85% Compliant
                  </Badge>
                </div>
                <Separator className="bg-indigo-900/50" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-[#6AC8FF] mr-2" />
                    <span className="text-white">CCPA</span>
                  </div>
                  <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/50 border-green-800/50">
                    95% Compliant
                  </Badge>
                </div>
                <Separator className="bg-indigo-900/50" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShieldCheck className="h-4 w-4 text-[#6AC8FF] mr-2" />
                    <span className="text-white">AI Ethics</span>
                  </div>
                  <Badge className="bg-amber-900/30 text-amber-400 hover:bg-amber-900/50 border-amber-800/50">
                    82% Compliant
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-950/40 border-indigo-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Urgent Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Data retention policy needs review</p>
                    <p className="text-xs text-indigo-300">GDPR compliance risk</p>
                  </div>
                </div>
                <Separator className="bg-indigo-900/50" />
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Missing data processing agreement</p>
                    <p className="text-xs text-indigo-300">High priority - Legal requirement</p>
                  </div>
                </div>
                <Separator className="bg-indigo-900/50" />
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 flex-shrink-0 text-indigo-400 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Audit trail improvements needed</p>
                    <p className="text-xs text-indigo-300">Medium priority - Best practice</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-indigo-950/60 border border-indigo-900/50">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="regulations" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Regulations
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card className="bg-indigo-950/40 border-indigo-900/50">
              <CardHeader>
                <CardTitle className="text-white">Compliance Overview</CardTitle>
                <CardDescription className="text-indigo-200">
                  Summary of your organization's compliance status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-indigo-200">Data Privacy</span>
                      <span className="text-sm text-indigo-200">92%</span>
                    </div>
                    <Progress value={92} className="h-2 bg-indigo-900/50" indicatorClassName="bg-[#6AC8FF]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-indigo-200">AI Ethics</span>
                      <span className="text-sm text-indigo-200">82%</span>
                    </div>
                    <Progress value={82} className="h-2 bg-indigo-900/50" indicatorClassName="bg-purple-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-indigo-200">Security Controls</span>
                      <span className="text-sm text-indigo-200">95%</span>
                    </div>
                    <Progress value={95} className="h-2 bg-indigo-900/50" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-indigo-200">Documentation</span>
                      <span className="text-sm text-indigo-200">78%</span>
                    </div>
                    <Progress value={78} className="h-2 bg-indigo-900/50" indicatorClassName="bg-amber-500" />
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium text-white mb-3">Recent Compliance Activities</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-indigo-900/30 p-3 rounded-md">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white text-sm">Data processing impact assessment completed</p>
                        <div className="flex items-center text-xs text-indigo-300 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>2 days ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-indigo-900/30 p-3 rounded-md">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <div>
                        <p className="text-white text-sm">Privacy policy updated and published</p>
                        <div className="flex items-center text-xs text-indigo-300 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>1 week ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-indigo-900/30 p-3 rounded-md">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                      <div>
                        <p className="text-white text-sm">Audit identified gaps in data minimization practices</p>
                        <div className="flex items-center text-xs text-indigo-300 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-indigo-950/20 border-t border-indigo-900/50 py-3 px-6">
                <div className="flex items-center gap-2 text-sm text-indigo-200">
                  <RefreshCw className="h-4 w-4" />
                  <span>Last updated: Today at 10:45 AM</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="regulations">
            <Card className="bg-indigo-950/40 border-indigo-900/50">
              <CardHeader>
                <CardTitle className="text-white">Applicable Regulations</CardTitle>
                <CardDescription className="text-indigo-200">
                  Regulations and standards applicable to your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Card className="bg-indigo-900/30 border-indigo-800/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg text-white">GDPR</CardTitle>
                        <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/50 border-green-800/50 self-start">
                          Active
                        </Badge>
                      </div>
                      <CardDescription className="text-indigo-200">General Data Protection Regulation</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">Data processing agreements in place</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">Consent mechanisms implemented</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <span className="text-sm text-indigo-200">Data retention policy needs review</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex gap-2">
                      <Button variant="outline" size="sm" className="text-indigo-200 border-indigo-800/70 hover:bg-indigo-800/50">
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-[#6AC8FF]/80 hover:bg-[#6AC8FF] text-indigo-950">
                        <FileText className="mr-1 h-3.5 w-3.5" />
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-indigo-900/30 border-indigo-800/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg text-white">HIPAA</CardTitle>
                        <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/50 border-green-800/50 self-start">
                          Active
                        </Badge>
                      </div>
                      <CardDescription className="text-indigo-200">Health Insurance Portability and Accountability Act</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">Security measures implemented</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">ePHI access controls in place</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <span className="text-sm text-indigo-200">Audit trails need improvement</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex gap-2">
                      <Button variant="outline" size="sm" className="text-indigo-200 border-indigo-800/70 hover:bg-indigo-800/50">
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-[#6AC8FF]/80 hover:bg-[#6AC8FF] text-indigo-950">
                        <FileText className="mr-1 h-3.5 w-3.5" />
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-indigo-900/30 border-indigo-800/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg text-white">CCPA</CardTitle>
                        <Badge className="bg-green-900/30 text-green-400 hover:bg-green-900/50 border-green-800/50 self-start">
                          Active
                        </Badge>
                      </div>
                      <CardDescription className="text-indigo-200">California Consumer Privacy Act</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">Privacy notices updated</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">Right to access mechanisms in place</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">Opt-out processes implemented</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex gap-2">
                      <Button variant="outline" size="sm" className="text-indigo-200 border-indigo-800/70 hover:bg-indigo-800/50">
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-[#6AC8FF]/80 hover:bg-[#6AC8FF] text-indigo-950">
                        <FileText className="mr-1 h-3.5 w-3.5" />
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-indigo-900/30 border-indigo-800/50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg text-white">AI Ethics Framework</CardTitle>
                        <Badge className="bg-amber-900/30 text-amber-400 hover:bg-amber-900/50 border-amber-800/50 self-start">
                          In Progress
                        </Badge>
                      </div>
                      <CardDescription className="text-indigo-200">Ethical AI Development Guidelines</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">Bias detection implemented</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-indigo-200">Transparency documentation created</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <span className="text-sm text-indigo-200">Human oversight protocols incomplete</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex gap-2">
                      <Button variant="outline" size="sm" className="text-indigo-200 border-indigo-800/70 hover:bg-indigo-800/50">
                        <Eye className="mr-1 h-3.5 w-3.5" />
                        View Details
                      </Button>
                      <Button size="sm" className="bg-[#6AC8FF]/80 hover:bg-[#6AC8FF] text-indigo-950">
                        <FileText className="mr-1 h-3.5 w-3.5" />
                        View Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-indigo-950/40 border-indigo-900/50">
              <CardHeader>
                <CardTitle className="text-white">Compliance Reports</CardTitle>
                <CardDescription className="text-indigo-200">
                  Generate and review compliance documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-indigo-900/30 rounded-md p-4">
                    <FileBarChart className="h-10 w-10 text-[#6AC8FF]" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">GDPR Compliance Report</h3>
                      <p className="text-sm text-indigo-200">Comprehensive analysis of GDPR compliance status</p>
                      <div className="flex items-center text-xs text-indigo-300 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last generated: May 10, 2023</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#6AC8FF] hover:bg-[#5BB8EF] text-indigo-950">
                      <Download className="mr-1 h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-indigo-900/30 rounded-md p-4">
                    <FileCog className="h-10 w-10 text-[#6AC8FF]" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">HIPAA Security Assessment</h3>
                      <p className="text-sm text-indigo-200">Detailed evaluation of HIPAA security controls</p>
                      <div className="flex items-center text-xs text-indigo-300 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last generated: April 15, 2023</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#6AC8FF] hover:bg-[#5BB8EF] text-indigo-950">
                      <Download className="mr-1 h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-indigo-900/30 rounded-md p-4">
                    <FileText className="h-10 w-10 text-[#6AC8FF]" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">AI Ethics Audit</h3>
                      <p className="text-sm text-indigo-200">Analysis of AI systems against ethical guidelines</p>
                      <div className="flex items-center text-xs text-indigo-300 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last generated: June 2, 2023</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#6AC8FF] hover:bg-[#5BB8EF] text-indigo-950">
                      <Download className="mr-1 h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full bg-indigo-900/50 hover:bg-indigo-900/70 text-white">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Generate New Compliance Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-indigo-950/40 border-indigo-900/50">
              <CardHeader>
                <CardTitle className="text-white">Compliance Settings</CardTitle>
                <CardDescription className="text-indigo-200">
                  Configure compliance monitoring and notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Automated Compliance Checks</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-indigo-300" />
                        <span className="text-white">Weekly compliance scans</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#6AC8FF]" />
                        <span className="ml-2 text-indigo-200">Enabled</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-indigo-300" />
                        <span className="text-white">Real-time violation alerts</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#6AC8FF]" />
                        <span className="ml-2 text-indigo-200">Enabled</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-indigo-300" />
                        <span className="text-white">Monthly compliance reports</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#6AC8FF]" />
                        <span className="ml-2 text-indigo-200">Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-indigo-900/50" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Notification Settings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-indigo-300" />
                        <span className="text-white">Critical compliance alerts</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#6AC8FF]" />
                        <span className="ml-2 text-indigo-200">Email & Slack</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-indigo-300" />
                        <span className="text-white">Improvement recommendations</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#6AC8FF]" />
                        <span className="ml-2 text-indigo-200">Email only</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-indigo-300" />
                        <span className="text-white">Scheduled reports</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#6AC8FF]" />
                        <span className="ml-2 text-indigo-200">Email only</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button className="bg-[#6AC8FF] hover:bg-[#5BB8EF] text-indigo-950">
                    <Settings className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProTierLayout>
  );
};

export default ComplianceCenter;
