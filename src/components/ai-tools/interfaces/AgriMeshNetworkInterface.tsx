import React, { useState, useEffect } from "react";
import { Server, Wifi, Globe, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const networkStats = [
  { label: "Connected Devices", value: 128, icon: Wifi },
  { label: "Network Uptime", value: "99.98%", icon: Server },
  { label: "Active Regions", value: 12, icon: Globe },
  { label: "User Accounts", value: 256, icon: Users },
];

const AgriMeshNetworkInterface: React.FC = () => {
  const [networkData, setNetworkData] = useState<any>(null);

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        // Replace with actual API endpoint for Hyperledger Fabric
        const response = await fetch('/api/agri-mesh-network-data');
        const data = await response.json();
        setNetworkData(data);
      } catch (error) {
        console.error('Failed to fetch network data:', error);
      }
    };

    fetchNetworkData();
  }, []);

  const configureMeshNode = async () => {
    // Placeholder function for configuring mesh node
    console.log('Configuring mesh node with Hyperledger Fabric...');
  };

  const viewNetworkMap = async () => {
    // Placeholder function for viewing network map
    console.log('Viewing network map with GeoPandas...');
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-blue-50 via-violet-50 to-white dark:from-blue-950 dark:to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-2">
          AgriMesh Network Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          Real-time insights, management, and monitoring of your AgriMesh Network infrastructure.
        </p>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {networkStats.map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-4 py-5">
                <div className="bg-blue-100 dark:bg-blue-900/60 rounded-full p-3">
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-blue-900 dark:text-blue-100">{value}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="default" className="bg-blue-700 text-white" onClick={configureMeshNode}>
            Configure Mesh Node
          </Button>
          <Button variant="outline" className="border-blue-600 text-blue-700 dark:border-blue-300 dark:text-blue-200" onClick={viewNetworkMap}>
            Network Map
          </Button>
          <Button variant="ghost">Support</Button>
        </div>
        {/* Network Map or Status Section Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">Live Network Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            (This section will soon feature a live mesh map and in-depth analytics.)
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-200">
            <li>Monitor device connectivity and signal strength across your operation</li>
            <li>View geographical deployment and real-time alerts</li>
            <li>Manage users, regions, and nodes from a unified dashboard</li>
            <li>Enterprise-grade reliability with live status updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgriMeshNetworkInterface;
