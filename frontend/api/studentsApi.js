import axios from 'axios';
import 'dotenv/config';

const URL = "http://localhost:3001/api"

export async function fetchStudents() {
  const res = await axios.get(`${URL}/students`)
  return res
}

export async function createStudent(student) {
  const res = await axios.post(`${URL}/students`, student)
  return res
}

export async function updateStudent(id, student) {
  const res = await axios.put(`${URL}/students/${id}`, student)
  return res
}

export async function deleteStudent(id) {
  const res = await axios.delete(`${URL}/students/${id}`)
  return res
} 