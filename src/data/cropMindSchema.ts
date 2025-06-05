
// Database schema types for CropMind AI
export interface CropMindUser {
  user_id: string;
  name?: string;
  preferred_language: string;
  contact_method: 'chat' | 'voice' | 'whatsapp';
  phone_number?: string;
  created_at: string;
}

export interface Farm {
  farm_id: string;
  user_id: string;
  location_lat: number;
  location_long: number;
  crop_type: string;
  soil_type: string;
  date_planted?: string;
  farm_name?: string;
  farm_size_acres?: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  chat_id: string;
  user_id: string;
  farm_id?: string;
  message_text: string;
  message_type: 'text' | 'voice';
  sender: 'user' | 'ai';
  timestamp: string;
  language?: string;
}

export interface SatelliteData {
  sat_id: string;
  farm_id: string;
  ndvi_value: number;
  growth_stage: string;
  image_url?: string;
  timestamp: string;
  cloud_cover?: number;
  quality_score?: number;
}

export interface CropRecommendationDB {
  rec_id: string;
  farm_id: string;
  type: 'fertilizer' | 'pest' | 'irrigation' | 'harvest' | 'general';
  content: string;
  rationale: string;
  urgency: 'low' | 'medium' | 'high';
  estimated_cost?: string;
  action_steps: string[];
  timestamp: string;
  implemented?: boolean;
  effectiveness_score?: number;
}

export interface WeatherAlert {
  alert_id: string;
  farm_id: string;
  alert_type: 'rain' | 'drought' | 'frost' | 'storm';
  severity: 'low' | 'medium' | 'high';
  message: string;
  start_date: string;
  end_date?: string;
  created_at: string;
}
