'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Activity, Calendar, TrendingUp, Award, CheckSquare, X, User, Plus, LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const ReactConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const workoutSchedule = [
  { day: 'Monday', workout: 'Cardio', time: '7:00 AM' },
  { day: 'Tuesday', workout: 'Strength', time: '6:30 PM' },
  { day: 'Wednesday', workout: 'Yoga', time: '8:00 AM' },
  { day: 'Thursday', workout: 'HIIT', time: '7:00 PM' },
  { day: 'Friday', workout: 'Pilates', time: '6:00 AM' },
  { day: 'Saturday', workout: 'Zumba', time: '10:00 AM' },
  { day: 'Sunday', workout: 'Rest', time: '-' },
]

const checklistItems = [
  "Complete 30 minutes of cardio",
  "Drink 8 glasses of water",
  "Eat 5 servings of fruits and vegetables",
  "Do 10 minutes of meditation",
  "Get 8 hours of sleep"
]

const activityData = [
  { day: 'Mon', percentage: 30, minutes: 45 },
    { day: 'Tue', percentage: 45, minutes: 68 },
    { day: 'Wed', percentage: 25, minutes: 38 },
    { day: 'Thu', percentage: 60, minutes: 90 },
    { day: 'Fri', percentage: 75, minutes: 113 },
    { day: 'Sat', percentage: 40, minutes: 60 },
    { day: 'Sun', percentage: 50, minutes: 75 },
  ];


export default function MainDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(checklistItems.length).fill(false))
  const [showConfetti, setShowConfetti] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false)
  const [dailySteps, setDailySteps] = useState(8742)
  const [caloriesBurned, setCaloriesBurned] = useState(1250)
  const [streak, setStreak] = useState(5)

  useEffect(() => {
    if (checkedItems.every(item => item)) {
      setShowConfetti(true)
      setShowCongrats(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }, [checkedItems])

  const handleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems]
    newCheckedItems[index] = !newCheckedItems[index]
    setCheckedItems(newCheckedItems)
  }

  const handleAddSteps = () => {
    setDailySteps(prevSteps => prevSteps + 1000)
    setCaloriesBurned(prevCalories => prevCalories + 50)
  }

  const handleAddExerciseDay = () => {
    setStreak(prevStreak => prevStreak + 1)
  }

  const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setCaloriesBurned(value)
    }
  }

  const handleLogout = () => {
    setShowLogoutPrompt(true)
  }

  const confirmLogout = () => {
    setShowLogoutPrompt(false)
    // Implement logout logic here
    router.push('/') // Redirect to home page or login page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      {showConfetti && <ReactConfetti />}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-pink-500 mr-2" />
              <span className="font-bold text-xl text-pink-700">GlitterFit</span>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/my-profile')}
                className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 mr-4"
              >
                <User className="h-5 w-5 mr-2" />
                My Profile
              </button>
              <button 
                onClick={() => router.push('/choose-fitness-style')}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 mr-4"
              >
                Update Fitness Style
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full transition duration-300"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-pink-700 mb-8">Welcome back, Fitness Star!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-10 w-10 text-pink-500 mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Daily Steps</h2>
                <p className="text-2xl font-bold text-pink-600">{dailySteps}</p>
              </div>
            </div>
            <button
              onClick={handleAddSteps}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-10 w-10 text-green-500 mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Calories Burned</h2>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={caloriesBurned}
                    onChange={handleCaloriesChange}
                    className="text-2xl font-bold text-purple-600 bg-transparent border-b border-purple-300 focus:outline-none focus:border-purple-500 w-24 mr-2"
                  />
                  <span className="text-2xl font-bold text-green-600">kcal</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-10 w-10 text-yellow-500 mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Streak</h2>
                <p className="text-2xl font-bold text-yellow-600">{streak} days</p>
              </div>
            </div>
            <button
              onClick={handleAddExerciseDay}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-4 px-6 text-center font-semibold ${
                activeTab === 'overview' ? 'text-pink-600 border-b-2 border-pink-500' : 'text-gray-500 hover:text-pink-600'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-semibold ${
                activeTab === 'schedule' ? 'text-pink-600 border-b-2 border-pink-500' : 'text-gray-500 hover:text-pink-600'
              }`}
              onClick={() => setActiveTab('schedule')}
            >
              Workout Schedule
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' ? (
              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Your Fitness Progress</h2>
                <div className="relative h-64">
                  <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-600">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>
                  <div className="absolute left-8 right-0 top-0 bottom-0 flex items-end justify-between">
                    {activityData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-pink-500 rounded-t" 
                          style={{ height: `${day.percentage}%` }}
                          title={`${day.minutes} minutes`}
                        ></div>
                        <span className="mt-2 text-sm text-gray-600">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <div className="w-4 h-4 bg-pink-500 rounded-sm mr-2"></div>
                  <span className="text-sm text-gray-600">Minutes of Exercise</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-700 mb-6">Your Workout Schedule</h2>
                  <div className="space-y-4">
                    {workoutSchedule.map((day, index) => (
                      <div key={index} className="flex items-center text-lg">
                        <span className="w-32 font-semibold text-gray-700">{day.day}</span>
                        <span className="w-32 text-gray-600">{day.workout}</span>
                        <span className="text-gray-600">{day.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/yoga_girl.gif"
                    alt="Animated yoga girl"
                    width={400}
                    height={400}
                    className="rounded-full border-4 border-pink-300"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Daily Checklist</h2>
          <ul>
            {checklistItems.map((item, index) => (
              <li key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={checkedItems[index]}
                  onChange={() => handleCheck(index)}
                  className="form-checkbox h-5 w-5 text-pink-600"
                />
                <label htmlFor={`checkbox-${index}`} className="ml-2 text-gray-700">{item}</label>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-pink-600">Congratulations!</h2>
              <button onClick={() => setShowCongrats(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-700 mb-4">You've completed all your daily tasks! Keep up the great work and stay glittery!</p>
            <button
              onClick={() => setShowCongrats(false)}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showLogoutPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-pink-600">Leaving So Soon?!</h2>
              <button onClick={() => setShowLogout(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4 flex justify-center">
              <Image
                src="/output-onlinegiftools.gif"
                alt="Sad fitness character"
                width={200}
                height={200}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={confirmLogout}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Yes, Leave
              </button>
              <button
                onClick={() => setShowLogoutPrompt(false)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                No, Stay Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}