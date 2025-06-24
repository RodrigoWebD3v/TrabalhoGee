import { findUserByUsernameRepository } from "../repository/userRepository"


export async function authenticateUserCredentialsService(body) {
  console.log("Chegoua aqui")
  const {username, password} = body 
  const user = await findUserByUsernameRepository(username)
  if (!user) return null
  const isMatch = await user.comparePassword(password)
  if (!isMatch) return null
  return getUserDetailsRepository(String(user._id))
} 