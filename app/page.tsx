'use client'

import { useState } from 'react'
import { Sparkles } from "lucide-react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      router.push('/choose-fitness-style')
    } else {
      router.push('/my-profile')
    }
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col md:flex-row items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 bg-pink-500 text-white rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-8 w-8 text-white mr-2" />
            <h1 className="text-3xl font-bold">GlitterFit</h1>
          </div>
          <div className="text-center mb-8">
            <Image
              src="/dumbell.gif"
              alt="GlitterFit Mascot: Animated glittery dumbbell"
              width={200}
              height={200}
              className="mx-auto rounded-full border-4 border-white"
            />
          </div>
          <div className="bg-pink-600 p-4 rounded-lg text-center">
            <p className="text-xl font-semibold">Ready to Sparkle and Shine?</p>
            <p className="mt-2">Join our glittery fitness community today!</p>
          </div>
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 text-center ${isSignUp ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-l-md focus:outline-none transition duration-300`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <button
              className={`flex-1 py-2 text-center ${!isSignUp ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-r-md focus:outline-none transition duration-300`}
              onClick={() => setIsSignUp(false)}
            >
              Sign In
            </button>
          </div>
          {isSignUp ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-600"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-600"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-600"
                  required
                  type="password"
                />
              </div>
              <button
                className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="signin-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-600"
                  placeholder="Enter your email"
                  required
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="signin-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-600"
                  required
                  type="password"
                />
              </div>
              <button
                className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-600 transition duration-300"
                type="submit"
              >
                Sign In
              </button>
            </form>
          )}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <button
            className="w-full border border-pink-500 text-pink-500 font-bold py-2 px-4 rounded-md hover:bg-pink-500 hover:text-white transition duration-300"
          >
            <svg
              className="inline-block mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign {isSignUp ? "up" : "in"} with Google
          </button>
          <p className="text-center text-sm text-gray-600 mt-6">
            By signing {isSignUp ? "up" : "in"}, you agree to our{" "}
            <a href="/terms" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}