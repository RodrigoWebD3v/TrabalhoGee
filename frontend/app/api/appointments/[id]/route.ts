import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createApiResponse, handleApiError, validateJsonBody } from "@/lib/api-utils"
import type { UpdateAppointmentRequest } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Appointment ID is required", 400)
    }

    const appointment = await db.getAppointmentById(id)

    if (!appointment) {
      return createApiResponse(false, null, undefined, "Appointment not found", 404)
    }

    return createApiResponse(true, appointment, "Appointment retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Appointment ID is required", 400)
    }

    const body = await validateJsonBody<UpdateAppointmentRequest>(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    // Validate date format if provided
    if (body.date) {
      const appointmentDate = new Date(body.date)
      if (isNaN(appointmentDate.getTime())) {
        return createApiResponse(false, null, undefined, "Invalid date format", 400)
      }
    }

    const updatedAppointment = await db.updateAppointment(id, body)

    if (!updatedAppointment) {
      return createApiResponse(false, null, undefined, "Appointment not found", 404)
    }

    return createApiResponse(true, updatedAppointment, "Appointment updated successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Appointment ID is required", 400)
    }

    const deleted = await db.deleteAppointment(id)

    if (!deleted) {
      return createApiResponse(false, null, undefined, "Appointment not found", 404)
    }

    return createApiResponse(true, null, "Appointment deleted successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
