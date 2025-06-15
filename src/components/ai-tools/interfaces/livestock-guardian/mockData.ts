
import { LivestockAlert, LivestockType, Camera } from './types';

export const mockAlerts: LivestockAlert[] = [
  {
    id: '1',
    animalId: 'COW-001',
    alertType: 'health',
    severity: 'high',
    message: 'Abnormal body temperature detected (103.2°F)',
    location: 'Pasture A - North Section',
    timestamp: new Date('2024-06-15T09:30:00'),
    resolved: false
  },
  {
    id: '2',
    animalId: 'COW-015',
    alertType: 'behavior',
    severity: 'medium',
    message: 'Unusual movement pattern - possible lameness',
    location: 'Barn 2 - Stall 15',
    timestamp: new Date('2024-06-15T11:15:00'),
    resolved: false
  },
  {
    id: '3',
    animalId: 'GENERAL',
    alertType: 'predator',
    severity: 'critical',
    message: 'Coyote detected near perimeter fence',
    location: 'South Pasture - Camera 7',
    timestamp: new Date('2024-06-15T14:20:00'),
    resolved: true
  }
];

export const livestockTypes: LivestockType[] = [
  { id: 'cattle', name: 'Cattle', icon: 'Users' },
  { id: 'sheep', name: 'Sheep', icon: 'Users' },
  { id: 'goats', name: 'Goats', icon: 'Users' },
  { id: 'pigs', name: 'Pigs', icon: 'Users' },
  { id: 'horses', name: 'Horses', icon: 'Users' },
  { id: 'chickens', name: 'Chickens', icon: 'Users' }
];

export const cameras: Camera[] = [
  { id: 'camera-1', name: 'Pasture A - Main', status: 'online' },
  { id: 'camera-2', name: 'Barn 1 - Interior', status: 'online' },
  { id: 'camera-3', name: 'Feeding Area', status: 'online' },
  { id: 'camera-4', name: 'South Perimeter', status: 'offline' },
  { id: 'camera-5', name: 'Water Station', status: 'online' }
];
