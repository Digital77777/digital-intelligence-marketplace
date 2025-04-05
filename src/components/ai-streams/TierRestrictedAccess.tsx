
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileVideo } from 'lucide-react';

interface TierRestrictedAccessProps {
  feature: string;
  description: string;
  requiredTier: string;
  actionLabel: string;
  actionPath: string;
}

const TierRestrictedAccess: React.FC<TierRestrictedAccessProps> = ({
  feature,
  description,
  requiredTier,
  actionLabel,
  actionPath
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileVideo className="mr-2 h-6 w-6 text-amber-600" />
          {feature}
        </CardTitle>
        <CardDescription>
          {description} {requiredTier} tier subscribers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-amber-800 dark:text-amber-200 mb-4">
          Upgrade to {requiredTier} tier to access this feature.
        </p>
        <Button onClick={() => navigate(actionPath)}>{actionLabel}</Button>
      </CardContent>
    </Card>
  );
};

export default TierRestrictedAccess;
