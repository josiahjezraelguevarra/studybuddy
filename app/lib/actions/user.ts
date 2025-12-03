'use server'

import prisma from '@/app/lib/prisma'
//import { User } from '@prisma/client'
import { hash } from 'bcrypt'

type ActionError = {
  field: string
  message: string
}

type ActionResponse<T = unknown> = {
  success: boolean
  payload: T | null
  message: string | null
  errors: ActionError[]
  input?: any
}

export async function createUser(
  prevState: ActionResponse<any>,
  formData: FormData
): Promise<ActionResponse<any>> {
  
  // 1. Extract and cast data immediately for cleaner code
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 2. Validate data
  const errors: ActionError[] = []

  if (!name) errors.push({ field: 'name', message: 'Name is required' })
  if (!email) errors.push({ field: 'email', message: 'Email is required' })
  
  // Fixed: Removed the unnecessary "?? ''"
  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  }

  // Validate email format (only if email exists)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email && !emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email format' })
  }

  // Return early if there are validation errors
  if (errors.length > 0) {
    return {
      success: false,
      payload: null,
      message: 'Validation failed',
      errors,
      input: { name, email, password },
    }
  }

  // 3. Database Operations
  try {
    // Check if user already exists
    const userExist = await prisma.user.findUnique({
      where: { email },
    })

    if (userExist) {
      return {
        success: false,
        payload: null,
        message: 'User already exists',
        errors: [],
        input: { name, email, password },
      }
    }

    // Create new user
    const hashedPass = await hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
      },
    })

    return {
      success: true,
      payload: user,
      message: 'Account created successfully!',
      errors: [],
      input: { name, email, password },
    }
    
  } catch (error) {
    console.error('Registration Error:', error)

    return {
      success: false,
      payload: null,
      message: 'Something went wrong. Please try again.',
      errors: [],
    }
  }
}