const BASE = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`);
  const ct = res.headers.get('content-type');
  return ct && ct.includes('application/json') ? res.json() : res.text();
}

export const api = {
  // health
  health: () => request('/api/health'),

  // pets
  listPets: (page=0, size=50) => request(`/api/pets?page=${page}&size=${size}`),
  searchPets: (q='', page=0, size=50) => request(`/api/pets/search?q=${encodeURIComponent(q)}&page=${page}&size=${size}`),
  getPet: (id) => request(`/api/pets/${id}`),
  createPet: (payload) => request('/api/pets', { method: 'POST', body: JSON.stringify(payload) }),
  updatePet: (id, payload) => request(`/api/pets/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deletePet: (id) => request(`/api/pets/${id}`, { method: 'DELETE' }),

  // adopters
  listAdopters: (page=0, size=50) => request(`/api/adopters?page=${page}&size=${size}`),
  getAdopter: (id) => request(`/api/adopters/${id}`),
  createAdopter: (payload) => request('/api/adopters', { method: 'POST', body: JSON.stringify(payload) }),
  updateAdopter: (id, payload) => request(`/api/adopters/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),

  // adoption requests
  listAdoptionRequests: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/adoption-requests${q ? `?${q}` : ''}`);
  },
  createAdoptionRequest: (payload) => request('/api/adoption-requests', { method: 'POST', body: JSON.stringify(payload) }),

  // visits
  listVisits: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/api/visits${q ? `?${q}` : ''}`);
  },
  scheduleVisit: (adoptionRequestId, payload) =>
    request(`/api/adoption-requests/${adoptionRequestId}/visits`, { method: 'POST', body: JSON.stringify(payload) }),

  cancelVisit: (visitId, notes) =>
    request(`/api/visits/${visitId}/cancel`, { method: 'PATCH', body: JSON.stringify({ notes }) }),
  rescheduleVisit: (visitId, payload) =>
    request(`/api/visits/${visitId}/reschedule`, { method: 'PATCH', body: JSON.stringify(payload) }),
};
