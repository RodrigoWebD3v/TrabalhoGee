import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/utils/api-utils"

export async function GET(request) {
  try {
    // Mock: retorna lista fake de profissionais
    const professionals = [
      { id: 1, name: "Profissional 1", specialty: "Psicólogo" },
      { id: 2, name: "Profissional 2", specialty: "Fonoaudiólogo" },
    ]
    return createApiResponse(true, professionals, "Professionals retrieved successfully")
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

    const validationError = validateRequiredFields(body, ["name", "specialty", "contact", "phone_number"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    // Mock: cria profissional fake
    const newProfessional = { id: Date.now(), ...body }
    return createApiResponse(true, newProfessional, "Professional created successfully", undefined, 201)
  } catch (error) {
    return handleApiError(error)
  }
} 