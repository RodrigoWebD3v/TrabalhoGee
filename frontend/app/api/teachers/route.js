import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/utils/api-utils"

export async function GET(request) {
  try {
    // Mock: retorna lista fake de professores
    const teachers = [
      { id: 1, name: "Professor 1", school_disciplines: ["Matemática"] },
      { id: 2, name: "Professor 2", school_disciplines: ["Português"] },
    ]
    return createApiResponse(true, teachers, "Teachers retrieved successfully")
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

    const validationError = validateRequiredFields(body, ["name", "school_disciplines", "contact", "phone_number"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    // Mock: cria professor fake
    const newTeacher = { id: Date.now(), ...body }
    return createApiResponse(true, newTeacher, "Teacher created successfully", undefined, 201)
  } catch (error) {
    return handleApiError(error)
  }
} 