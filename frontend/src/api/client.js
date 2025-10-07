const BASE = import.meta.env.VITE_API_BASE ?? '/api'

async function request(path, { method='GET', body, headers={} } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined
  })
  let data = null
  const text = await res.text().catch(()=>'')
  if (text) { try { data = JSON.parse(text) } catch { data = text } }
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `${res.status} ${res.statusText}`
    throw new Error(msg)
  }
  return data
}

export const api = {
  get: (p)=>request(p),
  post:(p,b)=>request(p,{method:'POST',body:b}),
  put: (p,b)=>request(p,{method:'PUT',body:b}),
  del: (p)=>request(p,{method:'DELETE'})
}
export const getHealth = ()=> api.get('/health')
