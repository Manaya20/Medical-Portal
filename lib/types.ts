export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  role: "patient" | "doctor"
  profilePicture?: string
  addressLine1: string
  city: string
  state: string
  pincode: string
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface CreateUserData {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  role: "patient" | "doctor"
  profilePicture?: string
  addressLine1: string
  city: string
  state: string
  pincode: string
}
