import axios from 'axios';
import 'dotenv/config';

const URL = "http://localhost:3001/api"

export async function fetchAppointments() {
  const res = await axios.get(`${URL}/appointments`)
  console.log(res)
  return res
}

export async function createAppointment(appointment) {
  const res = await axios.post(`${URL}/appointments`, appointment)
  return res
}

export async function updateAppointment(id, appointment) {
  const res = await axios.put(`${URL}/appointments/${id}`, appointment)
  return res
}

export async function deleteAppointment(id) {
  const res = await axios.delete(`${URL}/appointments/${id}`)
  return res
} 