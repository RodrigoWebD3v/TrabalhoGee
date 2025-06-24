import Teacher from "../models/Teacher.js"
import connectDB from "../mongodb.js"

export async function getTeachersRepository() {
  await connectDB()
  return Teacher.find({}).sort({ createdAt: -1 })
}

export async function getTeacherByIdRepository(id) {
  await connectDB()
  return Teacher.findById(id)
}

export async function createTeacherRepository(teacherData) {
  await connectDB()
  const teacher = new Teacher(teacherData)
  return teacher.save()
}

export async function updateTeacherRepository(id, teacherData) {
  await connectDB()
  return Teacher.findByIdAndUpdate(id, teacherData, { new: true, runValidators: true })
}

export async function deleteTeacherRepository(id) {
  await connectDB()
  const result = await Teacher.findByIdAndDelete(id)
  return !!result
} 