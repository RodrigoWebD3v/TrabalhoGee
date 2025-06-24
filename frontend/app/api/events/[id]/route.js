import { db } from "@/lib/database"
import { createApiResponse, handleApiError, validateJsonBody } from "@/lib/api-utils"

export async function GET(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Event ID is required", 400)
    }

    const event = await db.getEventById(id)

    if (!event) {
      return createApiResponse(false, null, undefined, "Event not found", 404)
    }

    return createApiResponse(true, event, "Event retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Event ID is required", 400)
    }

    const body = await validateJsonBody(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    // Validate date format if provided
    if (body.date) {
      const eventDate = new Date(body.date)
      if (isNaN(eventDate.getTime())) {
        return createApiResponse(false, null, undefined, "Invalid date format", 400)
      }
    }

    const updatedEvent = await db.updateEvent(id, body)

    if (!updatedEvent) {
      return createApiResponse(false, null, undefined, "Event not found", 404)
    }

    return createApiResponse(true, updatedEvent, "Event updated successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Event ID is required", 400)
    }

    const deleted = await db.deleteEvent(id)

    if (!deleted) {
      return createApiResponse(false, null, undefined, "Event not found", 404)
    }

    return createApiResponse(true, null, "Event deleted successfully")
  } catch (error) {
    return handleApiError(error)
  }
} 