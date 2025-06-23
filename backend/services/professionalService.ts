import type { CreateProfessionalRequest, UpdateProfessionalRequest } from "../types.ts"
import { getProfessionalsRepository, getProfessionalByIdRepository, createProfessionalRepository, updateProfessionalRepository, deleteProfessionalRepository } from "../repository/professionalRepository.ts"
import type { IProfessional } from "../models/Professional.ts"

export async function getProfessionalsService(): Promise<IProfessional[]> {
  return getProfessionalsRepository()
}

export async function getProfessionalByIdService(id: string): Promise<IProfessional | null> {
  return getProfessionalByIdRepository(id)
}

export async function createProfessionalService(professionalData: CreateProfessionalRequest): Promise<IProfessional> {
  return createProfessionalRepository(professionalData)
}

export async function updateProfessionalService(id: string, professionalData: UpdateProfessionalRequest): Promise<IProfessional | null> {
  return updateProfessionalRepository(id, professionalData)
}

export async function deleteProfessionalService(id: string): Promise<boolean> {
  return deleteProfessionalRepository(id)
} 

