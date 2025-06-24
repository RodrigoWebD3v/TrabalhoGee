import {
  listAllUsersRepository,
  getUserDetailsRepository,
  registerUserRepository,
  updateUserDetailsRepository,
  removeUserRepository,
  findUserByUsernameRepository,
} from "../repository/userRepository.js"

export async function listAllUsersService() {
  return listAllUsersRepository()
}

export async function getUserDetailsService(id) {
  return getUserDetailsRepository(id)
}

export async function registerUserService(userData) {
  return registerUserRepository(userData)
}

export async function updateUserDetailsService(id, userData) {
  return updateUserDetailsRepository(id, userData)
}

export async function removeUserService(id) {
  return removeUserRepository(id)
}

export async function authenticateUserCredentialsService(username, password) {
  const user = await findUserByUsernameRepository(username)
  if (!user) return null
  const isMatch = await user.comparePassword(password)
  if (!isMatch) return null
  return getUserDetailsRepository(String(user._id))
} 