import Default from "../templates/Default";

export default function SignUp() {
  return (
    <Default className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-6 border">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Juan Dela Cruz"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-700 text-white p-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-xs mt-1">
            Already have an account?{" "}
            <a href="/Login" className="text-gray-700 underline font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </Default>
  );
}
