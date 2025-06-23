"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockData } from "@/lib/mock-data"

interface User {
  id: string
  name: string
  email: string
  user: string
  level: string
  status: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem("gee-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockData.users.find((u) => u.user === username && u.pwd === password)

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        user: foundUser.user,
        level: foundUser.level,
        status: foundUser.status,
      }
      setUser(userSession)
      localStorage.setItem("gee-user", JSON.stringify(userSession))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("gee-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
