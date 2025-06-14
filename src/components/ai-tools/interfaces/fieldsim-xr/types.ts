
export interface TrainingScenario {
  id: string;
  name: string;
  difficulty: string;
  duration: string;
  completion: number;
  description: string;
  color: string;
  icon: string;
}

export interface Achievement {
  name: string;
  status: 'achieved' | 'in-progress' | 'locked';
  icon: string;
}

export interface RecentSession {
  name: string;
  score: string;
  time: string;
  icon: string;
}

export interface StatItemData {
  label: string;
  value: string;
  unit: string;
}
