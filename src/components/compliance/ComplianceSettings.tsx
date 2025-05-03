
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from 'lucide-react';

const ComplianceSettings = () => {
  return (
    <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
      <CardHeader>
        <CardTitle>Compliance Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Standards & Regulations</h3>
          
          <div className="space-y-4">
            {[
              { id: "gdpr", name: "GDPR", enabled: true },
              { id: "hipaa", name: "HIPAA", enabled: true },
              { id: "soc2", name: "SOC 2", enabled: true },
              { id: "pci", name: "PCI DSS", enabled: false },
              { id: "iso27001", name: "ISO 27001", enabled: false },
              { id: "ccpa", name: "CCPA", enabled: false },
            ].map(standard => (
              <div key={standard.id} className="flex items-center justify-between border-b border-indigo-800/30 pb-3">
                <div>
                  <h4 className="font-medium">{standard.name}</h4>
                  <p className="text-sm text-indigo-300">Enable compliance monitoring for {standard.name}</p>
                </div>
                <Switch checked={standard.enabled} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-indigo-300">Scan Frequency</label>
              <Select defaultValue="weekly">
                <SelectTrigger className="bg-indigo-900/30 border-indigo-800 text-indigo-100">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-indigo-300">Alert Threshold</label>
              <Select defaultValue="critical">
                <SelectTrigger className="bg-indigo-900/30 border-indigo-800 text-indigo-100">
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  <SelectItem value="high">High & Critical</SelectItem>
                  <SelectItem value="critical">Critical Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4 mt-4">
            {[
              { id: "email", name: "Email Notifications", enabled: true },
              { id: "dashboard", name: "Dashboard Alerts", enabled: true },
              { id: "slack", name: "Slack Integration", enabled: false },
              { id: "teams", name: "Microsoft Teams", enabled: false },
            ].map(notification => (
              <div key={notification.id} className="flex items-center justify-between border-b border-indigo-800/30 pb-3">
                <div>
                  <h4 className="font-medium">{notification.name}</h4>
                  <p className="text-sm text-indigo-300">Receive alerts through {notification.name.toLowerCase()}</p>
                </div>
                <Switch checked={notification.enabled} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Save className="h-4 w-4 mr-1.5" /> Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceSettings;
