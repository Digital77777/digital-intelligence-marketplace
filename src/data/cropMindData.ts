
import { MessageSquare, Satellite, CloudRain, Sprout } from 'lucide-react';

export interface FarmProfile {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  cropType: string;
  farmSize: number;
  soilType: string;
  plantingDate: string;
  language: string;
}

export interface CropRecommendation {
  id: string;
  type: 'irrigation' | 'fertilizer' | 'pest-control' | 'harvest' | 'general';
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  reasoning: string;
  actionSteps: string[];
  estimatedCost?: string;
  timestamp: string;
}

export interface SatelliteData {
  ndvi: number;
  growthStage: string;
  healthIndex: number;
  lastUpdate: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  forecast: Array<{
    date: string;
    temperature: { min: number; max: number };
    condition: string;
    rainfall: number;
  }>;
}

// Sample crop types with local language support
export const cropTypes = [
  { id: 'maize', name: 'Maize/Corn', localNames: { hindi: 'मक्का', swahili: 'Mahindi' } },
  { id: 'rice', name: 'Rice', localNames: { hindi: 'चावल', swahili: 'Mchele' } },
  { id: 'wheat', name: 'Wheat', localNames: { hindi: 'गेहूं', swahili: 'Ngano' } },
  { id: 'beans', name: 'Beans', localNames: { hindi: 'फली', swahili: 'Maharage' } },
  { id: 'tomatoes', name: 'Tomatoes', localNames: { hindi: 'टमाटर', swahili: 'Nyanya' } },
  { id: 'potatoes', name: 'Potatoes', localNames: { hindi: 'आलू', swahili: 'Viazi' } }
];

export const soilTypes = [
  { id: 'loamy', name: 'Loamy', description: 'Well-balanced soil with good drainage' },
  { id: 'sandy', name: 'Sandy', description: 'Fast-draining, low water retention' },
  { id: 'clay', name: 'Clay', description: 'High water retention, slow drainage' },
  { id: 'silt', name: 'Silt', description: 'Fine particles, moderate drainage' },
  { id: 'peaty', name: 'Peaty', description: 'High organic matter, acidic' }
];

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' }
];

// Mock recommendation engine
export const generateRecommendations = (
  farmProfile: FarmProfile,
  satelliteData: SatelliteData,
  weatherData: WeatherData
): CropRecommendation[] => {
  const recommendations: CropRecommendation[] = [];

  // NDVI-based recommendations
  if (satelliteData.ndvi < 0.3) {
    recommendations.push({
      id: '1',
      type: 'fertilizer',
      title: 'Low Vegetation Health Detected',
      description: 'Satellite data shows low vegetation index. Consider nitrogen fertilization.',
      urgency: 'high',
      reasoning: `NDVI reading of ${satelliteData.ndvi} indicates stressed vegetation. This could be due to nutrient deficiency.`,
      actionSteps: [
        'Apply nitrogen-rich fertilizer (20-10-10 NPK)',
        'Monitor soil moisture levels',
        'Check for pest damage'
      ],
      estimatedCost: '$15-25 per acre',
      timestamp: new Date().toISOString()
    });
  }

  // Weather-based recommendations
  if (weatherData.rainfall < 5 && weatherData.humidity < 40) {
    recommendations.push({
      id: '2',
      type: 'irrigation',
      title: 'Dry Conditions Alert',
      description: 'Low rainfall and humidity detected. Increase irrigation.',
      urgency: 'medium',
      reasoning: `Only ${weatherData.rainfall}mm rainfall this week with ${weatherData.humidity}% humidity.`,
      actionSteps: [
        'Increase irrigation frequency to every 2 days',
        'Apply mulch to retain soil moisture',
        'Consider drip irrigation for efficiency'
      ],
      estimatedCost: '$10-20 per acre',
      timestamp: new Date().toISOString()
    });
  }

  // Growth stage recommendations
  if (satelliteData.growthStage === 'flowering') {
    recommendations.push({
      id: '3',
      type: 'pest-control',
      title: 'Flowering Stage Care',
      description: 'Your crop is in flowering stage. Monitor for pests and diseases.',
      urgency: 'medium',
      reasoning: 'Flowering stage is critical for yield formation and susceptible to pest damage.',
      actionSteps: [
        'Scout for aphids and thrips weekly',
        'Apply organic pesticide if needed',
        'Ensure adequate pollination support'
      ],
      estimatedCost: '$8-15 per acre',
      timestamp: new Date().toISOString()
    });
  }

  return recommendations;
};
