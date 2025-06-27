import axios from 'axios';
import 'dotenv/config';

const URL = "http://localhost:3001/api"


export async function fetchTeachers() {
  const res = await axios.get(`${URL}/teachers`)
  return res
}

export async function createTeacher(teacher) {
  const res = await axios.post(`${URL}/teachers`, teacher)
  return res
}

export async function updateTeacher(id, teacher) {
  const res = await axios.put(`${URL}/teachers/${id}`, teacher)
  return res
}

export async function deleteTeacher(id) {
  const res = await axios.delete(`${URL}/teachers/${id}`)
  return res
} 