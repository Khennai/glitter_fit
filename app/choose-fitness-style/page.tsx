'use client'

import { useState } from 'react'
import { Sparkles } from "lucide-react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const exerciseStyles = [
  { id: 'yoga', label: 'Yoga' },
  { id: 'pilates', label: 'Pilates' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'strength', label: 'Strength Training' },
  { id: 'zumba', label: 'Zumba' },
  { id: 'hiit', label: 'HIIT' },
]

export default function ChooseFitnessStyle() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const router = useRouter()

  const handleStyleChange = (styleId: string) => {
    setSelectedStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted')
    router.push('/main-dashboard')
  }

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
            <h2 className="text-2xl text-center text-pink-700 font-bold">GlitterFit</h2>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src="/running_girl.gif"
              alt="Animated running girl mascot"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full border-4 border-pink-300"
            />
            <div className="bg-pink-200 p-3 rounded-lg">
              <p className="text-pink-700 font-semibold">Let's customize your glittery fitness journey!</p>
            </div>
          </div>
          <p className="text-center text-pink-600">
            Tell us a bit more about yourself so we can tailor your experience.
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input 
                id="age" 
                type="number" 
                required 
                placeholder="Enter your age" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50 focus:bg-pink-100 text-pink-600 placeholder-pink-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input 
                id="weight" 
                type="number" 
                required 
                placeholder="Enter your weight" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50 focus:bg-pink-100 text-pink-600 placeholder-pink-300"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input 
                id="height" 
                type="number" 
                required 
                placeholder="Enter your height" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50 focus:bg-pink-100 text-pink-600 placeholder-pink-300"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-700">Choose your favorite exercise styles</label>
              <div className="grid grid-cols-2 gap-2">
                {exerciseStyles.map((style) => (
                  <div key={style.id} className="flex items-center space-x-2 bg-purple-100 p-2 rounded-md">
                    <input 
                      type="checkbox"
                      id={style.id} 
                      checked={selectedStyles.includes(style.id)}
                      onChange={() => handleStyleChange(style.id)}
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                    />
                    <label
                      htmlFor={style.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-purple-700"
                    >
                      {style.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Start My Glittery Fitness Journey
            </button>
          </form>
        </div>
        <div className="px-6 pb-6">
          <p className="text-center text-sm text-pink-600 mt-2">
            Your information helps us create a personalized, sparkly fitness plan just for you!
          </p>
        </div>
      </div>
    </div>
  )
}