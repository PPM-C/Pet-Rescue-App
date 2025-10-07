import api from './api'

export const getAdopters = () => api.get('/adopters').then(r => r.data)
export const createAdopter = (payload) => api.post('/adopters', payload).then(r => r.data)
