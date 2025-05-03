
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Clock } from 'lucide-react';

interface ChecklistItem {
  category: string;
  items: {
    name: string;
    status: 'completed' | 'pending' | 'failed';
    description: string;
  }[];
}

const ComplianceChecklist = () => {
  const checklists: ChecklistItem[] = [
    {
      category: "Data Protection",
      items: [
        {
          name: "Data Encryption at Rest",
          status: "completed",
          description: "All sensitive data is encrypted while stored"
        },
        {
          name: "Data Encryption in Transit",
          status: "completed",
          description: "All data is encrypted during transmission"
        },
        {
          name: "Data Retention Policy",
          status: "pending",
          description: "Define and implement data retention periods"
        }
      ]
    },
    {
      category: "Access Controls",
      items: [
        {
          name: "Role-Based Access Control",
          status: "completed",
          description: "Access restricted based on user roles"
        },
        {
          name: "Multi-Factor Authentication",
          status: "completed",
          description: "MFA enforced for all privileged accounts"
        },
        {
          name: "Regular Access Reviews",
          status: "failed",
          description: "Quarterly access review process"
        }
      ]
    },
    {
      category: "Audit & Monitoring",
      items: [
        {
          name: "Comprehensive Audit Logs",
          status: "completed",
          description: "Detailed logs of all system activities"
        },
        {
          name: "Security Monitoring",
          status: "completed",
          description: "Real-time monitoring for security events"
        },
        {
          name: "Incident Response Plan",
          status: "pending",
          description: "Documented procedures for security incidents"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {checklists.map((checklist, index) => (
        <Card key={index} className="bg-indigo-950/40 border-indigo-900/50 text-white">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">{checklist.category}</h3>
            <div className="space-y-4">
              {checklist.items.map((item, idx) => (
                <div key={idx} className="border-b border-indigo-800/50 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                      item.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                      item.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {item.status === 'completed' ? <Check className="h-4 w-4" /> : 
                       item.status === 'pending' ? <Clock className="h-4 w-4" /> : 
                       <X className="h-4 w-4" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-sm text-indigo-300 mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ComplianceChecklist;
