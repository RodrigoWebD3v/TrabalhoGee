import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse } from "./types"

export function createApiResponse<T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string,
  status = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success,
      data,
      message,
      error,
    },
    { status },
  )
}

export function handleApiError(error: unknown): NextResponse<ApiResponse<null>> {
  console.error("API Error:", error)

  if (error instanceof Error) {
    return createApiResponse(false, null, undefined, error.message, 500)
  }

  return createApiResponse(false, null, undefined, "Internal server error", 500)
}

export async function validateJsonBody<T>(request: NextRequest): Promise<T | null> {
  try {
    const body = await request.json()
    return body as T
  } catch (error) {
    return null
  }
}

export function validateRequiredFields(data: Record<string, any>, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === "string" && data[field].trim() === "")) {
      return `Field '${field}' is required`
    }
  }
  return null
}

export function extractIdFromUrl(url: string): string | null {
  const segments = url.split("/")
  const id = segments[segments.length - 1]
  return id && id !== "api" ? id : null
}
