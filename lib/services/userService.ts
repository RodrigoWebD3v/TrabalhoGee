import type { CreateUserRequest, UpdateUserRequest } from "../types"
import {
  listAllUsersRepository,
  getUserDetailsRepository,
  registerUserRepository,
  updateUserDetailsRepository,
  removeUserRepository,
  findUserByUsernameRepository,
} from "../repository/userRepository"
import type { IUser } from "../models/User"

export async function listAllUsersService(): Promise<IUser[]> {
  return listAllUsersRepository()
}

export async function getUserDetailsService(id: string): Promise<IUser | null> {
  return getUserDetailsRepository(id)
}

export async function registerUserService(userData: CreateUserRequest): Promise<IUser> {
  return registerUserRepository(userData)
}

export async function updateUserDetailsService(id: string, userData: UpdateUserRequest): Promise<IUser | null> {
  return updateUserDetailsRepository(id, userData)
}

export async function removeUserService(id: string): Promise<boolean> {
  return removeUserRepository(id)
}

export async function authenticateUserCredentialsService(username: string, password: string): Promise<IUser | null> {
  const user = await findUserByUsernameRepository(username)
  if (!user) return null
  const isMatch = await user.comparePassword(password)
  if (!isMatch) return null
  return getUserDetailsRepository(String(user._id))
} 