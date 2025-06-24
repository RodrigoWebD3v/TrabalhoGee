import User from "../models/User.js"
import connectDB from "../mongodb.js"

export async function listAllUsersRepository() {
  await connectDB()
  return User.find({}).sort({ createdAt: -1 })
}

export async function getUserDetailsRepository(id) {
  await connectDB()
  return User.findById(id)
}

export async function registerUserRepository(userData) {
  await connectDB()
  const user = new User(userData)
  return user.save()
}

export async function updateUserDetailsRepository(id, userData) {
  await connectDB()
  return User.findByIdAndUpdate(id, userData, { new: true, runValidators: true })
}

export async function removeUserRepository(id) {
  await connectDB()
  const result = await User.findByIdAndDelete(id)
  return !!result
}

export async function findUserByUsernameRepository(username) {
  await connectDB()
  return User.findOne({ user: username }).select("+pwd")
} 