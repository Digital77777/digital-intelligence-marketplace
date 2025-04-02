
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Lock, CheckCircle } from 'lucide-react';
import { useTier } from '@/context/TierContext';
import { Certification } from '@/types/learning';

interface CertificationsProps {
  certifications: Certification[];
  userCertifications?: string[];
  isLoading?: boolean;
}

const Certifications: React.FC<CertificationsProps> = ({ 
  certifications, 
  userCertifications = [],
  isLoading = false 
}) => {
  const { currentTier, upgradePrompt } = useTier();
  
  const isCertificationLocked = (cert: Certification) => {
    if (cert.required_tier === 'freemium') return false;
    if (currentTier === 'pro') return false;
    if (cert.required_tier === 'basic' && currentTier === 'basic') return false;
    return true;
  };
  
  const hasCertification = (certId: string) => {
    return userCertifications.includes(certId);
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <div className="h-32 bg-muted rounded-t-lg"></div>
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-muted rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (certifications.length === 0) {
    return (
      <div className="text-center py-10">
        <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No certifications available</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find any certifications matching your criteria.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {certifications.map(cert => (
        <Card key={cert.id} className={`overflow-hidden ${hasCertification(cert.id) ? 'border-green-400 dark:border-green-600' : ''}`}>
          <div className="relative">
            <div className={`h-32 bg-gradient-to-br ${
              cert.required_tier === 'pro' 
                ? 'from-purple-600 to-indigo-800' 
                : cert.required_tier === 'basic'
                ? 'from-blue-500 to-cyan-700' 
                : 'from-amber-500 to-orange-700'
            } flex items-center justify-center text-white`}>
              <img 
                src={cert.badge_image} 
                alt={cert.title} 
                className="h-20 w-20 object-contain"
              />
            </div>
            {isCertificationLocked(cert) && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="h-10 w-10 text-white opacity-80" />
              </div>
            )}
            {hasCertification(cert.id) && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 hover:bg-green-600 text-white">
                  <CheckCircle className="h-3 w-3 mr-1" /> Earned
                </Badge>
              </div>
            )}
            {cert.is_industry_recognized && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Award className="h-3 w-3 mr-1" /> Industry Recognized
                </Badge>
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{cert.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-4">
              {cert.description}
            </p>
            
            <h4 className="text-sm font-medium mb-2">Requirements:</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              {cert.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            {isCertificationLocked(cert) ? (
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => upgradePrompt(cert.required_tier as any)}
              >
                <Lock className="mr-2 h-4 w-4" /> Upgrade to Unlock
              </Button>
            ) : hasCertification(cert.id) ? (
              <Button variant="outline" className="w-full">
                View Certificate
              </Button>
            ) : (
              <Button className="w-full">
                Start Certification
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Certifications;
