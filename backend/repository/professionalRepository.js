import Professional from "../models/Professional.js"
import connectDB from "../mongodb.js"

export async function getProfessionalsRepository() {
  await connectDB()
  return Professional.find({}).sort({ createdAt: -1 })
}

export async function getProfessionalByIdRepository(id) {
  await connectDB()
  return Professional.findById(id)
}

export async function createProfessionalRepository(professionalData) {
  await connectDB()
  const professional = new Professional(professionalData)
  return professional.save()
}

export async function updateProfessionalRepository(id, professionalData) {
  await connectDB()
  return Professional.findByIdAndUpdate(id, professionalData, { new: true, runValidators: true })
}

export async function deleteProfessionalRepository(id) {
  await connectDB()
  const result = await Professional.findByIdAndDelete(id)
  return !!result
} 