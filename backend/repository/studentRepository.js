import Student from "../models/Student.js"
import connectDB from "../mongodb.js"

export async function getStudentsRepository() {
  await connectDB()
  return Student.find({}).sort({ createdAt: -1 })
}

export async function getStudentByIdRepository(id) {
  await connectDB()
  return Student.findById(id)
}

export async function createStudentRepository(studentData) {
  await connectDB()
  const student = new Student(studentData)
  return student.save()
}

export async function updateStudentRepository(id, studentData) {
  await connectDB()
  return Student.findByIdAndUpdate(id, studentData, { new: true, runValidators: true })
}

export async function deleteStudentRepository(id) {
  await connectDB()
  const result = await Student.findByIdAndDelete(id)
  return !!result
} 