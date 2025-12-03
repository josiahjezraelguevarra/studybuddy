import Default from "../templates/Default";

export default function Login() {
  return (
    <Default className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-700 text-white p-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
          >
            Login
          </button>

          <p className="text-center text-xs mt-1">
            Don’t have an account?{" "}
            <a href="/Sign-up" className="text-gray-700 underline font-medium">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </Default>
  );
}
