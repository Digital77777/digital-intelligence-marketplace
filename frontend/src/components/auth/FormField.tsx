import React from 'react';
import { Input } from '@/components/ui/input';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
  required?: boolean;
  minLength?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
  required = false,
  minLength
}) => {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 transition-colors focus:ring-2 focus:ring-primary/20"
        required={required}
        minLength={minLength}
        autoComplete={type === 'password' ? 'current-password' : 'email'}
      />
    </div>
  );
};

export default FormField;