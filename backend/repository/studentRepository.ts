import Student, { IStudent } from "../models/Student"
import connectDB from "../mongodb"
import type { CreateStudentRequest, UpdateStudentRequest } from "../types"

export async function getStudentsRepository(): Promise<IStudent[]> {
  await connectDB()
  return Student.find({}).sort({ createdAt: -1 })
}

export async function getStudentByIdRepository(id: string): Promise<IStudent | null> {
  await connectDB()
  return Student.findById(id)
}

export async function createStudentRepository(studentData: CreateStudentRequest): Promise<IStudent> {
  await connectDB()
  const student = new Student(studentData)
  return student.save()
}

export async function updateStudentRepository(id: string, studentData: UpdateStudentRequest): Promise<IStudent | null> {
  await connectDB()
  return Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true })
}

export async function deleteStudentRepository(id: string): Promise<boolean> {
  await connectDB()
  const result = await Student.findByIdAndDelete(id)
  return !!result
} 