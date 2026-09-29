import { signIn } from "@/auth";
import { FaGoogle, FaGithub, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function LoginPage({ searchParams }: { searchParams: { callbackUrl?: string, error?: string } }) {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('/bg-pattern.svg')]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <h2 className="text-center text-4xl font-black tracking-tight text-black dark:text-white cursor-pointer hover:scale-105 transition-transform">
            Greedy<span className="text-[#ff2d3d]">Cart</span>
          </h2>
        </Link>
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or <span className="font-medium text-[#ff2d3d] hover:text-[#e02635] cursor-pointer">create a new account</span> to save your watchlists forever.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-gray-100 dark:border-gray-700">
          
          <div className="space-y-4">
            {/* Google Form */}
            <form
              action={async () => {
                "use server"
                await signIn("google")
              }}
            >
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-700 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff2d3d] transition-all cursor-pointer"
              >
                <FaGoogle className="text-red-500 text-lg" />
                Continue with Google
              </button>
            </form>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 font-medium">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <form 
              action={async (formData) => {
                "use server"
                await signIn("credentials", formData)
              }} 
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email / Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    name="username"
                    type="text"
                    required
                    defaultValue="demo"
                    className="focus:ring-[#ff2d3d] focus:border-[#ff2d3d] block w-full pl-10 py-3 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    defaultValue="demo"
                    className="focus:ring-[#ff2d3d] focus:border-[#ff2d3d] block w-full pl-10 py-3 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#ff2d3d] focus:ring-[#ff2d3d] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-bold text-[#ff2d3d] hover:text-[#e02635]">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#ff2d3d] hover:bg-[#e02635] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff2d3d] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
