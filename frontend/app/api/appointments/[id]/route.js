export async function GET(request, { params }) {
  const response = await fetch(`http://localhost:3000/api/appointments/${params.id}`);
  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const response = await fetch(`http://localhost:3000/api/appointments/${params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
}

export async function DELETE(request, { params }) {
  const response = await fetch(`http://localhost:3000/api/appointments/${params.id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return new Response(JSON.stringify(data), { status: response.status });
} 