import { getAppointmentsRepository, getAppointmentByIdRepository, createAppointmentRepository, updateAppointmentRepository, deleteAppointmentRepository } from "../repository/appointmentRepository.js"

export async function getAppointmentsService() {
  return getAppointmentsRepository()
}

export async function getAppointmentByIdService(id) {
  return getAppointmentByIdRepository(id)
}

export async function createAppointmentService(appointmentData) {
  return createAppointmentRepository(appointmentData)
}

export async function updateAppointmentService(id, appointmentData) {
  return updateAppointmentRepository(id, appointmentData)
}

export async function deleteAppointmentService(id) {
  return deleteAppointmentRepository(id)
} 