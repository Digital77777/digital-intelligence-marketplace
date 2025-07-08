
import React, { useState } from "react";
import CloudBridgeHeader from "./cloud-bridge/CloudBridgeHeader";
import CloudProvidersSidebar from "./cloud-bridge/CloudProvidersSidebar";
import IntegrationForm from "./cloud-bridge/IntegrationForm";
import IntegrationResults from "./cloud-bridge/IntegrationResults";

interface CloudBridgeAIInterfaceProps {
  onBack?: () => void;
}

const DEMO_PROVIDERS = [
  { name: "AWS Services", type: "Cloud Computing", status: "connected", region: "us-east-1" },
  { name: "Google Cloud", type: "Machine Learning", status: "pending", region: "us-central1" },
  { name: "Azure Cognitive", type: "AI Services", status: "disconnected", region: "eastus" }
];

const CloudBridgeAIInterface: React.FC<CloudBridgeAIInterfaceProps> = ({ onBack }) => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [serviceEndpoint, setServiceEndpoint] = useState("");
  const [configData, setConfigData] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleIntegrate = async () => {
    if (!selectedProvider || !serviceEndpoint.trim() || !configData.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setResult(`Cloud integration "${selectedProvider}" successfully configured. Endpoint "${serviceEndpoint}" is now accessible with secure authentication. Auto-scaling enabled with 99.9% uptime guarantee. Ready for production workloads.`);
      setLoading(false);
    }, 3200);
  };

  const handleReset = () => {
    setServiceEndpoint("");
    setConfigData("");
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-indigo-900/20">
      <CloudBridgeHeader onBack={onBack} />

      <main className="flex-1 flex gap-6 p-6">
        <CloudProvidersSidebar
          providers={DEMO_PROVIDERS}
          selectedProvider={selectedProvider}
          onSelectProvider={setSelectedProvider}
        />

        <div className="flex-1 space-y-6">
          <IntegrationForm
            selectedProvider={selectedProvider}
            serviceEndpoint={serviceEndpoint}
            configData={configData}
            loading={loading}
            onServiceEndpointChange={setServiceEndpoint}
            onConfigDataChange={setConfigData}
            onIntegrate={handleIntegrate}
            onReset={handleReset}
          />

          {result && <IntegrationResults result={result} />}
        </div>
      </main>
    </div>
  );
};

export default CloudBridgeAIInterface;
