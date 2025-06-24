export async function GET() {
  const response = await fetch('http://localhost:3000/api/dashboard/stats');
  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
} 