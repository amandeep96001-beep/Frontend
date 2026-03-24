import { z } from 'zod';

const imageSchema = z.instanceof(File, {
  message: 'Image is required',
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  contact: z.string().min(1, 'Contact number is required'),
  image: imageSchema,
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterSchema = z.infer<typeof registerSchema>;
