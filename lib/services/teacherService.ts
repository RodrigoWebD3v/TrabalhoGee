import type { CreateTeacherRequest, UpdateTeacherRequest } from "../types"
import { getTeachersRepository, getTeacherByIdRepository, createTeacherRepository, updateTeacherRepository, deleteTeacherRepository } from "../repository/teacherRepository"
import type { ITeacher } from "../models/Teacher"

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