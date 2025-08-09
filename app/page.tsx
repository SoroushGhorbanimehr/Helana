'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Users, Plus, Edit, CalendarIcon, Dumbbell, Apple, Play, CheckCircle2, Clock, Target, User, Settings, BookOpen, TrendingUp, ChefHat, Activity, MessageCircle, Sun, Moon, Send } from 'lucide-react'
import Image from 'next/image'

// Mock data
const mockPrograms = [
  {
    id: 1,
    name: "Beginner Strength Training",
    type: "exercise",
    duration: "8 weeks",
    students: ["Helana", "Soroush"],
    exercises: [
      { id: 1, name: "Push-ups", sets: 3, reps: 12, rest: 60, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9L7PkHi4dNop476pFoa7QyfRqLDIPg.png", description: "Keep your body straight and lower yourself until your chest nearly touches the floor" },
      { id: 2, name: "Squats", sets: 3, reps: 15, rest: 60, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mMCYFLaZXWzyK6I9h3kwPN3AtYwYZE.png", description: "Lower your body as if sitting back into a chair, keeping your chest up" },
      { id: 3, name: "Plank", sets: 3, reps: "30s", rest: 45, image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T744sW0UKbkH4TM8IPlLfaHIj3EFTx.png", description: "Hold your body straight like a plank, engaging your core muscles" }
    ]
  },
  {
    id: 2,
    name: "Weight Loss Diet Plan",
    type: "diet",
    duration: "4 weeks",
    students: ["Helana"],
    meals: [
      { id: 1, name: "Breakfast", foods: ["Oatmeal", "Banana", "Almonds"], calories: 350 },
      { id: 2, name: "Lunch", foods: ["Grilled Chicken", "Brown Rice", "Vegetables"], calories: 450 },
      { id: 3, name: "Dinner", foods: ["Salmon", "Quinoa", "Broccoli"], calories: 400 }
    ]
  }
]

const mockStudents = [
  { id: 1, name: "Helana", email: "helana@example.com", programs: [1, 2], progress: 75 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", programs: [1], progress: 60 },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", programs: [], progress: 0 }
]

const exerciseLibrary = [
  { id: 1, name: "Push-ups", category: "Chest", difficulty: "Beginner", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9L7PkHi4dNop476pFoa7QyfRqLDIPg.png" },
  { id: 2, name: "Squats", category: "Legs", difficulty: "Beginner", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mMCYFLaZXWzyK6I9h3kwPN3AtYwYZE.png" },
  { id: 3, name: "Plank", category: "Core", difficulty: "Beginner", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T744sW0UKbkH4TM8IPlLfaHIj3EFTx.png" },
  { id: 4, name: "Burpees", category: "Full Body", difficulty: "Advanced", image: "/burpee-exercise.png" },
  { id: 5, name: "Deadlifts", category: "Back", difficulty: "Intermediate", image: "/deadlift-exercise.png" },
  { id: 6, name: "Pull-ups", category: "Back", difficulty: "Advanced", image: "/pullup-exercise.png" }
]

const nutritionItems = [
  { 
    name: 'Chicken Rice', 
    time: '10 min', 
    calories: '440 Calories', 
    image: '/healthy-chicken-bowl.png',
    ingredients: [
      { name: 'Grilled Chicken Breast', amount: '150g', calories: 231 },
      { name: 'Brown Rice', amount: '100g', calories: 111 },
      { name: 'Mixed Vegetables', amount: '80g', calories: 35 },
      { name: 'Olive Oil', amount: '1 tbsp', calories: 119 },
      { name: 'Soy Sauce', amount: '1 tbsp', calories: 8 },
      { name: 'Garlic', amount: '2 cloves', calories: 8 }
    ],
    recipe: {
      prepTime: '5 min',
      cookTime: '15 min',
      difficulty: 'Easy',
      instructions: [
        'Cook brown rice according to package instructions (about 10-12 minutes)',
        'Season chicken breast with salt and pepper, then grill for 6-7 minutes each side',
        'Steam mixed vegetables for 3-4 minutes until tender',
        'Heat olive oil in a pan and sauté minced garlic for 30 seconds',
        'Slice the grilled chicken and arrange over rice',
        'Add steamed vegetables and drizzle with garlic oil and soy sauce',
        'Serve hot and enjoy your healthy meal!'
      ]
    }
  },
  { 
    name: 'Protein Smoothie', 
    time: '5 min', 
    calories: '320 Calories', 
    image: '/protein-smoothie.png',
    ingredients: [
      { name: 'Whey Protein Powder', amount: '30g', calories: 120 },
      { name: 'Banana', amount: '1 medium', calories: 105 },
      { name: 'Almond Milk', amount: '250ml', calories: 40 },
      { name: 'Peanut Butter', amount: '1 tbsp', calories: 95 },
      { name: 'Honey', amount: '1 tsp', calories: 21 },
      { name: 'Ice Cubes', amount: '4-5 cubes', calories: 0 }
    ],
    recipe: {
      prepTime: '3 min',
      cookTime: '0 min',
      difficulty: 'Very Easy',
      instructions: [
        'Add almond milk to your blender first for easier blending',
        'Add the banana (peeled and sliced for easier blending)',
        'Add protein powder, peanut butter, and honey',
        'Add ice cubes for a refreshing cold smoothie',
        'Blend on high speed for 60-90 seconds until smooth and creamy',
        'Pour into a tall glass and serve immediately',
        'Optional: garnish with sliced banana or a sprinkle of cinnamon'
      ]
    }
  },
  { 
    name: 'Grilled Salmon', 
    time: '15 min', 
    calories: '380 Calories', 
    image: '/grilled-salmon.png',
    ingredients: [
      { name: 'Salmon Fillet', amount: '150g', calories: 231 },
      { name: 'Asparagus', amount: '100g', calories: 20 },
      { name: 'Cherry Tomatoes', amount: '80g', calories: 14 },
      { name: 'Lemon', amount: '1/2 piece', calories: 8 },
      { name: 'Olive Oil', amount: '1 tbsp', calories: 119 },
      { name: 'Fresh Herbs', amount: '2 tbsp', calories: 2 }
    ],
    recipe: {
      prepTime: '5 min',
      cookTime: '12 min',
      difficulty: 'Medium',
      instructions: [
        'Preheat grill or grill pan to medium-high heat',
        'Pat salmon fillet dry and season with salt, pepper, and herbs',
        'Brush salmon and vegetables with olive oil',
        'Grill salmon for 4-5 minutes per side (depending on thickness)',
        'Grill asparagus for 3-4 minutes, turning occasionally',
        'Grill cherry tomatoes for 2-3 minutes until slightly charred',
        'Squeeze fresh lemon juice over salmon and vegetables before serving',
        'Serve immediately while hot'
      ]
    }
  },
  { 
    name: 'Quinoa Salad', 
    time: '10 min', 
    calories: '290 Calories', 
    image: '/quinoa-salad.png',
    ingredients: [
      { name: 'Cooked Quinoa', amount: '100g', calories: 120 },
      { name: 'Cucumber', amount: '80g', calories: 13 },
      { name: 'Cherry Tomatoes', amount: '60g', calories: 11 },
      { name: 'Red Onion', amount: '30g', calories: 12 },
      { name: 'Feta Cheese', amount: '40g', calories: 106 },
      { name: 'Olive Oil', amount: '1 tbsp', calories: 119 },
      { name: 'Lemon Juice', amount: '1 tbsp', calories: 4 }
    ],
    recipe: {
      prepTime: '10 min',
      cookTime: '0 min',
      difficulty: 'Easy',
      instructions: [
        'Cook quinoa according to package instructions and let it cool',
        'Dice cucumber, cherry tomatoes, and red onion into small pieces',
        'Crumble feta cheese into bite-sized pieces',
        'In a large bowl, combine cooled quinoa with all vegetables',
        'Add crumbled feta cheese to the mixture',
        'Whisk together olive oil and lemon juice for dressing',
        'Pour dressing over salad and toss gently to combine',
        'Let sit for 5 minutes to allow flavors to meld before serving'
      ]
    }
  },
]

export default function FitnessCoachingPlatform() {
  const [userType, setUserType] = useState<'coach' | 'student' | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedMeal, setSelectedMeal] = useState<any>(null)
  const [weightEntries, setWeightEntries] = useState([
    { date: '2024-10-01', weight: 75.2 },
    { date: '2024-10-08', weight: 74.8 },
    { date: '2024-10-15', weight: 74.5 },
    { date: '2024-10-17', weight: 74.3 }
  ])
  const [showWeightDialog, setShowWeightDialog] = useState(false)
  const [newWeight, setNewWeight] = useState('')
  const [userGoals, setUserGoals] = useState({
    targetWeight: 70,
    currentWeight: 74.3,
    targetDate: '2024-12-31',
    weeklyGoal: 0.5
  })
  const [bodyMeasurements, setBodyMeasurements] = useState({
    chest: 95,
    waist: 82,
    hips: 98,
    arms: 32,
    thighs: 58
  })
  const [darkMode, setDarkMode] = useState(false)
  const [showMessaging, setShowMessaging] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'coach', message: 'Great job on completing your workout today! How are you feeling?', time: '2:30 PM', avatar: '/fitness-coach-hero.png' },
    { id: 2, sender: 'student', message: 'Feeling great! The squats were challenging but I managed to complete all sets.', time: '2:45 PM', avatar: null },
    { id: 3, sender: 'coach', message: 'Excellent! Remember to focus on your form. I noticed you might need to work on your depth. Let\'s schedule a form check video call.', time: '3:00 PM', avatar: '/fitness-coach-hero.png' },
    { id: 4, sender: 'student', message: 'That sounds perfect! When would be a good time?', time: '3:15 PM', avatar: null }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [macroData, setMacroData] = useState({
    protein: { current: 85, target: 120, percentage: 71 },
    carbs: { current: 180, target: 200, percentage: 90 },
    fat: { current: 45, target: 60, percentage: 75 }
  })
  const [showMacroChart, setShowMacroChart] = useState(false)

  // Login Screen
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>

        <div className="max-w-md w-full space-y-8 relative z-10">
          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center space-y-6">
              {/* Logo/Name Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-64 h-32 flex items-center justify-center bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-4">
                    <Image
                      src="/helana-cleary-logo.png"
                      alt="Helana Cleary"
                      width={240}
                      height={120}
                      className="object-contain"
                    />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-3xl opacity-20 blur-lg animate-pulse"></div>
                </div>
              </div>

              {/* App Title */}
              <div className="space-y-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  FitCoach Pro
                </h1>
                <p className="text-gray-600 text-lg font-medium">
                  Professional Fitness Coaching Platform
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
              </div>

              {/* Welcome Message */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                <p className="text-gray-700 text-sm">
                  Welcome to your personalized fitness journey with Helana Cleary
                </p>
              </div>
            </div>
            
            {/* Login Buttons */}
            <div className="space-y-4 mt-8">
              <Button 
                onClick={() => setUserType('coach')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Dumbbell className="h-6 w-6" />
                  <span>Login as Coach</span>
                </div>
              </Button>
              
              <Button 
                onClick={() => setUserType('student')}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-purple-300"
              >
                <div className="flex items-center justify-center space-x-3">
                  <User className="h-6 w-6" />
                  <span>Login as Student</span>
                </div>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative text */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Transform your fitness journey with personalized coaching
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Coach Interface
  if (userType === 'coach') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Dumbbell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Coach Dashboard</h1>
                    <p className="text-sm text-gray-500">Manage your students and programs</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setUserType(null)}
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-4 max-w-md">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
              </TabsList>
            </div>

            <div className="px-6 py-6">
              <TabsContent value="dashboard" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Total Students</p>
                          <p className="text-2xl font-bold text-gray-900">{mockStudents.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <BookOpen className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Active Programs</p>
                          <p className="text-2xl font-bold text-gray-900">{mockPrograms.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                          <p className="text-2xl font-bold text-gray-900">68%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <Target className="h-8 w-8 text-orange-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Exercises</p>
                          <p className="text-2xl font-bold text-gray-900">{exerciseLibrary.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Student Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockStudents.map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-500">{student.programs.length} programs assigned</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{student.progress}% Complete</p>
                            <Progress value={student.progress} className="w-24 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programs" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Training Programs</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Program
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Program</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="program-name">Program Name</Label>
                            <Input id="program-name" placeholder="e.g., Beginner Strength" />
                          </div>
                          <div>
                            <Label htmlFor="program-type">Program Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="exercise">Exercise Program</SelectItem>
                                <SelectItem value="diet">Diet Program</SelectItem>
                                <SelectItem value="combined">Combined Program</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="program-description">Description</Label>
                          <Textarea id="program-description" placeholder="Program description..." />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Program</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockPrograms.map((program) => (
                    <Card key={program.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{program.name}</CardTitle>
                          <Badge variant={program.type === 'exercise' ? 'default' : 'secondary'}>
                            {program.type === 'exercise' ? <Dumbbell className="h-3 w-3 mr-1" /> : <ChefHat className="h-3 w-3 mr-1" />}
                            {program.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {program.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            {program.students.length} students assigned
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm">
                              Assign Students
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="students" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Students</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockStudents.map((student) => (
                    <Card key={student.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{student.progress}%</span>
                            </div>
                            <Progress value={student.progress} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">{student.programs.length} programs assigned</p>
                          </div>
                          <Button size="sm" className="w-full">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="exercises" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Exercise Library</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exerciseLibrary.map((exercise) => (
                    <Card key={exercise.id}>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                          {exercise.image ? (
                            <Image
                              src={exercise.image || "/placeholder.svg"}
                              alt={`${exercise.name} demonstration`}
                              width={300}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Play className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{exercise.name}</h3>
                            <Badge variant="outline">{exercise.difficulty}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{exercise.category}</p>
                          <Button size="sm" variant="outline" className="w-full">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit Exercise
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    )
  }

  // Student Interface
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} min-h-screen`}>
        {/* Header */}
        <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Good Morning 👋</p>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Helana</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={() => setShowMessaging(true)}
                variant="ghost" 
                size="icon"
                className={`${darkMode ? 'text-gray-300 hover:bg-gray-700' : ''}`}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button 
                onClick={() => setDarkMode(!darkMode)}
                variant="ghost" 
                size="icon"
                className={`${darkMode ? 'text-gray-300 hover:bg-gray-700' : ''}`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button 
                onClick={() => setUserType(null)}
                variant="ghost" 
                size="icon"
                className={`${darkMode ? 'text-gray-300 hover:bg-gray-700' : ''}`}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Row */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">October 2024</h3>
              <p className="text-sm text-gray-600">This week's schedule</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100">
              <CalendarIcon className="h-4 w-4 mr-1" />
              View All
            </Button>
          </div>
          
          <div className="flex justify-between space-x-2">
            {[
              { day: 'M', date: 15, isToday: false, hasWorkout: true, isCompleted: true },
              { day: 'T', date: 16, isToday: false, hasWorkout: true, isCompleted: true },
              { day: 'W', date: 17, isToday: true, hasWorkout: true, isCompleted: false },
              { day: 'T', date: 18, isToday: false, hasWorkout: true, isCompleted: false },
              { day: 'F', date: 19, isToday: false, hasWorkout: false, isCompleted: false },
              { day: 'S', date: 20, isToday: false, hasWorkout: true, isCompleted: false },
              { day: 'S', date: 21, isToday: false, hasWorkout: false, isCompleted: false },
            ].map((dayInfo, index) => (
              <div
                key={index}
                className={`relative flex-1 h-16 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  dayInfo.isToday
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200'
                    : dayInfo.isCompleted
                    ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-md shadow-green-200'
                    : dayInfo.hasWorkout
                    ? 'bg-white border-2 border-orange-300 text-orange-700 shadow-sm hover:shadow-md'
                    : 'bg-white border border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                {/* Workout indicator dot */}
                {dayInfo.hasWorkout && !dayInfo.isCompleted && !dayInfo.isToday && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                )}
                
                {/* Completion checkmark */}
                {dayInfo.isCompleted && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                )}
                
                <span className={`text-xs font-medium mb-1 ${
                  dayInfo.isToday || dayInfo.isCompleted ? 'text-white opacity-90' : ''
                }`}>
                  {dayInfo.day}
                </span>
                <span className={`text-lg font-bold ${
                  dayInfo.isToday || dayInfo.isCompleted ? 'text-white' : ''
                }`}>
                  {dayInfo.date}
                </span>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-4 pt-3 border-t border-white/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-sm"></div>
              <span className="text-xs text-gray-600 font-medium">Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"></div>
              <span className="text-xs text-gray-600 font-medium">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-400 shadow-sm"></div>
              <span className="text-xs text-gray-600 font-medium">Scheduled</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-xs text-gray-600 font-medium">Rest</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="flex-1 overflow-auto pb-20">
            <TabsContent value="dashboard" className="p-4 space-y-6 mt-0">
              {/* Today's Program */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      Today's Program
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      Wed, Oct 17
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">Beginner Strength Training</h3>
                    <p className="text-sm text-blue-700">Week 2, Day 3</p>
                  </div>
                  
                  <div className="space-y-3">
                    {mockPrograms[0].exercises.map((exercise) => (
                      <div key={exercise.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={completedExercises.includes(exercise.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setCompletedExercises([...completedExercises, exercise.id])
                              } else {
                                setCompletedExercises(completedExercises.filter(id => id !== exercise.id))
                              }
                            }}
                          />
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={exercise.image || "/placeholder.svg"}
                              alt={`${exercise.name} demonstration`}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm text-gray-500">{exercise.sets} sets × {exercise.reps} reps</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedExercise(exercise)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Diet Plan */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                      <Apple className="h-5 w-5 mr-2" />
                      Today's Meals
                    </CardTitle>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setShowMacroChart(true)}
                      className={`${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}
                    >
                      View Macros
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {nutritionItems.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center space-x-3 p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} cursor-pointer transition-colors`}
                        onClick={() => setSelectedMeal(item)}
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : ''}`}>{item.name}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.time}</p>
                          <p className="text-xs text-orange-600">{item.calories}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Workouts Completed</span>
                        <span>5/7</span>
                      </div>
                      <Progress value={71} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Diet Plan Followed</span>
                        <span>6/7</span>
                      </div>
                      <Progress value={86} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="p-4 space-y-4 mt-0">
              <h2 className="text-xl font-bold">My Programs</h2>
              
              <div className="space-y-4">
                {mockPrograms.map((program) => (
                  <Card key={program.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{program.name}</h3>
                        <Badge variant={program.type === 'exercise' ? 'default' : 'secondary'}>
                          {program.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{program.duration}</p>
                      
                      {/* Show exercise previews for exercise programs */}
                      {program.type === 'exercise' && program.exercises && (
                        <div className="flex space-x-2 mb-3 overflow-x-auto">
                          {program.exercises.slice(0, 3).map((exercise) => (
                            <div key={exercise.id} className="flex-shrink-0">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                  src={exercise.image || "/placeholder.svg"}
                                  alt={exercise.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="text-xs text-center mt-1 truncate w-16">{exercise.name}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <Button size="sm" className="w-full">
                        View Program Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="p-4 space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Progress Tracking</h2>
                <Button 
                  size="sm" 
                  onClick={() => setShowWeightDialog(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Log Weight
                </Button>
              </div>

              {/* Goals Overview */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                    Your Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-600 font-medium">Current Weight</p>
                      <p className="text-2xl font-bold text-blue-900">{userGoals.currentWeight} kg</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-green-600 font-medium">Target Weight</p>
                      <p className="text-2xl font-bold text-green-900">{userGoals.targetWeight} kg</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Goal</span>
                      <span>{((userGoals.currentWeight - userGoals.targetWeight) / (weightEntries[0].weight - userGoals.targetWeight) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={((userGoals.currentWeight - userGoals.targetWeight) / (weightEntries[0].weight - userGoals.targetWeight) * 100)} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Weekly Goal: -{userGoals.weeklyGoal} kg</span>
                    <span>Target: {new Date(userGoals.targetDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Weight Chart */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                    <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                    Weight Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Simple weight chart visualization */}
                    <div className="h-32 bg-gradient-to-t from-purple-50 to-white rounded-lg p-4 relative overflow-hidden">
                      <div className="flex items-end justify-between h-full">
                        {weightEntries.map((entry, index) => (
                          <div key={index} className="flex flex-col items-center space-y-2">
                            <div 
                              className="bg-purple-500 rounded-t-lg w-8 transition-all duration-500"
                              style={{ 
                                height: `${((entry.weight - 70) / (76 - 70)) * 80}px`,
                                minHeight: '20px'
                              }}
                            ></div>
                            <div className="text-center">
                              <p className="text-xs font-semibold text-purple-700">{entry.weight}kg</p>
                              <p className="text-xs text-gray-500">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Weight change indicator */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">This Week</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">-0.2 kg</p>
                        <p className="text-xs text-gray-500">vs last week</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Body Measurements */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                    <User className="h-5 w-5 mr-2 text-orange-600" />
                    Body Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(bodyMeasurements).map(([part, measurement]) => (
                      <div key={part} className="p-3 border rounded-lg">
                        <p className="text-xs text-gray-600 capitalize">{part}</p>
                        <p className="text-lg font-bold text-gray-900">{measurement} cm</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Update Measurements
                  </Button>
                </CardContent>
              </Card>

              {/* Weekly Stats */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                    <Activity className="h-5 w-5 mr-2 text-green-600" />
                    This Week's Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Workouts Completed</span>
                        <span>5/7</span>
                      </div>
                      <Progress value={71} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Diet Plan Followed</span>
                        <span>6/7</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Water Intake</span>
                        <span>2.1/2.5L</span>
                      </div>
                      <Progress value={84} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sleep Quality</span>
                        <span>7.2/8h avg</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                    <CheckCircle2 className="h-5 w-5 mr-2 text-yellow-600" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">7-Day Streak!</p>
                        <p className="text-xs text-gray-600">Completed workouts for 7 days straight</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Weight Goal Progress</p>
                        <p className="text-xs text-gray-600">Lost 0.9kg this month</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Dumbbell className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Strength Milestone</p>
                        <p className="text-xs text-gray-600">Increased push-ups to 15 reps</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          {/* Bottom Navigation */}
          <TabsList className="grid w-full grid-cols-3 bg-transparent h-16">
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col space-y-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              <Activity className="h-5 w-5" />
              <span className="text-xs">Today</span>
            </TabsTrigger>
            <TabsTrigger 
              value="programs"
              className="flex flex-col space-y-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Programs</span>
            </TabsTrigger>
            <TabsTrigger 
              value="progress"
              className="flex flex-col space-y-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Progress</span>
            </TabsTrigger>
          </TabsList>

        {/* Exercise Demo Modal */}
        {selectedExercise && (
          <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedExercise.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={selectedExercise.image || selectedExercise.gif || "/placeholder.svg?height=200&width=300&query=exercise demonstration"}
                    alt={`${selectedExercise.name} demonstration`}
                    width={400}
                    height={250}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                {selectedExercise.description && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{selectedExercise.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{selectedExercise.sets}</p>
                    <p className="text-sm text-gray-500">Sets</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{selectedExercise.reps}</p>
                    <p className="text-sm text-gray-500">Reps</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{selectedExercise.rest}s</p>
                    <p className="text-sm text-gray-500">Rest</p>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setCompletedExercises([...completedExercises, selectedExercise.id])
                    setSelectedExercise(null)
                  }}
                >
                  Mark as Complete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Meal Details Modal */}
        {selectedMeal && (
          <Dialog open={!!selectedMeal} onOpenChange={() => setSelectedMeal(null)}>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Image
                    src={selectedMeal.image || "/placeholder.svg"}
                    alt={selectedMeal.name}
                    width={40}
                    height={40}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{selectedMeal.name}</h3>
                    <p className="text-sm text-gray-500 font-normal">{selectedMeal.calories}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Recipe Info */}
                <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Clock className="h-4 w-4 mx-auto text-blue-600 mb-1" />
                    <p className="text-xs text-gray-600">Prep Time</p>
                    <p className="text-sm font-semibold">{selectedMeal.recipe.prepTime}</p>
                  </div>
                  <div className="text-center">
                    <ChefHat className="h-4 w-4 mx-auto text-green-600 mb-1" />
                    <p className="text-xs text-gray-600">Cook Time</p>
                    <p className="text-sm font-semibold">{selectedMeal.recipe.cookTime}</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-4 w-4 mx-auto text-orange-600 mb-1" />
                    <p className="text-xs text-gray-600">Difficulty</p>
                    <p className="text-sm font-semibold">{selectedMeal.recipe.difficulty}</p>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Apple className="h-4 w-4 mr-2 text-green-600" />
                    Ingredients
                  </h4>
                  <div className="space-y-2">
                    {selectedMeal.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{ingredient.name}</p>
                          <p className="text-xs text-gray-500">{ingredient.amount}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-orange-600">{ingredient.calories} cal</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-blue-800">
                      Total: {selectedMeal.ingredients.reduce((sum, ing) => sum + ing.calories, 0)} calories
                    </p>
                  </div>
                </div>

                {/* Recipe Instructions */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                    Instructions
                  </h4>
                  <div className="space-y-3">
                    {selectedMeal.recipe.instructions.map((step, index) => (
                      <div key={index} className="flex space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedMeal(null)}
                  >
                    Close
                  </Button>
                  <Button className="flex-1">
                    Add to Shopping List
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Weight Entry Dialog */}
        {showWeightDialog && (
          <Dialog open={showWeightDialog} onOpenChange={setShowWeightDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Your Weight</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight">Current Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="74.3"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                  />
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Last recorded: {weightEntries[weightEntries.length - 1].weight}kg on{' '}
                    {new Date(weightEntries[weightEntries.length - 1].date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowWeightDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      if (newWeight) {
                        const newEntry = {
                          date: new Date().toISOString().split('T')[0],
                          weight: parseFloat(newWeight)
                        }
                        setWeightEntries([...weightEntries, newEntry])
                        setUserGoals({...userGoals, currentWeight: parseFloat(newWeight)})
                        setNewWeight('')
                        setShowWeightDialog(false)
                      }
                    }}
                  >
                    Save Weight
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Direct Coach Messaging Modal */}
        {showMessaging && (
          <Dialog open={showMessaging} onOpenChange={setShowMessaging}>
            <DialogContent className={`max-w-md max-h-[80vh] ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <DialogHeader>
                <DialogTitle className={`flex items-center space-x-3 ${darkMode ? 'text-white' : ''}`}>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/fitness-coach-hero.png"
                      alt="Coach"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Coach Sarah</h3>
                    <p className={`text-sm font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Online now</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-col h-96">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-end space-x-2 max-w-xs ${message.sender === 'student' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {message.sender === 'coach' && (
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={message.avatar || "/fitness-coach-hero.png"}
                              alt="Coach"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className={`p-3 rounded-2xl ${
                          message.sender === 'student' 
                            ? 'bg-blue-600 text-white' 
                            : darkMode 
                              ? 'bg-gray-700 text-white' 
                              : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'student' 
                              ? 'text-blue-100' 
                              : darkMode 
                                ? 'text-gray-400' 
                                : 'text-gray-500'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className={`flex-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newMessage.trim()) {
                          const newMsg = {
                            id: messages.length + 1,
                            sender: 'student',
                            message: newMessage,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            avatar: null
                          }
                          setMessages([...messages, newMsg])
                          setNewMessage('')
                        }
                      }}
                    />
                    <Button 
                      size="icon"
                      onClick={() => {
                        if (newMessage.trim()) {
                          const newMsg = {
                            id: messages.length + 1,
                            sender: 'student',
                            message: newMessage,
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            avatar: null
                          }
                          setMessages([...messages, newMsg])
                          setNewMessage('')
                        }
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Macro Tracking Chart Modal */}
        {showMacroChart && (
          <Dialog open={showMacroChart} onOpenChange={setShowMacroChart}>
            <DialogContent className={`max-w-md ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
              <DialogHeader>
                <DialogTitle className={`flex items-center space-x-2 ${darkMode ? 'text-white' : ''}`}>
                  <ChefHat className="h-5 w-5 text-green-600" />
                  Today's Macro Breakdown
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Macro Overview Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className={`p-3 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <p className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}>Protein</p>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>{macroData.protein.current}g</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-blue-700'}`}>of {macroData.protein.target}g</p>
                  </div>
                  <div className={`p-3 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                    <p className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-green-600'}`}>Carbs</p>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-green-900'}`}>{macroData.carbs.current}g</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-green-700'}`}>of {macroData.carbs.target}g</p>
                  </div>
                  <div className={`p-3 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                    <p className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-orange-600'}`}>Fat</p>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-orange-900'}`}>{macroData.fat.current}g</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-orange-700'}`}>of {macroData.fat.target}g</p>
                  </div>
                </div>

                {/* Visual Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Protein</span>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{macroData.protein.percentage}%</span>
                    </div>
                    <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${macroData.protein.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Carbohydrates</span>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{macroData.carbs.percentage}%</span>
                    </div>
                    <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                      <div 
                        className="bg-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${macroData.carbs.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Fat</span>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{macroData.fat.percentage}%</span>
                    </div>
                    <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3`}>
                      <div 
                        className="bg-orange-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${macroData.fat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Circular Progress Chart */}
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke={darkMode ? "#374151" : "#e5e7eb"}
                        strokeWidth="8"
                        fill="none"
                      />
                      {/* Protein arc */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${macroData.protein.percentage * 3.14} 314`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      {/* Carbs arc */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${macroData.carbs.percentage * 3.14} 314`}
                        strokeDashoffset={`-${macroData.protein.percentage * 3.14}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      {/* Fat arc */}
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${macroData.fat.percentage * 3.14} 314`}
                        strokeDashoffset={`-${(macroData.protein.percentage + macroData.carbs.percentage) * 3.14}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {Math.round((macroData.protein.percentage + macroData.carbs.percentage + macroData.fat.percentage) / 3)}%
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Complete</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Protein</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Carbs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fat</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className={`flex-1 ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}`}
                    onClick={() => setShowMacroChart(false)}
                  >
                    Close
                  </Button>
                  <Button className="flex-1">
                    Log Food
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </Tabs>   {/* ← add this line */}


      </div>
    </div>
  )
}
