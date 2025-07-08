
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BadgePercent, RefreshCw } from "lucide-react";

interface CertificationFormProps {
  selectedProject: string;
  certType: string;
  projectDetails: string;
  loading: boolean;
  onCertTypeChange: (value: string) => void;
  onProjectDetailsChange: (value: string) => void;
  onCertify: () => void;
  onReset: () => void;
}

const CertificationForm: React.FC<CertificationFormProps> = ({
  selectedProject,
  certType,
  projectDetails,
  loading,
  onCertTypeChange,
  onProjectDetailsChange,
  onCertify,
  onReset,
}) => {
  return (
    <Card className="border-green-100 dark:border-green-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
          <BadgePercent className="h-5 w-5" />
          Certification Workflow
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project">Selected Project</Label>
          <Input
            id="project"
            value={selectedProject || "Select a regen project"}
            readOnly
            className="bg-gray-50 dark:bg-gray-800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certType">Certification Type</Label>
          <Input
            id="certType"
            value={certType}
            onChange={(e) => onCertTypeChange(e.target.value)}
            placeholder="e.g., Carbon Plus, Biodiversity, Verified Regen..."
            disabled={!selectedProject}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectDetails">Project Details</Label>
          <Textarea
            id="projectDetails"
            value={projectDetails}
            onChange={(e) => onProjectDetailsChange(e.target.value)}
            placeholder="Describe practices, audit data, GPS location, protocols, blockchain wallet, etc."
            className="min-h-[120px]"
            disabled={!selectedProject}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            onClick={onCertify}
            disabled={!selectedProject || !certType.trim() || !projectDetails.trim() || loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Certifying...
              </>
            ) : (
              <>
                <BadgePercent className="mr-2 h-4 w-4" />
                Certify & Log on Blockchain
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

export default CertificationForm;
