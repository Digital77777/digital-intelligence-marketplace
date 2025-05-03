
import React from 'react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, AlertTriangle, FileDown, Shield } from 'lucide-react';
import ComplianceChecklist from '@/components/compliance/ComplianceChecklist';
import ComplianceReport from '@/components/compliance/ComplianceReport';
import ComplianceSettings from '@/components/compliance/ComplianceSettings';

const ComplianceCenter = () => {
  return (
    <ProTierLayout pageTitle="Compliance Center" requiredFeature="compliance-center">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <p className="text-white/80">
            Monitor and manage your organization's compliance with industry standards and regulations.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-indigo-900/30 border-indigo-800 text-indigo-100 hover:bg-indigo-800/50">
              <FileDown className="h-4 w-4 mr-1.5" /> Export Report
            </Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Shield className="h-4 w-4 mr-1.5" /> Run Compliance Scan
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ComplianceStatusCard 
            title="GDPR" 
            status="Compliant" 
            score={92} 
            lastScan="Today"
            issues={2}
          />
          
          <ComplianceStatusCard 
            title="HIPAA" 
            status="Action Needed" 
            score={78} 
            lastScan="Yesterday"
            issues={5}
          />
          
          <ComplianceStatusCard 
            title="SOC 2" 
            status="Compliant" 
            score={96} 
            lastScan="3 days ago"
            issues={0}
          />
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-indigo-950/60 border border-indigo-900/50 mb-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Overview
            </TabsTrigger>
            <TabsTrigger value="checklist" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Checklist
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-indigo-900/60 data-[state=active]:text-white text-indigo-200">
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
              <CardHeader>
                <CardTitle>Compliance Issues</CardTitle>
                <CardDescription className="text-indigo-200">
                  Critical issues that need immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-indigo-800/50 hover:bg-indigo-900/20">
                      <TableHead className="text-indigo-200">Issue</TableHead>
                      <TableHead className="text-indigo-200">Regulation</TableHead>
                      <TableHead className="text-indigo-200">Risk Level</TableHead>
                      <TableHead className="text-indigo-200">Detected</TableHead>
                      <TableHead className="text-indigo-200">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { 
                        issue: "Missing data retention policy", 
                        regulation: "GDPR", 
                        riskLevel: "High", 
                        detected: "2 days ago",
                        status: "Open"
                      },
                      { 
                        issue: "Incomplete access controls", 
                        regulation: "HIPAA", 
                        riskLevel: "Critical", 
                        detected: "Yesterday",
                        status: "In Progress"
                      },
                      { 
                        issue: "Unencrypted data storage", 
                        regulation: "HIPAA", 
                        riskLevel: "Critical", 
                        detected: "1 week ago",
                        status: "Open"
                      },
                    ].map((issue, index) => (
                      <TableRow key={index} className="border-indigo-800/50 hover:bg-indigo-900/20">
                        <TableCell className="font-medium text-white">{issue.issue}</TableCell>
                        <TableCell>
                          <Badge className="bg-indigo-900/30 border-indigo-800/50 text-indigo-300">
                            {issue.regulation}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`
                            ${issue.riskLevel === 'Critical' ? 'bg-red-900/30 text-red-400 border-red-800/50' : ''}
                            ${issue.riskLevel === 'High' ? 'bg-amber-900/30 text-amber-400 border-amber-800/50' : ''}
                            ${issue.riskLevel === 'Medium' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50' : ''}
                            ${issue.riskLevel === 'Low' ? 'bg-green-900/30 text-green-400 border-green-800/50' : ''}
                          `}>
                            {issue.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-indigo-200">{issue.detected}</TableCell>
                        <TableCell>
                          <Badge className={`
                            ${issue.status === 'Open' ? 'bg-red-900/30 text-red-400 border-red-800/50' : ''}
                            ${issue.status === 'In Progress' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50' : ''}
                            ${issue.status === 'Resolved' ? 'bg-green-900/30 text-green-400 border-green-800/50' : ''}
                          `}>
                            {issue.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="checklist" className="mt-0">
            <ComplianceChecklist />
          </TabsContent>
          
          <TabsContent value="reports" className="mt-0">
            <ComplianceReport />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <ComplianceSettings />
          </TabsContent>
        </Tabs>
      </div>
    </ProTierLayout>
  );
};

const ComplianceStatusCard = ({ title, status, score, lastScan, issues }: { 
  title: string; 
  status: string; 
  score: number;
  lastScan: string;
  issues: number;
}) => {
  const isCompliant = status === 'Compliant';
  
  return (
    <Card className="bg-indigo-950/40 border-indigo-900/50 text-white overflow-hidden">
      <div className={`h-1.5 w-full ${isCompliant ? 'bg-green-500' : 'bg-amber-500'}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={`
            ${isCompliant 
              ? 'bg-green-900/30 text-green-400 border-green-800/50' 
              : 'bg-amber-900/30 text-amber-400 border-amber-800/50'
            }
          `}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center 
              ${isCompliant 
                ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                : 'bg-amber-900/30 text-amber-400 border border-amber-800/50'
              }
            `}>
              {isCompliant ? (
                <Check className="h-6 w-6" />
              ) : (
                <AlertTriangle className="h-6 w-6" />
              )}
            </div>
            <div className="ml-3">
              <div className="text-2xl font-bold">{score}%</div>
              <div className="text-xs text-indigo-300">Compliance Score</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              {issues} {issues === 1 ? 'issue' : 'issues'} detected
            </div>
            <div className="text-xs text-indigo-300">Last scan: {lastScan}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceCenter;
