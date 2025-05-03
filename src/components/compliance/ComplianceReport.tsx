
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileDown, Eye, BarChart3 } from 'lucide-react';

const reports = [
  {
    id: "RPT-2025-042",
    title: "GDPR Quarterly Assessment",
    date: "May 1, 2025",
    compliance: "96%",
    standard: "GDPR",
    status: "Completed"
  },
  {
    id: "RPT-2025-039",
    title: "HIPAA Security Review",
    date: "April 15, 2025",
    compliance: "82%",
    standard: "HIPAA",
    status: "Completed"
  },
  {
    id: "RPT-2025-037",
    title: "SOC 2 Audit Preparation",
    date: "April 1, 2025",
    compliance: "89%",
    standard: "SOC 2",
    status: "Completed"
  },
  {
    id: "RPT-2025-033",
    title: "PCI DSS Assessment",
    date: "March 20, 2025",
    compliance: "94%",
    standard: "PCI DSS",
    status: "Completed"
  },
  {
    id: "RPT-2025-028",
    title: "ISO 27001 Gap Analysis",
    date: "March 5, 2025",
    compliance: "78%",
    standard: "ISO 27001",
    status: "Completed"
  }
];

const ComplianceReport = () => {
  return (
    <Card className="bg-indigo-950/40 border-indigo-900/50 text-white">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <CardTitle>Generated Reports</CardTitle>
        <Button variant="outline" className="bg-indigo-900/30 border-indigo-800 text-indigo-100 hover:bg-indigo-800/50">
          <BarChart3 className="h-4 w-4 mr-1.5" /> Generate New Report
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-indigo-800/50 hover:bg-indigo-900/20">
              <TableHead className="text-indigo-200">Report</TableHead>
              <TableHead className="text-indigo-200">Date</TableHead>
              <TableHead className="text-indigo-200">Standard</TableHead>
              <TableHead className="text-indigo-200">Compliance</TableHead>
              <TableHead className="text-indigo-200">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className="border-indigo-800/50 hover:bg-indigo-900/20">
                <TableCell className="font-medium text-white">
                  <div>
                    <div>{report.title}</div>
                    <div className="text-xs text-indigo-300 mt-1">{report.id}</div>
                  </div>
                </TableCell>
                <TableCell className="text-indigo-200">{report.date}</TableCell>
                <TableCell>
                  <Badge className="bg-indigo-900/30 text-indigo-300 border-indigo-800/50">
                    {report.standard}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className={`text-sm font-medium ${
                    parseInt(report.compliance) >= 90 ? 'text-green-400' :
                    parseInt(report.compliance) >= 80 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {report.compliance}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-indigo-200 hover:text-white hover:bg-indigo-900/50">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-indigo-200 hover:text-white hover:bg-indigo-900/50">
                      <FileDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ComplianceReport;
