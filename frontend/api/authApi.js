import axios from 'axios';
import 'dotenv/config';

const URL = "http://localhost:3001/api"

export async function loginUser({ user, pwd }) {
  const res = await axios.post(`${URL}/auth`, { user, pwd })
  return res
} 