import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"
import { getTeachersService, createTeacherService } from "@/lib/services/teacherService"

export async function GET(request) {
  try {
    const teachers = await getTeachersService()
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

    // Validação de email pode ser feita no service se necessário
    const newTeacher = await createTeacherService(body)
    return createApiResponse(true, newTeacher, "Teacher created successfully", undefined, 201)
  } catch (error) {
    return handleApiError(error)
  }
} 