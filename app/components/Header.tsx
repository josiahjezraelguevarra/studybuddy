import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full bg-gray-800 py-4 px-6 flex items-center justify-between">
      
      {/* Left side: Logo */}
      <Logo />

      {/* Right side: Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/Sign-up">
          <button className="bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-700 transition">
            Sign Up
          </button>
        </Link>

        <Link href="/Login">
          <button className="bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700 transition">
            Login
          </button>
        </Link>
      </div>

    </header>
  );
}
