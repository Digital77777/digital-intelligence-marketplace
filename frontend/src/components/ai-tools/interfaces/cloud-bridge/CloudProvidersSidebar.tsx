
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Provider {
  name: string;
  type: string;
  status: string;
  region: string;
}

interface CloudProvidersSidebarProps {
  providers: Provider[];
  selectedProvider: string;
  onSelectProvider: (provider: string) => void;
}

const CloudProvidersSidebar: React.FC<CloudProvidersSidebarProps> = ({
  providers,
  selectedProvider,
  onSelectProvider,
}) => {
  return (
    <div className="w-80 space-y-4">
      <Card className="border-blue-100 dark:border-blue-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-900 dark:text-blue-100 text-lg">
            Cloud Providers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {providers.map((provider, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedProvider === provider.name
                  ? "border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/50"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700"
              }`}
              onClick={() => onSelectProvider(provider.name)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{provider.name}</h4>
                <Badge variant={provider.status === "connected" ? "default" : provider.status === "pending" ? "secondary" : "outline"}>
                  {provider.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Type: {provider.type}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Region: {provider.region}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CloudProvidersSidebar;
