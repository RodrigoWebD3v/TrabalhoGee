import type { NextRequest } from "next/server"
import { dbService } from "@/lib/database-service"
import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"

interface LoginRequest {
  username: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await validateJsonBody<LoginRequest>(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    const validationError = validateRequiredFields(body, ["username", "password"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    const user = await dbService.authenticateUser(body.username, body.password)

    if (!user) {
      return createApiResponse(false, null, undefined, "Invalid credentials", 401)
    }

    return createApiResponse(true, user, "Login successful")
  } catch (error) {
    return handleApiError(error)
  }
}
