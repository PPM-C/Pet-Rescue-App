import { api } from './client'

export function listAdoptionRequests({ petId, adopterId, status, page=1, size=10 }={}) {
  const qs = new URLSearchParams()
  if (petId) qs.set('petId', petId)
  if (adopterId) qs.set('adopterId', adopterId)
  if (status) qs.set('status', status)
  qs.set('page', page); qs.set('size', size)
  return api.get(`/adoption-requests?${qs.toString()}`)
}

// Form público: puede enviar { adopterId, petName, message } o { adopterId, petId, message }
export const createAdoptionRequest = (dto)=> api.post('/adoption-requests', dto)

export const approveRequest = (id, reason)=> api.post(`/adoption-requests/${id}/approve`, reason ? { reason } : undefined)
export const rejectRequest  = (id, reason)=> api.post(`/adoption-requests/${id}/reject`,  reason ? { reason } : undefined)
export const cancelRequest  = (id, reason)=> api.post(`/adoption-requests/${id}/cancel`,  reason ? { reason } : undefined)
