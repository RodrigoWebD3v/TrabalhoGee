import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createApiResponse, handleApiError, validateJsonBody } from "@/lib/api-utils"
import type { UpdateTeacherRequest } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Teacher ID is required", 400)
    }

    const teacher = await db.getTeacherById(id)

    if (!teacher) {
      return createApiResponse(false, null, undefined, "Teacher not found", 404)
    }

    return createApiResponse(true, teacher, "Teacher retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Teacher ID is required", 400)
    }

    const body = await validateJsonBody<UpdateTeacherRequest>(request)

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

    const updatedTeacher = await db.updateTeacher(id, body)

    if (!updatedTeacher) {
      return createApiResponse(false, null, undefined, "Teacher not found", 404)
    }

    return createApiResponse(true, updatedTeacher, "Teacher updated successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Teacher ID is required", 400)
    }

    const deleted = await db.deleteTeacher(id)

    if (!deleted) {
      return createApiResponse(false, null, undefined, "Teacher not found", 404)
    }

    return createApiResponse(true, null, "Teacher deleted successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
