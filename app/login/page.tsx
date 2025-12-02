import Link from "next/link";
import Default from "../templates/Default";

export default function Login() {
  return (
    <section className="max-h-screen">

    <Default >

      <div className="mb-6 self-start">
        <Link 
          href="/" 
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 w-80 max-w-md">
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Login</h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="text-black block mb-1 font-medium">
              Username
            </label>
           <input
              type="text"
              id="username"
              name="username"
              required
              className="text-black w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-black block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="text-black w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md justify-center hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
      </Default>
    </section>
  );
}
