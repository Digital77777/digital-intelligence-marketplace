
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Droplets, 
  Thermometer, 
  Wind, 
  Eye,
  TrendingUp,
  Calendar,
  Satellite
} from 'lucide-react';
import { FarmProfile, SatelliteData, WeatherData } from '@/data/cropMindData';

interface CropDashboardProps {
  farmProfile: FarmProfile;
  satelliteData: SatelliteData;
  weatherData: WeatherData;
}

const CropDashboard: React.FC<CropDashboardProps> = ({
  farmProfile,
  satelliteData,
  weatherData
}) => {
  const getHealthColor = (ndvi: number) => {
    if (ndvi >= 0.7) return 'text-green-600';
    if (ndvi >= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthStatus = (ndvi: number) => {
    if (ndvi >= 0.7) return 'Excellent';
    if (ndvi >= 0.5) return 'Good';
    if (ndvi >= 0.3) return 'Fair';
    return 'Poor';
  };

  const getGrowthStageProgress = (stage: string) => {
    const stages = {
      'germination': 15,
      'vegetative': 40,
      'flowering': 70,
      'fruiting': 85,
      'maturity': 100
    };
    return stages[stage as keyof typeof stages] || 0;
  };

  return (
    <div className="space-y-6">
      {/* Farm Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Farm Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{farmProfile.location.address}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Crop Type</p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {farmProfile.cropType}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Farm Size</p>
              <p className="font-medium">{farmProfile.farmSize} acres</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Health & Growth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Satellite className="h-5 w-5 text-blue-600" />
              Crop Health (NDVI)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{satelliteData.ndvi.toFixed(2)}</span>
                <Badge 
                  variant="outline" 
                  className={`${getHealthColor(satelliteData.ndvi)} border-current`}
                >
                  {getHealthStatus(satelliteData.ndvi)}
                </Badge>
              </div>
              <Progress 
                value={satelliteData.ndvi * 100} 
                className="h-2"
              />
              <p className="text-sm text-gray-600">
                NDVI measures vegetation health from satellite imagery. Higher values indicate healthier crops.
              </p>
              <p className="text-xs text-gray-500">
                Last updated: {new Date(satelliteData.lastUpdate).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Growth Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold capitalize">{satelliteData.growthStage}</span>
                <Badge variant="outline" className="text-green-700 border-green-200">
                  {getGrowthStageProgress(satelliteData.growthStage)}%
                </Badge>
              </div>
              <Progress 
                value={getGrowthStageProgress(satelliteData.growthStage)} 
                className="h-2"
              />
              <p className="text-sm text-gray-600">
                Current growth stage based on satellite analysis and planting date.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-orange-600" />
            Current Weather Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Thermometer className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="text-lg font-semibold">{weatherData.temperature}°C</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Droplets className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-lg font-semibold">{weatherData.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Wind className="h-8 w-8 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-lg font-semibold">{weatherData.windSpeed} km/h</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Droplets className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Rainfall</p>
                <p className="text-lg font-semibold">{weatherData.rainfall}mm</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            7-Day Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">
                  {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                </p>
                <p className="text-sm font-medium">{day.condition}</p>
                <div className="text-xs text-gray-600 mt-1">
                  <p>{day.temperature.max}°/{day.temperature.min}°</p>
                  <p className="text-blue-600">{day.rainfall}mm</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Index */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-indigo-600" />
            Overall Health Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold">{satelliteData.healthIndex}/100</span>
            <Badge 
              variant="outline" 
              className={`${getHealthColor(satelliteData.healthIndex / 100)} border-current text-lg px-3 py-1`}
            >
              {getHealthStatus(satelliteData.healthIndex / 100)}
            </Badge>
          </div>
          <Progress value={satelliteData.healthIndex} className="h-3 mb-3" />
          <p className="text-sm text-gray-600">
            Comprehensive health score combining NDVI, weather conditions, growth stage, and historical data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropDashboard;
