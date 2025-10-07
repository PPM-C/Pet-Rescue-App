import { api } from './client'

export function listAdopters({ search='', page=1, size=10 }={}) {
  const qs = new URLSearchParams()
  if (search) qs.set('search', search)
  qs.set('page', page); qs.set('size', size)
  return api.get(`/adopters?${qs.toString()}`)
}
export const getAdopter    = (id)=> api.get(`/adopters/${id}`)
export const createAdopter = (dto)=> api.post('/adopters', dto)
export const updateAdopter = (id,dto)=> api.put(`/adopters/${id}`, dto)
export const deleteAdopter = (id)=> api.del(`/adopters/${id}`)
