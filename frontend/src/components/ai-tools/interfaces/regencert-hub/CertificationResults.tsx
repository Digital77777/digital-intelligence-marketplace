
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgePercent, Link, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificationResultsProps {
  result: string;
}

const CertificationResults: React.FC<CertificationResultsProps> = ({ result }) => (
  <Card className="border-green-100 dark:border-green-700">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
        <Link className="h-5 w-5" />
        Blockchain Certification Result
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-lg p-4 border border-green-100 dark:border-green-800">
        <p className="text-green-900 dark:text-green-100">{result}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" className="border-green-200 dark:border-green-700">
          <Leaf className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default CertificationResults;
