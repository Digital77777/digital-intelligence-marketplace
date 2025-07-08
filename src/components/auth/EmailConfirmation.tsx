import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface EmailConfirmationProps {
  email: string;
  onResend: () => void;
  onContinue: () => void;
}

const EmailConfirmation: React.FC<EmailConfirmationProps> = ({ email, onResend, onContinue }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Confirm Your Email</CardTitle>
        <CardDescription>
          We've sent a confirmation link to <strong>{email}</strong>. Please check your inbox and click the link to complete your registration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or click below to resend.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={onResend}>Resend Email</Button>
        <Button onClick={onContinue}>Continue</Button>
      </CardFooter>
    </Card>
  );
};

export default EmailConfirmation;
