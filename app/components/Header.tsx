'use client' // Required for useSession and onClick handlers

import Link from "next/link";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  // Get the session data
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 w-full bg-gray-800 py-4 px-6 flex items-center justify-between z-50">
      
      {/* Left side: Logo */}
      <Link href="/">   
        <Logo />
      </Link>

      {/* Right side: Buttons */}
      <div className="flex items-center gap-4">
        
        {/* CONDITIONAL RENDERING */}
        {session ? (
          /* 1. IF USER IS LOGGED IN: Show Logout Button */
          <div className="flex items-center gap-4">
            {/* Optional: Show User Name */}
            <span className="text-gray-300 text-sm hidden sm:block">
              Hi, {session.user?.name}
            </span>
            
            <button 
              onClick={() => signOut()}
              className="bg-gray-800 px-4 py-1.5 text-white border-2 border-gray-500 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          /* 2. IF NO USER: Show Login/Signup Buttons */
          <>
            <Link href="/sign-up">
              <button className="bg-gray-800 px-2 py-1 text-white border-2 border-gray-500 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                Sign Up
              </button>
            </Link>

            <Link href="/login">
              <button className="bg-white px-4 py-1.5 text-gray-800 rounded-lg hover:bg-gray-200 transition cursor-pointer">
                Login
              </button>
            </Link>
          </>
        )}

      </div>
    </header>
  );
}