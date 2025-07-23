import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string()
  .email('Email inválido')
  .min(5, 'Email muy corto')
  .max(254, 'Email muy largo');

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(100, 'Nombre muy largo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Solo letras y espacios permitidos'),
  
  email: emailSchema,
  
  phone: z.string()
    .min(8, 'Teléfono muy corto')
    .max(20, 'Teléfono muy largo')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Formato de teléfono inválido')
    .optional(),
  
  company: z.string()
    .max(100, 'Nombre de empresa muy largo')
    .optional(),
  
  message: z.string()
    .min(10, 'Mensaje debe tener al menos 10 caracteres')
    .max(1000, 'Mensaje muy largo')
});

// Sanitize HTML input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Rate limiting helper (for future backend integration)
export const createRateLimit = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    requests.set(identifier, validRequests);
    return true;
  };
};

export type ContactFormData = z.infer<typeof contactFormSchema>;