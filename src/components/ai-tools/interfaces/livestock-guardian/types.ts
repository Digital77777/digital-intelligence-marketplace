
export interface LivestockAlert {
  id: string;
  animalId: string;
  alertType: 'health' | 'behavior' | 'predator' | 'environmental';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: string;
  timestamp: Date;
  resolved: boolean;
}

export interface AnimalHealth {
  id: string;
  animalType: string;
  animalId: string;
  healthScore: number;
  temperature: number;
  heartRate: number;
  activityLevel: number;
  lastCheckup: Date;
  issues: string[];
}

export interface LivestockType {
  id: string;
  name: string;
  icon: string;
}

export interface Camera {
  id: string;
  name: string;
  status: 'online' | 'offline';
}

export interface AnalysisResult {
  animalCount: number;
  healthAlerts: number;
  behaviorChanges: number;
  predatorDetections: number;
  averageHealthScore: number;
  environmentalConditions: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    weatherCondition: string;
  };
  individualAnimals: Array<{
    id: string;
    healthScore: number;
    temperature: number;
    activity: string;
    alert: string | null;
  }>;
  recommendations: string[];
}
