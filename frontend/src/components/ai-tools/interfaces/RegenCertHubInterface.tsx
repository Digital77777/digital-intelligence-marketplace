
import React, { useState } from "react";
import RegenCertHubHeader from "./regencert-hub/RegenCertHubHeader";
import ProjectsSidebar from "./regencert-hub/ProjectsSidebar";
import CertificationForm from "./regencert-hub/CertificationForm";
import CertificationResults from "./regencert-hub/CertificationResults";

interface RegenCertHubInterfaceProps {
  onBack?: () => void;
}

const DEMO_PROJECTS = [
  { name: "Regen Wheat Initiative", region: "Kansas, USA", status: "certified", carbonCredits: 180, blockchain: "#0x8eB2", type: "On-Farm" },
  { name: "Agroforestry Carbon Pilot", region: "Brazil", status: "pending", carbonCredits: 0, blockchain: "-", type: "Agroforestry" },
  { name: "Dairy Carbon Plus", region: "Germany", status: "in review", carbonCredits: 60, blockchain: "#0xD4c7", type: "Livestock" },
];

const RegenCertHubInterface: React.FC<RegenCertHubInterfaceProps> = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [certType, setCertType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCertify = () => {
    if (!selectedProject || !certType || !projectDetails.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(
        `Certification for "${selectedProject}" as "${certType}" initiated. Details securely logged on blockchain. Carbon credit integration in progress.`
      );
      setLoading(false);
    }, 2900);
  };

  const handleReset = () => {
    setCertType("");
    setProjectDetails("");
    setResult(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/10 dark:via-emerald-900/10 dark:to-teal-900/10">
      <RegenCertHubHeader onBack={onBack} />

      <main className="flex-1 flex gap-6 p-6">
        <ProjectsSidebar
          projects={DEMO_PROJECTS}
          selectedProject={selectedProject}
          onSelectProject={setSelectedProject}
        />

        <div className="flex-1 space-y-6">
          <CertificationForm
            selectedProject={selectedProject}
            certType={certType}
            projectDetails={projectDetails}
            loading={loading}
            onCertTypeChange={setCertType}
            onProjectDetailsChange={setProjectDetails}
            onCertify={handleCertify}
            onReset={handleReset}
          />

          {result && <CertificationResults result={result} />}
        </div>
      </main>
    </div>
  );
};

export default RegenCertHubInterface;
