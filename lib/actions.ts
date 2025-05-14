"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { CreateUserData, LoginCredentials, User } from "./types"

// Mock database for demonstration purposes
const users: User[] = []

export async function createUser(userData: CreateUserData): Promise<User> {
  // In a real application, you would hash the password and store in a database
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15),
    ...userData,
    createdAt: new Date().toISOString(),
  }

  // Add user to our mock database
  users.push(newUser)

  // Return the user without the password
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword as User
}

export async function loginUser(credentials: LoginCredentials): Promise<User | null> {
  // In a real application, you would verify against a database
  const user = users.find((u) => u.email === credentials.email && u.password === credentials.password)

  if (user) {
    // Set a cookie to simulate authentication
    const cookieStore = cookies()
    cookieStore.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Return the user without the password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }

  return null
}

export async function getUserProfile(): Promise<User | null> {
  const cookieStore = cookies()
  const userId = cookieStore.get("userId")?.value

  if (!userId) {
    return null
  }

  // Find the user in our mock database
  const user = users.find((u) => u.id === userId)

  if (user) {
    // Return the user without the password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }

  return null
}

export async function logout(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete("userId")
}

export async function requireAuth() {
  const user = await getUserProfile()

  if (!user) {
    redirect("/login")
  }

  return user
}
