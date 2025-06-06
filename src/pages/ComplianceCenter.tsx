
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Clock, Eye, Download } from 'lucide-react';
import ProTierLayout from '@/components/layouts/ProTierLayout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ActivityLog {
  id: string;
  action: string;
  table_name: string;
  timestamp: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
}

interface ComplianceMetric {
  name: string;
  status: 'compliant' | 'warning' | 'non-compliant';
  score: number;
  description: string;
  lastChecked: string;
}

const ComplianceCenterPage = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;
      setActivityLogs(data || []);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      toast({
        title: "Error",
        description: "Failed to load activity logs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Sample compliance metrics for demonstration
  const complianceMetrics: ComplianceMetric[] = [
    {
      name: 'GDPR Compliance',
      status: 'compliant',
      score: 95,
      description: 'Data protection and privacy regulations',
      lastChecked: '2024-01-15T10:30:00Z'
    },
    {
      name: 'Data Encryption',
      status: 'compliant',
      score: 98,
      description: 'All sensitive data is properly encrypted',
      lastChecked: '2024-01-15T09:15:00Z'
    },
    {
      name: 'Access Controls',
      status: 'warning',
      score: 78,
      description: 'User access permissions and authentication',
      lastChecked: '2024-01-15T08:45:00Z'
    },
    {
      name: 'Audit Logging',
      status: 'compliant',
      score: 92,
      description: 'System activity monitoring and logging',
      lastChecked: '2024-01-15T10:00:00Z'
    },
    {
      name: 'Data Backup',
      status: 'non-compliant',
      score: 65,
      description: 'Regular data backup and recovery procedures',
      lastChecked: '2024-01-14T23:30:00Z'
    }
  ];

  const getStatusIcon = (status: ComplianceMetric['status']) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'non-compliant':
        return <Shield className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: ComplianceMetric['status']) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'non-compliant':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const overallScore = Math.round(complianceMetrics.reduce((sum, metric) => sum + metric.score, 0) / complianceMetrics.length);

  const logActivity = async (action: string, tableName?: string) => {
    try {
      await supabase
        .from('activity_logs')
        .insert([{
          action,
          table_name: tableName || null,
          ip_address: '192.168.1.1', // This would come from the request in a real implementation
          user_agent: navigator.userAgent
        }]);

      // Refresh logs after adding new one
      fetchActivityLogs();
      
      toast({
        title: "Activity Logged",
        description: `Action "${action}" has been recorded`,
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  if (loading) {
    return (
      <ProTierLayout pageTitle="Compliance Center" requiredFeature="compliance-center">
        <div className="flex items-center justify-center h-64">Loading compliance data...</div>
      </ProTierLayout>
    );
  }

  return (
    <ProTierLayout pageTitle="Compliance Center" requiredFeature="compliance-center">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
            <p className="text-gray-600">Monitor and maintain regulatory compliance</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => logActivity('compliance_audit_viewed')}>
              <Eye className="w-4 h-4 mr-2" />
              View Audit
            </Button>
            <Button onClick={() => logActivity('compliance_report_exported')}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overall Compliance Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Overall Compliance Score</span>
            </CardTitle>
            <CardDescription>Your current compliance status across all regulations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Compliance Score</span>
                  <span className={`text-sm font-bold ${getScoreColor(overallScore)}`}>
                    {overallScore}%
                  </span>
                </div>
                <Progress value={overallScore} className="h-3" />
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}%
                </div>
                <Badge className={getStatusColor(overallScore >= 90 ? 'compliant' : overallScore >= 70 ? 'warning' : 'non-compliant')}>
                  {overallScore >= 90 ? 'Compliant' : overallScore >= 70 ? 'Needs Attention' : 'Non-Compliant'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity Logs</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(metric.status)}
                        <CardTitle className="text-lg">{metric.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <CardDescription>{metric.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Score</span>
                        <span className={`text-lg font-bold ${getScoreColor(metric.score)}`}>
                          {metric.score}%
                        </span>
                      </div>
                      <Progress value={metric.score} className="h-2" />
                      <div className="text-xs text-gray-500">
                        Last checked: {new Date(metric.lastChecked).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>System activity and audit trail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLogs.length > 0 ? (
                    activityLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div>
                            <p className="font-medium">{log.action}</p>
                            {log.table_name && (
                              <p className="text-sm text-gray-600">Table: {log.table_name}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                          {log.ip_address && (
                            <p className="text-xs text-gray-500">IP: {log.ip_address}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No activity logs found.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => logActivity('test_activity_log')}
                        className="mt-2"
                      >
                        Generate Test Log
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Protection Policies</CardTitle>
                  <CardDescription>GDPR and privacy compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Data Retention Policy</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Consent Management</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Right to be Forgotten</span>
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Policies</CardTitle>
                  <CardDescription>Access control and security measures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Multi-Factor Authentication</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Password Policy</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Session Management</span>
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProTierLayout>
  );
};

export default ComplianceCenterPage;
