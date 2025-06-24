import { getStudentsRepository, getStudentByIdRepository, createStudentRepository, updateStudentRepository, deleteStudentRepository } from "../repository/studentRepository.js"

export async function getStudentsService() {
  return getStudentsRepository()
}

export async function getStudentByIdService(id) {
  return getStudentByIdRepository(id)
}

export async function createStudentService(studentData) {
  return createStudentRepository(studentData)
}

export async function updateStudentService(id, studentData) {
  return updateStudentRepository(id, studentData)
}

export async function deleteStudentService(id) {
  return deleteStudentRepository(id)
} 