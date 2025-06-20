import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Settings, BarChart3, Bell, User, MessageSquare, Sprout } from 'lucide-react';
import { AIToolItem } from '@/data/ai-tools-tiers';
import { FarmProfile, CropRecommendation, SatelliteData, WeatherData, generateRecommendations } from '@/data/cropMindData';
import CropMindOnboarding from './CropMindOnboarding';
import CropDashboard from './CropDashboard';
import CropMindChat from './CropMindChat';

interface CropMindInterfaceProps {
  tool: AIToolItem;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'voice';
  language?: string;
}

const CropMindInterface: React.FC<CropMindInterfaceProps> = ({ tool, onBack }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [farmProfile, setFarmProfile] = useState&l
