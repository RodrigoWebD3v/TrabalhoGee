import axios from 'axios';
import 'dotenv/config';

const URL = "http://localhost:3001/api"

export async function fetchEvents() {
  const res = await axios.get(`${URL}/events`)
  return res
}

export async function createEvent(event) {
  const res = await axios.post(`${URL}/events`, event)
  return res
}

export async function updateEvent(id, event) {
  const res = await axios.put(`${URL}/events/${id}`, event)
  return res
}

export async function deleteEvent(id) {
  const res = await axios.delete(`${URL}/events/${id}`)
  return res
} 