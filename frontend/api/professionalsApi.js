import axios from 'axios';
import 'dotenv/config';

const URL = "http://localhost:3001/api"


export async function fetchProfessionals() {
  const res = await axios.get(`${URL}/professionals`)
  return res
}

export async function createProfessional(professional) {
  const res = await axios.post(`${URL}/professionals`, professional)
  return res
}

export async function updateProfessional(id, professional) {
  const res = await axios.put(`${URL}/professionals/${id}`, professional)
  return res
}

export async function deleteProfessional(id) {
  const res = await axios.delete(`${URL}/professionals/${id}`)
  return res
} 