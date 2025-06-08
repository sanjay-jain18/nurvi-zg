"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

// Mock database for users - in a real app, this would be a backend service
const USERS_STORAGE_KEY = "nurvi-users"

interface StoredUser {
  id: string
  email: string
  name: string
  password: string
  avatar?: string
  createdAt: string
}

// Initialize with some validation helpers
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPassword = (password: string) => {
  return password.length >= 6
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })
  const { toast } = useToast()

  // Initialize users if not exists
  useEffect(() => {
    if (typeof window !== "undefined") {
      const users = localStorage.getItem(USERS_STORAGE_KEY)
      if (!users) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]))
      }
    }
  }, [])

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem("nurvi-user")
    if (savedUser) {
      setState({
        user: JSON.parse(savedUser),
        isLoading: false,
        isAuthenticated: true,
      })
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Validate inputs
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return false
    }

    if (!isValidPassword(password)) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      })
      return false
    }

    try {
      // Get users from storage
      const usersJson = localStorage.getItem(USERS_STORAGE_KEY) || "[]"
      const users: StoredUser[] = JSON.parse(usersJson)

      // Find user by email
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

      // Check if user exists and password matches
      if (!user || user.password !== password) {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
        return false
      }

      // Create session user (without password)
      const sessionUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || "/placeholder.svg?height=40&width=40",
      }

      // Save to session
      localStorage.setItem("nurvi-user", JSON.stringify(sessionUser))

      setState({
        user: sessionUser,
        isLoading: false,
        isAuthenticated: true,
      })

      toast({
        title: "Welcome back!",
        description: `You've successfully logged in as ${user.name}.`,
      })

      return true
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Validate inputs
    if (!name || name.trim().length < 2) {
      toast({
        title: "Invalid name",
        description: "Please enter a valid name (at least 2 characters).",
        variant: "destructive",
      })
      return false
    }

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return false
    }

    if (!isValidPassword(password)) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      })
      return false
    }

    try {
      // Get existing users
      const usersJson = localStorage.getItem(USERS_STORAGE_KEY) || "[]"
      const users: StoredUser[] = JSON.parse(usersJson)

      // Check if email already exists
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        toast({
          title: "Registration failed",
          description: "This email is already registered. Please use a different email or login.",
          variant: "destructive",
        })
        return false
      }

      // Create new user
      const newUser: StoredUser = {
        id: `user_${Date.now()}`,
        email,
        name,
        password,
        avatar: "/placeholder.svg?height=40&width=40",
        createdAt: new Date().toISOString(),
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      // Create session user (without password)
      const sessionUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        avatar: newUser.avatar,
      }

      // Save to session
      localStorage.setItem("nurvi-user", JSON.stringify(sessionUser))

      setState({
        user: sessionUser,
        isLoading: false,
        isAuthenticated: true,
      })

      toast({
        title: "Welcome to Nurvi Jewel!",
        description: "Your account has been created successfully.",
      })

      return true
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("nurvi-user")
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return <AuthContext.Provider value={{ ...state, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
