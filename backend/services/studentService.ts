import type { CreateStudentRequest, UpdateStudentRequest } from "../types.ts"
import { getStudentsRepository, getStudentByIdRepository, createStudentRepository, updateStudentRepository, deleteStudentRepository } from "../repository/studentRepository.ts"
import type { IStudent } from "../models/Student.ts"

export async function getStudentsService(): Promise<IStudent[]> {
  return getStudentsRepository()
}

export async function getStudentByIdService(id: string): Promise<IStudent | null> {
  return getStudentByIdRepository(id)
}

export async function createStudentService(studentData: CreateStudentRequest): Promise<IStudent> {
  return createStudentRepository(studentData)
}

export async function updateStudentService(id: string, studentData: UpdateStudentRequest): Promise<IStudent | null> {
  return updateStudentRepository(id, studentData)
}

export async function deleteStudentService(id: string): Promise<boolean> {
  return deleteStudentRepository(id)
} 

