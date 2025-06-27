import axios from "axios";
import "dotenv/config";

const URL = "http://localhost:3001/api";

export async function fetchUsers() {
    const res = await axios.get(`${URL}/users`);
    return res;
}

export async function createUser(user) {
    const rest = await axios.post(`${URL}/users`, user);
    return rest;
}

export async function updateUser(id, user) {
  const res = await axios.put(`${URL}/users/${id}`, user);
  return res;
}

export async function deleteUser(id) {
  const res = await axios.delete(`${URL}/users/${id}`);
  return res;
}
