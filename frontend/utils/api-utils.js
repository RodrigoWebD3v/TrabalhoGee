// Função para padronizar a resposta da API
export function createApiResponse(success, data = null, message = undefined, error = undefined, status = 200) {
  return new Response(
    JSON.stringify({ success, data, message, error }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

// Função para lidar com erros de API
export function handleApiError(error) {
  console.error(error)
  return createApiResponse(false, null, undefined, error?.message || 'Erro interno do servidor', 500)
}

// Função para validar e obter o corpo JSON da requisição
export async function validateJsonBody(request) {
  try {
    const body = await request.json()
    return body
  } catch (error) {
    return null
  }
}

// Função para validar campos obrigatórios em um objeto
export function validateRequiredFields(obj, fields) {
  for (const field of fields) {
    if (!obj?.[field]) {
      return `Campo obrigatório ausente: ${field}`
    }
  }
  return null
} 