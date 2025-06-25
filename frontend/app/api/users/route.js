import { createApiResponse, handleApiError, validateRequiredFields } from "@/utils/api-utils"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    // Mock: retorna lista fake de usuários
    const users = [
      { id: 1, name: "Usuário 1", email: "user1@email.com" },
      { id: 2, name: "Usuário 2", email: "user2@email.com" },
    ].filter(u => !search || u.name.includes(search) || u.email.includes(search))
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

    // Mock: cria usuário fake
    const newUser = { id: Date.now(), ...body }
    return createApiResponse(true, newUser, "User created successfully", undefined, 201)
  } catch (error) {
    if (error.code === 11000) {
      return createApiResponse(false, null, undefined, "User with this username or email already exists", 409)
    }
    return handleApiError(error)
  }
} 