import User, { IUser } from "../models/User"
import connectDB from "../mongodb"
import type { CreateUserRequest, UpdateUserRequest } from "../types"

export async function listAllUsersRepository(): Promise<IUser[]> {
  await connectDB()
  return User.find({}).sort({ createdAt: -1 })
}

export async function getUserDetailsRepository(id: string): Promise<IUser | null> {
  await connectDB()
  return User.findById(id)
}

export async function registerUserRepository(userData: CreateUserRequest): Promise<IUser> {
  await connectDB()
  const user = new User(userData)
  return user.save()
}

export async function updateUserDetailsRepository(id: string, userData: UpdateUserRequest): Promise<IUser | null> {
  await connectDB()
  return User.findByIdAndUpdate(id, userData, { new: true, runValidators: true })
}

export async function removeUserRepository(id: string): Promise<boolean> {
  await connectDB()
  const result = await User.findByIdAndDelete(id)
  return !!result
}

export async function findUserByUsernameRepository(username: string): Promise<IUser | null> {
  await connectDB()
  return User.findOne({ user: username }).select("+pwd")
} 