import Default from "../templates/Default";

export default function Login() {
  return (
    <Default className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium">Password</label>
            <input
              type="password"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <a href="/Sign-up" className="text-gray-800 underline font-medium">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </Default>
  );
}
