import type { NextRequest } from "next/server"
import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"
import type { CreateProfessionalRequest } from "@/lib/types"
import { getProfessionalsService, createProfessionalService } from "@/lib/services/professionalService"

export async function GET(request: NextRequest) {
  try {
    const professionals = await getProfessionalsService()
    return createApiResponse(true, professionals, "Professionals retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await validateJsonBody<CreateProfessionalRequest>(request)

    if (!body) {
      return createApiResponse(false, null, undefined, "Invalid JSON body", 400)
    }

    const validationError = validateRequiredFields(body, ["name", "specialty", "contact", "phone_number"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    // Validação de email pode ser feita no service se necessário
    const newProfessional = await createProfessionalService(body)
    return createApiResponse(true, newProfessional, "Professional created successfully", undefined, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
