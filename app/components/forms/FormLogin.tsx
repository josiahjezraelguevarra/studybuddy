'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Default from '@/app/templates/Default'


export default function FormLogin() {
  const router = useRouter()
  
  // 1. State Management
  const [pending, setPending] = useState(false)
  const [state, setState] = useState({
    errors: { email: '', password: '', system: '' },
    input: { email: '', password: '' }
  })

  // 2. Handle Submit
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)

    // Extract Data
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString().trim()
    const password = formData.get('password')?.toString().trim()

    // Clear previous errors but keep input
    const resetErrors = { email: '', password: '', system: '' }
    
    // Simple Validation
    if (!email || !password) {
      setState({
        errors: {
          ...resetErrors,
          email: !email ? 'Email is required.' : '',
          password: !password ? 'Password is required.' : '',
        },
        input: { email: email ?? '', password: password ?? '' }
      })
      setPending(false)
      return
    }

    try {
      // NextAuth Sign In
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.ok) {
        toast.success('Logged in successfully!')
        // Optional: clear inputs on success
        setState({ errors: resetErrors, input: { email: '', password: '' } })
        
        // Redirect after short delay
        setTimeout(() => {
          router.push('/')
        }, 1000)

      } else {
        // Handle Invalid Credentials
        setState(prev => ({
          ...prev,
          errors: { ...resetErrors, system: 'Invalid email or password.' }
        }))
        toast.error('Login failed')
      }

    } catch (error) {
      console.error(error)
      setState(prev => ({
        ...prev,
        errors: { ...resetErrors, system: 'Something went wrong. Please try again.' }
      }))
    } finally {
      setPending(false)
    }
  }

  // Helper for error styles
  const getErrorClass = (hasError: boolean) => 
    hasError 
      ? "border-red-500 bg-red-50 focus:ring-red-200" 
      : "focus:ring-gray-500"

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Global System Error Alert */}
        {state.errors.system && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center border border-red-200">
            {state.errors.system}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
          
          {/* --- EMAIL --- */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={state.input.email}
              className={`border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 ${getErrorClass(!!state.errors.email)}`}
              placeholder="Enter your email"
            />
            {state.errors.email && (
              <p className="text-xs text-red-500 font-medium">{state.errors.email}</p>
            )}
          </div>

          {/* --- PASSWORD --- */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              defaultValue={state.input.password}
              className={`border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 ${getErrorClass(!!state.errors.password)}`}
              placeholder="Enter your password"
            />
            {state.errors.password && (
              <p className="text-xs text-red-500 font-medium">{state.errors.password}</p>
            )}
          </div>

          {/* --- SUBMIT --- */}
          <button
            type="submit"
            disabled={pending}
            className="bg-gray-700 text-white p-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {pending ? (
              <>
               {/* Simple SVG Spinner */}
               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-xs mt-1">
            Don’t have an account?{" "}
            <a href="/Sign-up" className="text-gray-700 underline font-medium">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}