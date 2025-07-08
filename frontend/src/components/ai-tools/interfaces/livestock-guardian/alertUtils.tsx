
import React from 'react';
import { Heart, Activity, Shield, Thermometer, AlertTriangle } from 'lucide-react';

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'text-red-700 bg-red-100 border-red-300';
    case 'high': return 'text-red-600 bg-red-50 border-red-200';
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    default: return 'text-green-600 bg-green-50 border-green-200';
  }
};

export const getAlertIcon = (type: string) => {
  switch (type) {
    case 'health': return <Heart className="h-4 w-4" />;
    case 'behavior': return <Activity className="h-4 w-4" />;
    case 'predator': return <Shield className="h-4 w-4" />;
    case 'environmental': return <Thermometer className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
};
