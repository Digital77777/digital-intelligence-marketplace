
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Sprout, TestTube, MessageSquare, Phone, Send } from 'lucide-react';
import { FarmProfile, cropTypes, soilTypes, languages } from '@/data/cropMindData';

interface OnboardingProps {
  onComplete: (profile: FarmProfile) => void;
  onSkip: () => void;
}

const CropMindOnboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<FarmProfile>>({
    language: 'en',
    location: { latitude: 0, longitude: 0, address: '' },
    farmSize: 1
  });

  const [communicationPrefs, setCommunicationPrefs] = useState({
    text: true,
    voice: false,
    whatsapp: false
  });

  const handleLocationChange = (field: string, value: string | number) => {
    setProfile(prev => ({
      ...prev,
      location: {
        ...prev.location!,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      const finalProfile: FarmProfile = {
        id: `farm-${Date.now()}`,
        location: profile.location!,
        cropType: profile.cropType!,
        farmSize: profile.farmSize!,
        soilType: profile.soilType!,
        plantingDate: profile.plantingDate!,
        language: profile.language!
      };
      onComplete(finalProfile);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return profile.location?.address && profile.location?.latitude !== 0;
      case 2:
        return profile.cropType && profile.soilType;
      case 3:
        return profile.language;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-green-800">Welcome to CropMind AI 🌾</h2>
          <Button variant="ghost" onClick={onSkip} className="text-gray-500">
            Skip Setup
          </Button>
        </div>
        <p className="text-gray-600">Let's set up your farm profile to provide personalized crop advice.</p>
        
        {/* Progress indicator */}
        <div className="flex items-center mt-6 space-x-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNum <= step
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {stepNum}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Location */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Farm Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Farm Address or Nearest Town</Label>
              <Input
                id="address"
                placeholder="e.g., Nakuru, Kenya or coordinates"
                value={profile.location?.address || ''}
                onChange={(e) => handleLocationChange('address', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="-1.2921"
                  value={profile.location?.latitude || ''}
                  onChange={(e) => handleLocationChange('latitude', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="36.8219"
                  value={profile.location?.longitude || ''}
                  onChange={(e) => handleLocationChange('longitude', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="farmSize">Farm Size (acres)</Label>
              <Input
                id="farmSize"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="2.5"
                value={profile.farmSize || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, farmSize: parseFloat(e.target.value) || 0 }))}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Crop & Soil */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-600" />
              Crop & Soil Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>What crop are you growing?</Label>
              <Select value={profile.cropType} onValueChange={(value) => setProfile(prev => ({ ...prev, cropType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop.id} value={crop.id}>
                      {crop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Soil Type</Label>
              <Select value={profile.soilType} onValueChange={(value) => setProfile(prev => ({ ...prev, soilType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil.id} value={soil.id}>
                      <div>
                        <div className="font-medium">{soil.name}</div>
                        <div className="text-sm text-gray-500">{soil.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="plantingDate">When did you plant? (Optional)</Label>
              <Input
                id="plantingDate"
                type="date"
                value={profile.plantingDate || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, plantingDate: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Language */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              Communication Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Preferred Language</Label>
              <Select value={profile.language} onValueChange={(value) => setProfile(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>How would you like to receive advice?</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="text"
                    checked={communicationPrefs.text}
                    onCheckedChange={(checked) => setCommunicationPrefs(prev => ({ ...prev, text: !!checked }))}
                  />
                  <Label htmlFor="text" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Text messages in the app
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="voice"
                    checked={communicationPrefs.voice}
                    onCheckedChange={(checked) => setCommunicationPrefs(prev => ({ ...prev, voice: !!checked }))}
                  />
                  <Label htmlFor="voice" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Voice messages
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whatsapp"
                    checked={communicationPrefs.whatsapp}
                    onCheckedChange={(checked) => setCommunicationPrefs(prev => ({ ...prev, whatsapp: !!checked }))}
                  />
                  <Label htmlFor="whatsapp" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    WhatsApp daily alerts
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">🎉 You're All Set!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Your Farm Profile:</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>📍 Location: {profile.location?.address}</li>
                <li>🌱 Crop: {cropTypes.find(c => c.id === profile.cropType)?.name}</li>
                <li>🏞️ Soil: {soilTypes.find(s => s.id === profile.soilType)?.name}</li>
                <li>🗣️ Language: {languages.find(l => l.code === profile.language)?.nativeName}</li>
                <li>📱 Size: {profile.farmSize} acres</li>
              </ul>
            </div>
            <p className="text-gray-600">
              CropMind AI will now provide personalized recommendations based on your farm's unique conditions using satellite data, weather forecasts, and agricultural best practices.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-green-600 hover:bg-green-700"
        >
          {step === 4 ? 'Start Using CropMind AI' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default CropMindOnboarding;
