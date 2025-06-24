import type { NextRequest } from "next/server"
import { dbService } from "@/lib/database-service"
import { createApiResponse, handleApiError, validateJsonBody } from "@/lib/api-utils"
import type { UpdateUserRequest } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "User ID is required", 400)
    }

    const user = await dbService.getUserById(id)

    if (!user) {
      return createApiResponse(false, null, undefined, "User not found", 404)
    }

    return createApiResponse(true, user, "User retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "User ID is required", 400)
    }

    const body = await validateJsonBody<UpdateUserRequest>(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    const updatedUser = await dbService.updateUser(id, body)

    if (!updatedUser) {
      return createApiResponse(false, null, undefined, "User not found", 404)
    }

    return createApiResponse(true, updatedUser, "User updated successfully")
  } catch (error: any) {
    if (error.code === 11000) {
      return createApiResponse(false, null, undefined, "Username or email already exists", 409)
    }
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    if (!id) {
      return createApiResponse(false, null, undefined, "User ID is required", 400)
    }

    const deleted = await dbService.deleteUser(id)

    if (!deleted) {
      return createApiResponse(false, null, undefined, "User not found", 404)
    }

    return createApiResponse(true, null, "User deleted successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
