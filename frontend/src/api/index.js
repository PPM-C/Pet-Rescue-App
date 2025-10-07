const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function http(path, { method='GET', body, headers } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok) {
    let text = await res.text().catch(()=> '')
    throw new Error(text || `${res.status} ${res.statusText}`)
  }
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export const api = {
  health: () => http('/api/health'),

  // Pets
  listPets: () => http('/api/pets'),
  getPet: (id) => http(`/api/pets/${id}`),
  createPet: (dto) => http('/api/pets', { method:'POST', body:dto }),
  updatePet: (id, dto) => http(`/api/pets/${id}`, { method:'PUT', body:dto }),
  deletePet: (id) => http(`/api/pets/${id}`, { method:'DELETE' }),

  // Adopters
  listAdopters: () => http('/api/adopters'),
  getAdopter: (id) => http(`/api/adopters/${id}`),
  createAdopter: (dto) => http('/api/adopters', { method:'POST', body:dto }),
  updateAdopter: (id, dto) => http(`/api/adopters/${id}`, { method:'PUT', body:dto }),
  deleteAdopter: (id) => http(`/api/adopters/${id}`, { method:'DELETE' }),

  // Adoption Requests
  listRequests: () => http('/api/adoption-requests'),
  createRequest: (dto) => http('/api/adoption-requests', { method:'POST', body:dto }),
  approveRequest: (id, reason) => http(`/api/adoption-requests/${id}/approve`, { method:'POST', body:{ reason } }),
  rejectRequest: (id, reason) => http(`/api/adoption-requests/${id}/reject`, { method:'POST', body:{ reason } }),
  cancelRequest: (id, reason) => http(`/api/adoption-requests/${id}/cancel`, { method:'POST', body:{ reason } }),

  // Visits
  listVisits: () => http('/api/visits'),
  scheduleVisit: (requestId, dto) => http(`/api/requests/${requestId}/visits`, { method:'POST', body:dto }),
  rescheduleVisit: (id, dto) => http(`/api/visits/${id}`, { method:'PUT', body:dto }),
  cancelVisit: (id, dto) => http(`/api/visits/${id}/cancel`, { method:'POST', body:dto }),
  completeVisit: (id, dto) => http(`/api/visits/${id}/complete`, { method:'POST', body:dto }),
}

export function petPlaceholder(species='Dog') {
  const map = {
    Dog: 'https://placehold.co/800x600?text=Dog',
    Cat: 'https://placehold.co/800x600?text=Cat',
    Ferret: 'https://placehold.co/800x600?text=Ferret'
  }
  return map[species] || map.Dog
}
