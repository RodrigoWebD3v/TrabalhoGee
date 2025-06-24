import { createApiResponse, handleApiError, validateJsonBody, validateRequiredFields } from "@/lib/api-utils"
import { getAppointmentsService, createAppointmentService } from "@/lib/services/appointmentService"

export async function GET() {
  const response = await fetch('http://localhost:3000/api/appointments');
  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
}

export async function POST(request) {
  const body = await request.json();
  const response = await fetch('http://localhost:3000/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
} 