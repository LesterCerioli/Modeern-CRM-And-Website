'use server';

import { createUser } from '@/services/userService';
import { revalidatePath } from 'next/cache';

interface ActionResponse {
  success: boolean;
  message: string;
  data?: {
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
      organization: string;
    };
  };
  error?: string;
}


export async function createUserAction(formData: FormData): Promise<ActionResponse> {
  try {
    
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: formData.get('role') as string,
      organization_name: formData.get('organization_name') as string,
    };

    
    if (!userData.name || !userData.email || !userData.password || !userData.role) {
      return {
        success: false,
        message: 'Validation failed',
        error: 'All required fields must be filled'
      };
    }

    
    const optimisticResponse: ActionResponse = {
      success: true,
      message: 'User creation in progress',
      data: {
        user: {
          id: `temp_${Date.now()}`,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          organization: userData.organization_name
        }
      }
    };

    
    processInBackground(userData).catch(console.error);

    return optimisticResponse;

  } catch (error: any) {
    console.error('Error in createUserAction:', error);
    return {
      success: false,
      message: 'Server error',
      error: error.message
    };
  }
}


async function processInBackground(userData: any) {
  try {
    console.log(`[BACKGROUND] Starting user creation for: ${userData.email}`);
    
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    
    const createdUser = await createUser(userData);
    
    console.log(`[BACKGROUND] User created successfully: ${createdUser.email}`);
    
    
    revalidatePath('/admin/users');
    revalidatePath('/dashboard');
    
  } catch (error: any) {
    console.error(`[BACKGROUND] Failed to create user ${userData.email}:`, error);
    
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await createUser(userData);
      console.log(`[BACKGROUND] User created on retry: ${userData.email}`);
      revalidatePath('/admin/users');
    } catch (retryError) {
      console.error(`[BACKGROUND] Final failure for ${userData.email}:`, retryError);
    }
  }
}