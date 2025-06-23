import Teacher, { ITeacher } from "../models/Teacher.ts"
import connectDB from "../mongodb.ts"
import type { CreateTeacherRequest, UpdateTeacherRequest } from "../types.ts"

export async function getTeachersRepository(): Promise<ITeacher[]> {
  await connectDB()
  return Teacher.find({}).sort({ createdAt: -1 })
}

export async function getTeacherByIdRepository(id: string): Promise<ITeacher | null> {
  await connectDB()
  return Teacher.findById(id)
}

export async function createTeacherRepository(teacherData: CreateTeacherRequest): Promise<ITeacher> {
  await connectDB()
  const teacher = new Teacher(teacherData)
  return teacher.save()
}

export async function updateTeacherRepository(id: string, teacherData: UpdateTeacherRequest): Promise<ITeacher | null> {
  await connectDB()
  return Teacher.findByIdAndUpdate(id, teacherData, { new: true, runValidators: true })
}

export async function deleteTeacherRepository(id: string): Promise<boolean> {
  await connectDB()
  const result = await Teacher.findByIdAndDelete(id)
  return !!result
} 
