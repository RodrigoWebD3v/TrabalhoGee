import { getTeachersRepository, getTeacherByIdRepository, createTeacherRepository, updateTeacherRepository, deleteTeacherRepository } from "../repository/teacherRepository.js"

export async function getTeachersService() {
  return getTeachersRepository()
}

export async function getTeacherByIdService(id) {
  return getTeacherByIdRepository(id)
}

export async function createTeacherService(teacherData) {
  return createTeacherRepository(teacherData)
}

export async function updateTeacherService(id, teacherData) {
  return updateTeacherRepository(id, teacherData)
}

export async function deleteTeacherService(id) {
  return deleteTeacherRepository(id)
} 