
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Repeat, Zap } from 'lucide-react';

interface SchedulingConfig {
  enabled: boolean;
  type: 'once' | 'recurring' | 'trigger';
  schedule: string;
  timezone: string;
  conditions?: string[];
}

interface SchedulingPanelProps {
  config: SchedulingConfig;
  onChange: (config: SchedulingConfig) => void;
}

const SchedulingPanel: React.FC<SchedulingPanelProps> = ({ config, onChange }) => {
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>(config.conditions || []);

  const updateConfig = (updates: Partial<SchedulingConfig>) => {
    onChange({ ...config, ...updates });
  };

  const availableTriggers = [
    { id: 'api-webhook', name: 'API Webhook', description: 'Trigger via webhook endpoint' },
    { id: 'file-upload', name: 'File Upload', description: 'When new file is uploaded' },
    { id: 'model-completion', name: 'Model Completion', description: 'When AI model finishes processing' },
    { id: 'data-threshold', name: 'Data Threshold', description: 'When data meets criteria' },
    { id: 'time-based', name: 'Time Based', description: 'Schedule based execution' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Scheduling & Automation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Enable Scheduling</h4>
            <p className="text-sm text-gray-600">Automatically run this workflow</p>
          </div>
          <Switch
            checked={config.enabled}
            onCheckedChange={(enabled) => updateConfig({ enabled })}
          />
        </div>

        {config.enabled && (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Execution Type</label>
                <Select
                  value={config.type}
                  onValueChange={(type) => updateConfig({ type: type as SchedulingConfig['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Run Once</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="trigger">Event Triggered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.type === 'recurring' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Schedule (Cron Expression)</label>
                    <Input
                      placeholder="0 9 * * 1-5 (weekdays at 9 AM)"
                      value={config.schedule}
                      onChange={(e) => updateConfig({ schedule: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Common patterns: "0 */6 * * *" (every 6 hours), "0 9 * * MON" (Mondays at 9 AM)
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Timezone</label>
                    <Select
                      value={config.timezone}
                      onValueChange={(timezone) => updateConfig({ timezone })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                        <SelectItem value="Europe/Paris">Paris</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {config.type === 'trigger' && (
                <div>
                  <label className="text-sm font-medium mb-3 block">Available Triggers</label>
                  <div className="space-y-2">
                    {availableTriggers.map((trigger) => (
                      <div
                        key={trigger.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedTriggers.includes(trigger.id)
                            ? 'border-[#6AC8FF] bg-[#6AC8FF]/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          const newTriggers = selectedTriggers.includes(trigger.id)
                            ? selectedTriggers.filter(t => t !== trigger.id)
                            : [...selectedTriggers, trigger.id];
                          setSelectedTriggers(newTriggers);
                          updateConfig({ conditions: newTriggers });
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-sm">{trigger.name}</h5>
                            <p className="text-xs text-gray-600">{trigger.description}</p>
                          </div>
                          {selectedTriggers.includes(trigger.id) && (
                            <Badge className="bg-[#6AC8FF] text-gray-900">
                              <Zap className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Execution Summary
              </h5>
              <div className="text-sm text-gray-600">
                {config.type === 'once' && <p>This workflow will run once when manually triggered.</p>}
                {config.type === 'recurring' && config.schedule && (
                  <p>This workflow will run on schedule: <code className="bg-white px-1 rounded">{config.schedule}</code></p>
                )}
                {config.type === 'trigger' && selectedTriggers.length > 0 && (
                  <p>This workflow will run when triggered by: {selectedTriggers.join(', ')}</p>
                )}
                {config.type === 'trigger' && selectedTriggers.length === 0 && (
                  <p className="text-yellow-600">Please select at least one trigger condition.</p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SchedulingPanel;
