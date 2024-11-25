import { z } from 'zod';
import { ComponentConfig, ValidationRule } from './types';

export const validateFormConfig = (config: ComponentConfig): z.SafeParseReturnType<any, any> => {
  return componentConfigSchema.safeParse(config);
};

export const applyValidationRules = (value: any, rules?: ValidationRule[]) => {
  if (!rules) return { isValid: true, errors: [] };

  const errors: string[] = [];

  rules.forEach((rule) => {
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && !value.trim())) {
          errors.push(rule.message);
        }
        break;
      case 'min':
        if (typeof value === 'string' && value.length < rule.value) {
          errors.push(rule.message);
        } else if (typeof value === 'number' && value < rule.value) {
          errors.push(rule.message);
        }
        break;
      case 'max':
        if (typeof value === 'string' && value.length > rule.value) {
          errors.push(rule.message);
        } else if (typeof value === 'number' && value > rule.value) {
          errors.push(rule.message);
        }
        break;
      case 'pattern':
        if (typeof value === 'string' && !new RegExp(rule.value).test(value)) {
          errors.push(rule.message);
        }
        break;
      case 'custom':
        if (typeof rule.value === 'function' && !rule.value(value)) {
          errors.push(rule.message);
        }
        break;
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};
