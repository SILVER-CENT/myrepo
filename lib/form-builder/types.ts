import { z } from 'zod';

export type ComponentType = 'input' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'button' | 'nav-links';

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface ComponentConfig {
  id: string;
  type: ComponentType;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: any }[];
  validation?: ValidationRule[];
  className?: string;
  disabled?: boolean;
  links?: {
    label: string;
    route: string;
    className?: string;
  }[];
}

export interface CompositeComponentConfig {
  id: string;
  name: string;
  description?: string;
  components: ComponentConfig[];
  layout?: 'vertical' | 'horizontal' | 'grid';
  className?: string;
}

export const componentConfigSchema = z.object({
  id: z.string(),
  type: z.enum(['input', 'select', 'checkbox', 'radio', 'textarea', 'button', 'nav-links']),
  label: z.string(),
  placeholder: z.string().optional(),
  defaultValue: z.any().optional(),
  options: z.array(z.object({
    label: z.string(),
    value: z.any()
  })).optional(),
  validation: z.array(z.object({
    type: z.enum(['required', 'min', 'max', 'pattern', 'custom']),
    value: z.any().optional(),
    message: z.string()
  })).optional(),
  className: z.string().optional(),
  disabled: z.boolean().optional(),
  links: z.array(z.object({
    label: z.string(),
    route: z.string(),
    className: z.string().optional()
  })).optional()
});
