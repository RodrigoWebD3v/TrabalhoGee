import Professional, { IProfessional } from "../models/Professional"
import connectDB from "../mongodb"
import type { CreateProfessionalRequest, UpdateProfessionalRequest } from "../types"

export async function getProfessionalsRepository(): Promise<IProfessional[]> {
  await connectDB()
  return Professional.find({}).sort({ createdAt: -1 })
}

export async function getProfessionalByIdRepository(id: string): Promise<IProfessional | null> {
  await connectDB()
  return Professional.findById(id)
}

export async function createProfessionalRepository(professionalData: CreateProfessionalRequest): Promise<IProfessional> {
  await connectDB()
  const professional = new Professional(professionalData)
  return professional.save()
}

export async function updateProfessionalRepository(id: string, professionalData: UpdateProfessionalRequest): Promise<IProfessional | null> {
  await connectDB()
  return Professional.findByIdAndUpdate(id, professionalData, { new: true, runValidators: true })
}

export async function deleteProfessionalRepository(id: string): Promise<boolean> {
  await connectDB()
  const result = await Professional.findByIdAndDelete(id)
  return !!result
} 