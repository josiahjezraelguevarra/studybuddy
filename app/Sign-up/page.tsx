import Default from "../templates/Default";

export default function SignUp() {
  return (
    <Default className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium">Full Name</label>
            <input
              type="text"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Juan Dela Cruz"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <a href="/Login" className="text-gray-600 underline font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </Default>
  );
}
