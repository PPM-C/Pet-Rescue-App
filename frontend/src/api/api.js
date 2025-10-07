const BASE = import.meta.env.VITE_API_BASE ?? '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  })
  const text = await res.text().catch(() => '')
  let data = null
  if (text) { try { data = JSON.parse(text) } catch { data = text } }
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `${res.status} ${res.statusText}`
    throw new Error(msg)
  }
  return data
}

export const getHealth = () => request('/health')
export const createPet  = (pet) => request('/pets', { method: 'POST', body: JSON.stringify(pet) })
export const listPets   = () => request('/pets')
