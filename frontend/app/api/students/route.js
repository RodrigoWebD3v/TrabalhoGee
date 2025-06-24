import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"
import { getStudentsService, createStudentService } from "@/lib/services/studentService"

export async function GET(request) {
  try {
    const students = await getStudentsService()
    return createApiResponse(true, students, "Students retrieved successfully")
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

    const validationError = validateRequiredFields(body, ["name", "age", "parents", "phone_number", "special_needs"])
    if (validationError) {
      return createApiResponse(false, null, undefined, validationError, 400)
    }

    // Validate age is a positive number
    const age = Number.parseInt(body.age)
    if (isNaN(age) || age <= 0 || age > 100) {
      return createApiResponse(false, null, undefined, "Age must be a valid number between 1 and 100", 400)
    }

    const newStudent = await createStudentService(body)
    return createApiResponse(true, newStudent, "Student created successfully", undefined, 201)
  } catch (error) {
    return handleApiError(error)
  }
} 