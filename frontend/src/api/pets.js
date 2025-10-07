import { api } from './client'

export function listPets({ search='', page=1, size=10 }={}) {
  const qs = new URLSearchParams()
  if (search) qs.set('search', search)
  qs.set('page', page); qs.set('size', size)
  return api.get(`/pets?${qs.toString()}`)
}
export const getPet     = (id)=> api.get(`/pets/${id}`)
export const createPet  = (dto)=> api.post('/pets', dto)
export const updatePet  = (id,dto)=> api.put(`/pets/${id}`, dto)
export const deletePet  = (id)=> api.del(`/pets/${id}`)
