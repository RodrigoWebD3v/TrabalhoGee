import type { NextRequest } from "next/server"
import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"
import type { CreateUserRequest } from "@/lib/types"
import { listAllUsersService, registerUserService } from "@/lib/services/userService"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const users = await listAllUsersService(search)
    return createApiResponse(true, users, "Users retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await validateJsonBody<CreateUserRequest>(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    const validationError = validateRequiredFields(body, ["name", "email", "user", "pwd", "level"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    const newUser = await registerUserService(body)
    return createApiResponse(true, newUser, "User created successfully", undefined, 201)
  } catch (error: any) {
    if (error.code === 11000) {
      return createApiResponse(false, null, undefined, "User with this username or email already exists", 409)
    }
    return handleApiError(error)
  }
}
