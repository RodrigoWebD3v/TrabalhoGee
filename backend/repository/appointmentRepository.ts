import Appointment, { IAppointment } from "../models/Appointment.ts"
import connectDB from "../mongodb.ts"
import type { CreateAppointmentRequest, UpdateAppointmentRequest } from "../types.ts"

export async function getAppointmentsRepository(): Promise<IAppointment[]> {
  await connectDB()
  return Appointment.find({}).sort({ date: 1 })
}

export async function getAppointmentByIdRepository(id: string): Promise<IAppointment | null> {
  await connectDB()
  return Appointment.findById(id)
}

export async function createAppointmentRepository(appointmentData: CreateAppointmentRequest): Promise<IAppointment> {
  await connectDB()
  const appointment = new Appointment(appointmentData)
  return appointment.save()
}

export async function updateAppointmentRepository(id: string, appointmentData: UpdateAppointmentRequest): Promise<IAppointment | null> {
  await connectDB()
  return Appointment.findByIdAndUpdate(id, appointmentData, { new: true, runValidators: true })
}

export async function deleteAppointmentRepository(id: string): Promise<boolean> {
  await connectDB()
  const result = await Appointment.findByIdAndDelete(id)
  return !!result
} 
