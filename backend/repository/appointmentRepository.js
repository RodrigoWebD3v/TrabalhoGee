import Appointment from "../models/Appointment.js"
import connectDB from "../mongodb.js"

export async function getAppointmentsRepository() {
  await connectDB()
  return Appointment.find({}).sort({ date: 1 })
}

export async function getAppointmentByIdRepository(id) {
  await connectDB()
  return Appointment.findById(id)
}

export async function createAppointmentRepository(appointmentData) {
  await connectDB()
  const appointment = new Appointment(appointmentData)
  return appointment.save()
}

export async function updateAppointmentRepository(id, appointmentData) {
  await connectDB()
  return Appointment.findByIdAndUpdate(id, appointmentData, { new: true, runValidators: true })
}

export async function deleteAppointmentRepository(id) {
  await connectDB()
  const result = await Appointment.findByIdAndDelete(id)
  return !!result
} 