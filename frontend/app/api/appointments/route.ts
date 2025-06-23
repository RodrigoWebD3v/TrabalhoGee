import type { NextRequest } from "next/server"
import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"
import type { CreateAppointmentRequest } from "@/lib/types"
import { getAppointmentsService, createAppointmentService } from "@/lib/services/appointmentService"

export async function GET(request: NextRequest) {
  try {
    const appointments = await getAppointmentsService()
    return createApiResponse(true, appointments, "Appointments retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await validateJsonBody<CreateAppointmentRequest>(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    const validationError = validateRequiredFields(body, ["specialty", "date", "student", "professional"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    // Validate date format
    const appointmentDate = new Date(body.date)
    if (isNaN(appointmentDate.getTime())) {
      return createApiResponse(false, null, undefined, "Invalid date format", 400)
    }

    // Check if appointment is in the future
    if (appointmentDate < new Date()) {
      return createApiResponse(false, null, undefined, "Appointment date must be in the future", 400)
    }

    const newAppointment = await createAppointmentService(body)
    return createApiResponse(true, newAppointment, "Appointment created successfully", undefined, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
