import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"
import { listAllUsersService, registerUserService } from "@/lib/services/userService"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const users = await listAllUsersService(search)
    return createApiResponse(true, users, "Users retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request) {
  try {
    const body = await validateJsonBody(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    const validationError = validateRequiredFields(body, ["name", "email", "user", "pwd", "level"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    const newUser = await registerUserService(body)
    return createApiResponse(true, newUser, "User created successfully", undefined, 201)
  } catch (error) {
    if (error.code === 11000) {
      return createApiResponse(false, null, undefined, "User with this username or email already exists", 409)
    }
    return handleApiError(error)
  }
} 