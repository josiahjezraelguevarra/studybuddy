import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-gray-800 py-4 px-6 flex items-center justify-between">
      
      {/* Left side: Logo */}
      <Link href="/">   
      <Logo />
      </Link>

      {/* Right side: Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/Sign-up">
          <button className="bg-gray-800 px-2 py-1 text-white border-2 border-gray-500 rounded-lg hover:bg-white-700 transition cursor-pointer">
            Sign Up
          </button>
        </Link>

        <Link href="/login">
          <button className="bg-white px-4 py-1.5 text-gray-800 rounded-lg hover:bg-white-700 transition cursor-pointer">
            Login
          </button>
        </Link>
      </div>

    </header>
  );
}
