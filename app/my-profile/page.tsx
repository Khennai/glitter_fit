'use client'

import { useState, useEffect, useRef } from 'react'
import { Sparkles, Award, Zap, TrendingUp, Edit2, Camera, LogOut, ChevronRight, Settings, Calendar, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const achievements = [
  { name: 'Early Bird', description: 'Completed 10 morning workouts', icon: 'Zap' },
  { name: 'Consistency King', description: 'Worked out for 30 days straight', icon: 'TrendingUp' },
  { name: 'Strength Master', description: 'Lifted 1000kg total in a week', icon: 'Award' },
  { name: 'Cardio Champion', description: 'Ran 100km in a month', icon: 'Zap' },
  { name: 'Flexibility Master', description: 'Achieved full splits', icon: 'Award' },
  { name: 'Nutrition Guru', description: 'Maintained a balanced diet for 60 days', icon: 'TrendingUp' },
]

const stats = [
  { name: 'Workouts', value: 158, icon: Zap },
  { name: 'Calories Burned', value: '87,240', icon: TrendingUp },
  { name: 'Hours Active', value: 210, icon: Calendar },
]

const initialExerciseStyles = [
  'Yoga',
  'Pilates',
  'Cardio',
  'Strength Training',
  'Zumba',
  'HIIT'
]

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('Koena Mahajan')
  const [bio, setBio] = useState('Fitness enthusiast | Yoga lover | Healthy living advocate')
  const [age, setAge] = useState(21)
  const [weight, setWeight] = useState(70)
  const [height, setHeight] = useState(175)
  const [favoriteExercises, setFavoriteExercises] = useState(initialExerciseStyles)
  const [newExercise, setNewExercise] = useState('')
  const [profileImage, setProfileImage] = useState('/placeholder.svg?height=200&width=200')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSave = () => {
    setIsEditing(false)
    console.log('Saving profile:', { name, bio, age, weight, height, favoriteExercises, profileImage })
  }

  const handleLogout = () => {
    router.push('/')
  }

  const addExercise = () => {
    if (newExercise && !favoriteExercises.includes(newExercise)) {
      setFavoriteExercises([...favoriteExercises, newExercise])
      setNewExercise('')
    }
  }

  const removeExercise = (exercise: string) => {
    setFavoriteExercises(favoriteExercises.filter(e => e !== exercise))
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-pink-500 mr-2" />
            <span className="font-bold text-xl text-pink-700">GlitterFit</span>
          </div>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><Link href="/main-dashboard" className="text-gray-600 hover:text-pink-500">Dashboard</Link></li>
              <li><a href="#" className="text-pink-500 font-semibold">Profile</a></li>
              <li>
                <button onClick={handleLogout} className="text-gray-600 hover:text-pink-500" aria-label="Logout">
                  <LogOut className="h-5 w-5" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-pink-500 p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <button
                    onClick={handleImageClick}
                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                    aria-label="Change profile photo"
                  >
                    <Camera className="h-5 w-5 text-pink-500" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-4 text-2xl font-bold text-white bg-transparent border-b-2 border-white focus:outline-none text-center"
                  />
                ) : (
                  <h1 className="mt-4 text-2xl font-bold text-white">{name}</h1>
                )}
              </div>
              <div className="mt-8 text-center">
                <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
                <div className="space-y-4 text-yellow-300 font-semibold">
                  <div>
                    <p className="text-sm text-pink-200">Age</p>
                    {isEditing ? (
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full bg-pink-600 text-yellow-300 rounded px-2 py-1 text-center"
                      />
                    ) : (
                      <p className="text-lg">{age} years</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-pink-200">Weight</p>
                    {isEditing ? (
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full bg-pink-600 text-yellow-300 rounded px-2 py-1 text-center"
                      />
                    ) : (
                      <p className="text-lg">{weight} kg</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-pink-200">Height</p>
                    {isEditing ? (
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full bg-pink-600 text-yellow-300 rounded px-2 py-1 text-center"
                      />
                    ) : (
                      <p className="text-lg">{height} cm</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-full">
                  {isEditing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="text-xl text-gray-600 bg-transparent border-b-2 border-pink-300 focus:border-pink-500 focus:outline-none w-full"
                      rows={2}
                    />
                  ) : (
                    <p className="text-xl text-gray-600">{bio}</p>
                  )}
                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-pink-600 mb-2">Favorite Exercise Styles</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {favoriteExercises.map((style) => (
                        <div key={style} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full flex items-center">
                          <span className="text-lg">{style}</span>
                          {isEditing && (
                            <button
                              onClick={() => removeExercise(style)}
                              className="ml-2 text-pink-600 hover:text-pink-800"
                              aria-label={`Remove ${style}`}
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex items-center mt-2">
                        <input
                          type="text"
                          value={newExercise}
                          onChange={(e) => setNewExercise(e.target.value)}
                          placeholder="Add new exercise style"
                          className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-purple-600 placeholder-gray-400"
                        />
                        <button
                          onClick={addExercise}
                          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-pink-100 p-2 rounded-full shadow-md hover:bg-pink-200 transition-colors duration-200"
                  aria-label={isEditing ? "Save profile" : "Edit profile"}
                >
                  <Edit2 className="h-5 w-5 text-pink-500" />
                </button>
              </div>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="mb-6 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-200"
                >
                  Save Changes
                </button>
              )}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    className="bg-pink-50 rounded-lg p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <stat.icon className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                    <motion.div
                      className="text-2xl font-bold text-gray-900"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600">{stat.name}</div>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center mb-4">
                  <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
                  Recent Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center mb-2">
                        {achievement.icon === 'Zap' && <Zap className="h-6 w-6 text-yellow-400 mr-2" />}
                        {achievement.icon === 'TrendingUp' && <TrendingUp className="h-6 w-6 text-green-500 mr-2" />}
                        {achievement.icon === 'Award' && <Award className="h-6 w-6 text-blue-500 mr-2" />}
                        <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">&copy; 2024 GlitterFit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}