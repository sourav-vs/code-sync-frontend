import React, { useState } from 'react'

function Auth() {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">

      <div className="w-full max-w-md bg-[#161b22] border border-gray-700 rounded-2xl p-8 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p className="text-gray-400 mt-2">
            {isLogin
              ? "Login to continue collaboration"
              : "Start coding together in real-time"}
          </p>

        </div>

        {/* Form */}
        <form className="space-y-5">

          {/* Username */}
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                className="w-full bg-[#0d1117] border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-gray-500"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full bg-[#0d1117] border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-gray-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full bg-[#0d1117] border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-gray-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white hover:bg-gray-300 text-black font-semibold py-3 rounded-lg transition-all duration-200"
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        {/* Toggle */}
        <div className="text-center mt-6">

          <p className="text-gray-400 text-sm">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-white font-semibold hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Auth