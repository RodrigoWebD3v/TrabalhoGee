import { db } from "@/lib/database"
import { createApiResponse, handleApiError, validateJsonBody } from "@/lib/api-utils"

export async function GET(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Professional ID is required", 400)
    }

    const professional = await db.getProfessionalById(id)

    if (!professional) {
      return createApiResponse(false, null, undefined, "Professional not found", 404)
    }

    return createApiResponse(true, professional, "Professional retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Professional ID is required", 400)
    }

    const body = await validateJsonBody(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    // Validate email format if provided
    if (body.contact) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.contact)) {
        return createApiResponse(false, null, undefined, "Invalid email format", 400)
      }
    }

    const updatedProfessional = await db.updateProfessional(id, body)

    if (!updatedProfessional) {
      return createApiResponse(false, null, undefined, "Professional not found", 404)
    }

    return createApiResponse(true, updatedProfessional, "Professional updated successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Professional ID is required", 400)
    }

    const deleted = await db.deleteProfessional(id)

    if (!deleted) {
      return createApiResponse(false, null, undefined, "Professional not found", 404)
    }

    return createApiResponse(true, null, "Professional deleted successfully")
  } catch (error) {
    return handleApiError(error)
  }
} 