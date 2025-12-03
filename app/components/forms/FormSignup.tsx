'use client'

import { createUser } from '@/app/lib/actions/user' // Make sure this path is correct
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Default from '@/app/templates/Default'

export default function FormSingup() {
  // 1. Initial State definition
  const initialState = {
    success: false,
    payload: null,
    message: null,
    errors: [],
    input: null,
  }

  // 2. Hooks setup
  const { push: redirect } = useRouter()
  
  const [state, handleSubmit, isPending] = useActionState(
    createUser,
    initialState
  )

  // 3. Effect for success/redirect
  useEffect(() => {
    if (state.success) {
      toast.success('Account created! Redirecting...')
      setTimeout(() => {
        redirect('/login')
      }, 1500)
    }
  }, [state.success, redirect])

  // Helper to check for errors
  const getError = (field: string) => state?.errors?.find((e: any) => e.field === field)

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Toast Notification Container */}
      <Toaster position="top-center" />

      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
        
        {/* Global Error Message (if any) */}
        {state.message && !state.success && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {state.message}
          </div>
        )}

        <form action={handleSubmit} className="text-left flex flex-col gap-3" noValidate>
          
          {/* --- FULL NAME --- */}
          <div className="flex flex-col gap-1">
            <label className=" text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              defaultValue={state?.input?.name}
              className={`border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 
                ${getError('name') 
                  ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                  : 'focus:ring-gray-500'}`}
              placeholder="Juan Dela Cruz"
            />
            {getError('name') && (
              <p className="text-xs text-red-500 font-medium">{getError('name')?.message}</p>
            )}
          </div>

          {/* --- EMAIL --- */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={state?.input?.email}
              className={`border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 
                ${getError('email') 
                  ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                  : 'focus:ring-gray-500'}`}
              placeholder="Enter your email"
            />
            {getError('email') && (
              <p className="text-xs text-red-500 font-medium">{getError('email')?.message}</p>
            )}
          </div>

          {/* --- PASSWORD --- */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className={`border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 
                ${getError('password') 
                  ? 'border-red-500 focus:ring-red-200 bg-red-50' 
                  : 'focus:ring-gray-500'}`}
              placeholder="Create a password"
            />
            {getError('password') && (
              <p className="text-xs text-red-500 font-medium">{getError('password')?.message}</p>
            )}
          </div>

          {/* --- SUBMIT BUTTON --- */}
          <button
            type="submit"
            disabled={isPending}
            className="bg-gray-700 text-white p-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                 {/* Simple loading spinner */}
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-center text-xs mt-1">
            Already have an account?{" "}
            <a href="/login" className="text-gray-700 underline font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}