'use server';

import { query } from '@/lib/db';
import { z } from 'zod';
import crypto from 'crypto';

const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

export async function registerUser(values: unknown) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!', details: validatedFields.error.flatten().fieldErrors };
  }

  const { fullName, email, phoneNumber, password } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return { error: 'An account with this email already exists.' };
    }

    const { salt, hash } = hashPassword(password);

    await query('INSERT INTO users (fullName, email, phoneNumber, password_hash, password_salt) VALUES (?, ?, ?, ?, ?)', [
      fullName,
      email,
      phoneNumber,
      hash,
      salt,
    ]);
    
    console.log(`Successfully registered user: ${email}`);

    return { success: 'Account created successfully!' };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
