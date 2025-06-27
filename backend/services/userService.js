import {
  listAllUsersRepository,
  getUserDetailsRepository,
  registerUserRepository,
  updateUserDetailsRepository,
  removeUserRepository,
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

