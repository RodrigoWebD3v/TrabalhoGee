import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { createApiResponse, handleApiError, validateJsonBody } from "@/lib/api-utils"
import type { UpdateStudentRequest } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Student ID is required", 400)
    }

    const student = await db.getStudentById(id)

    if (!student) {
      return createApiResponse(false, null, undefined, "Student not found", 404)
    }

    return createApiResponse(true, student, "Student retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Student ID is required", 400)
    }

    const body = await validateJsonBody<UpdateStudentRequest>(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    // Validate age if provided
    if (body.age) {
      const age = Number.parseInt(body.age)
      if (isNaN(age) || age <= 0 || age > 100) {
        return createApiResponse(false, null, undefined, "Age must be a valid number between 1 and 100", 400)
      }
    }

    const updatedStudent = await db.updateStudent(id, body)

    if (!updatedStudent) {
      return createApiResponse(false, null, undefined, "Student not found", 404)
    }

    return createApiResponse(true, updatedStudent, "Student updated successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "Student ID is required", 400)
    }

    const deleted = await db.deleteStudent(id)

    if (!deleted) {
      return createApiResponse(false, null, undefined, "Student not found", 404)
    }

    return createApiResponse(true, null, "Student deleted successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
