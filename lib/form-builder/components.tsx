import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ComponentConfig } from "./types";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuthRouter } from "@/hooks/use-auth-router";

interface FormComponentProps {
  config: ComponentConfig;
  value?: any;
  onChange: (value: any) => void;
  error?: string[];
}

const NavLinks: React.FC<FormComponentProps> = ({ config, value, onChange, error }) => {
  const { navigate } = useAuthRouter()
  
  if (!config?.links || config.links.length === 0) {
    return null
  }

  return (
    <div className={cn("flex flex-col space-y-2 text-center text-sm", config.className)}>
      {config.links.map((link, index) => (
        <button
          key={index}
          onClick={() => navigate(link.route)}
          className={cn(
            "text-muted-foreground hover:text-primary underline-offset-4 hover:underline",
            link.className
          )}
        >
          {link.label}
        </button>
      ))}
    </div>
  )
}

export const FormComponent: React.FC<FormComponentProps> = ({
  config,
  value,
  onChange,
  error,
}) => {
  if (!config) {
    console.error('FormComponent: config is required');
    return null;
  }

  const renderInput = () => {
    const inputType = config.id === 'password' ? 'password' : 'text';
    
    return (
      <div className="space-y-2">
        {config.label && <Label>{config.label}</Label>}
        <Input
          type={inputType}
          placeholder={config.placeholder}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          disabled={config.disabled}
          className={config.className}
          autoComplete={inputType === 'password' ? 'current-password' : undefined}
        />
        {error?.map((err, i) => (
          <p key={i} className="text-sm text-red-500">{err}</p>
        ))}
      </div>
    );
  };

  const renderSelect = () => (
    <div className="space-y-2">
      {config.label && <Label>{config.label}</Label>}
      <Select value={value || ''} onValueChange={onChange}>
        <SelectTrigger className={config.className}>
          <SelectValue placeholder={config.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {config.options?.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error?.map((err, i) => (
        <p key={i} className="text-sm text-red-500">{err}</p>
      ))}
    </div>
  );

  const renderCheckbox = () => (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={value || false}
        onCheckedChange={onChange}
        disabled={config.disabled}
        className={config.className}
      />
      {config.label && <Label>{config.label}</Label>}
      {error?.map((err, i) => (
        <p key={i} className="text-sm text-red-500">{err}</p>
      ))}
    </div>
  );

  const renderRadio = () => (
    <div className="space-y-2">
      {config.label && <Label>{config.label}</Label>}
      <RadioGroup value={value || ''} onValueChange={onChange}>
        {config.options?.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} />
            <Label>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {error?.map((err, i) => (
        <p key={i} className="text-sm text-red-500">{err}</p>
      ))}
    </div>
  );

  const renderTextarea = () => (
    <div className="space-y-2">
      {config.label && <Label>{config.label}</Label>}
      <Textarea
        placeholder={config.placeholder}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        disabled={config.disabled}
        className={config.className}
      />
      {error?.map((err, i) => (
        <p key={i} className="text-sm text-red-500">{err}</p>
      ))}
    </div>
  );

  const renderButton = () => (
    <Button
      type="submit"
      disabled={config.disabled}
      className={cn("w-full", config.className)}
    >
      {config.label}
    </Button>
  );

  switch (config.type) {
    case 'input': return renderInput();
    case 'select': return renderSelect();
    case 'checkbox': return renderCheckbox();
    case 'radio': return renderRadio();
    case 'textarea': return renderTextarea();
    case 'button': return renderButton();
    case 'nav-links': return <NavLinks config={config} value={value} onChange={onChange} error={error} />;
    default: 
      console.error(`FormComponent: Unknown component type: ${config.type}`);
      return null;
  }
};
