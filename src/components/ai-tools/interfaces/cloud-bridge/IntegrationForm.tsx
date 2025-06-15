
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Cloud, RefreshCw } from "lucide-react";

interface IntegrationFormProps {
  selectedProvider: string;
  serviceEndpoint: string;
  configData: string;
  loading: boolean;
  onServiceEndpointChange: (value: string) => void;
  onConfigDataChange: (value: string) => void;
  onIntegrate: () => void;
  onReset: () => void;
}

const IntegrationForm: React.FC<IntegrationFormProps> = ({
  selectedProvider,
  serviceEndpoint,
  configData,
  loading,
  onServiceEndpointChange,
  onConfigDataChange,
  onIntegrate,
  onReset,
}) => {
  return (
    <Card className="border-blue-100 dark:border-blue-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
          <Cloud className="h-5 w-5" />
          Cloud Integration Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="provider">Selected Provider</Label>
          <Input
            id="provider"
            value={selectedProvider || "Select a cloud provider"}
            readOnly
            className="bg-gray-50 dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endpoint">Service Endpoint</Label>
          <Input
            id="endpoint"
            value={serviceEndpoint}
            onChange={(e) => onServiceEndpointChange(e.target.value)}
            placeholder="https://api.cloudservice.com/v1/..."
            disabled={!selectedProvider}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="config">Configuration Data</Label>
          <Textarea
            id="config"
            value={configData}
            onChange={(e) => onConfigDataChange(e.target.value)}
            placeholder="Enter JSON configuration, API keys, or connection parameters..."
            className="min-h-[120px]"
            disabled={!selectedProvider}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={onIntegrate}
            disabled={!selectedProvider || !serviceEndpoint.trim() || !configData.trim() || loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Integrating...
              </>
            ) : (
              <>
                <Cloud className="mr-2 h-4 w-4" />
                Integrate Service
              </>
            )}
          </Button>
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationForm;
