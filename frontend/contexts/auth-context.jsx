"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { loginUser } from "@/api/authApi"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("gee-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const {data, status} = await loginUser({ user: username, pwd: password });
      if (status == 200 && data.user && data.token) {
        const userWithToken = { ...data.user, token: data.token };
        setUser(userWithToken);
        localStorage.setItem("gee-user", JSON.stringify(userWithToken));
        return true;
      }
    } catch (e) {}
    return false;
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