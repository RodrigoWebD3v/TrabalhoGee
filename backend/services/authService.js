import { comparePassword, findUserByUsernameRepository, getUserDetailsRepository } from "../repository/userRepository.js"
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

export async function authenticateUserCredentialsService(body) {
  const {user, pwd} = body 
  const userRetorno = await findUserByUsernameRepository(user)
  if (!userRetorno) return null
  const isMatch = await comparePassword(pwd, userRetorno.pwd)
  if (!isMatch) return null
  // Remove a senha do objeto retornado
  const userObj = userRetorno.toObject ? userRetorno.toObject() : userRetorno;
  delete userObj.pwd;
  // Gera o token JWT
  const token = jwt.sign({ id: userRetorno._id, user: userRetorno.user, level: userRetorno.level }, JWT_SECRET, { expiresIn: '1d' });
  return { user: userObj, token };
} 