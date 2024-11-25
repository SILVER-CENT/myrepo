'use client'

import React, { useState } from 'react';
import { CompositeComponentConfig, ComponentConfig } from './types';
import { FormComponent } from './components';
import { applyValidationRules } from './validation';
import { cn } from '@/lib/utils';

interface FormBuilderProps {
  config: CompositeComponentConfig;
  onSubmit: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  className?: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onSubmit,
  initialValues = {},
  className,
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (id: string, value: any) => {
    setValues(prev => ({ ...prev, [id]: value }));
    
    // Validate field
    const component = config.components.find(c => c.id === id);
    if (component?.validation) {
      const { errors: fieldErrors } = applyValidationRules(value, component.validation);
      setErrors(prev => ({ ...prev, [id]: fieldErrors }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string[]> = {};
    let isValid = true;

    config.components.forEach(component => {
      if (component.validation) {
        const { isValid: fieldValid, errors: fieldErrors } = applyValidationRules(
          values[component.id],
          component.validation
        );
        newErrors[component.id] = fieldErrors;
        if (!fieldValid) isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {config.components.map((component) => {
        // Skip rendering nav-links if it's not the last component
        if (component.type === 'nav-links' && 
            component !== config.components[config.components.length - 1]) {
          return null;
        }

        return (
          <FormComponent
            key={component.id}
            config={component}
            value={values[component.id]}
            onChange={(value) => handleChange(component.id, value)}
            error={errors[component.id]}
          />
        );
      })}
    </form>
  );
};
