import type { NextRequest } from "next/server"
import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"
import type { CreateEventRequest } from "@/lib/types"
import { getEventsService, createEventService } from "@/lib/services/eventService"

export async function GET(request: NextRequest) {
  try {
    const events = await getEventsService()
    return createApiResponse(true, events, "Events retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await validateJsonBody<CreateEventRequest>(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    const validationError = validateRequiredFields(body, ["description", "date"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    // Validate date format
    const eventDate = new Date(body.date)
    if (isNaN(eventDate.getTime())) {
      return createApiResponse(false, null, undefined, "Invalid date format", 400)
    }

    const newEvent = await createEventService(body)
    return createApiResponse(true, newEvent, "Event created successfully", undefined, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
