
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import FormField from './FormField';
import AuthSubmitButton from './AuthSubmitButton';
import AuthErrorHandler from './AuthErrorHandler';

interface AuthFormProps {
  isSignUp: boolean;
  onSubmit: (email: string, password: string, fullName?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp, onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData.email, formData.password, formData.fullName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        {isSignUp && (
          <FormField
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            icon={User}
            required
          />
        )}
        <FormField
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          icon={Mail}
          required
        />
        <FormField
          name="password"
          type="password"
          placeholder={isSignUp ? "Password (min 6 characters)" : "Password"}
          value={formData.password}
          onChange={handleInputChange}
          icon={Lock}
          required
          minLength={6}
        />
      </div>

      <AuthErrorHandler error={error} />
      
      <AuthSubmitButton isSignUp={isSignUp} isLoading={isLoading} />
    </form>
  );
};

export default AuthForm;
