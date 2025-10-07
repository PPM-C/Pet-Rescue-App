import api from './api'

export const getPets = () => api.get('/pets').then(r => r.data)
export const getPet = (id) => api.get(`/pets/${id}`).then(r => r.data)
export const createPet = (payload) => api.post('/pets', payload).then(r => r.data)
export const updatePet = (id, payload) => api.put(`/pets/${id}`, payload).then(r => r.data)
export const deletePet = (id) => api.delete(`/pets/${id}`).then(r => r.data)
