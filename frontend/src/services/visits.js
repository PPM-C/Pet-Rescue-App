import api from "./api";

export const getVisits = () => api.get("/visits").then(r => r.data);

export const createVisit = (payload) =>
  api.post("/visits", payload).then(r => r.data);

export const updateVisit = (id, payload) =>
  api.put(`/visits/${id}`, payload).then(r => r.data);

export const deleteVisit = (id) =>
  api.delete(`/visits/${id}`).then(r => r.data);
