import { dbService } from "@/lib/database-service"
import { createApiResponse, handleApiError } from "@/lib/api-utils"

interface DashboardStats {
  users: number
  teachers: number
  students: number
  professionals: number
  appointments: number
  events: number
  upcomingAppointments: any[]
  upcomingEvents: any[]
}

export async function GET() {
  try {
    const stats = await dbService.getDashboardStats()
    return createApiResponse(true, stats, "Dashboard stats retrieved successfully")
  } catch (error) {
    return handleApiError(error)
  }
}
