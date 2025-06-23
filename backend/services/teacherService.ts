import type { CreateTeacherRequest, UpdateTeacherRequest } from "../types.ts"
import { getTeachersRepository, getTeacherByIdRepository, createTeacherRepository, updateTeacherRepository, deleteTeacherRepository } from "../repository/teacherRepository.ts"
import type { ITeacher } from "../models/Teacher.ts"

export async function getTeachersService(): Promise<ITeacher[]> {
  return getTeachersRepository()
}

export async function getTeacherByIdService(id: string): Promise<ITeacher | null> {
  return getTeacherByIdRepository(id)
}

export async function createTeacherService(teacherData: CreateTeacherRequest): Promise<ITeacher> {
  return createTeacherRepository(teacherData)
}

export async function updateTeacherService(id: string, teacherData: UpdateTeacherRequest): Promise<ITeacher | null> {
  return updateTeacherRepository(id, teacherData)
}

export async function deleteTeacherService(id: string): Promise<boolean> {
  return deleteTeacherRepository(id)
} 

