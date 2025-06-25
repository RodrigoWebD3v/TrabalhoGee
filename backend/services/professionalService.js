import { getProfessionalsRepository, getProfessionalByIdRepository, createProfessionalRepository, updateProfessionalRepository, deleteProfessionalRepository } from "../repository/professionalRepository.js"

export async function getProfessionalsService() {
  return getProfessionalsRepository()
}

export async function getProfessionalByIdService(id) {
  return getProfessionalByIdRepository(id)
}

export async function createProfessionalService(professionalData) {
  return createProfessionalRepository(professionalData)
}

export async function updateProfessionalService(id, professionalData) {
  return updateProfessionalRepository(id, professionalData)
}

export async function deleteProfessionalService(id) {
  return deleteProfessionalRepository(id)
}

export async function getProfessionalDetailsService(id) {
  return getProfessionalByIdRepository(id)
}

export async function listAllProfessionalsService() {
  return getProfessionalsRepository()
} 