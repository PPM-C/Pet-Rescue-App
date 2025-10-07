import api from './api'

export const getAdoptionRequests = () => api.get('/adoption-requests').then(r => r.data)
export const createAdoptionRequest = (payload) => api.post('/adoption-requests', payload).then(r => r.data)
