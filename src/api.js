import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tokenApi = {
  create: (data) => api.post('/tokens/create', data),
  getDetails: (tokenId) => api.get(`/tokens/${tokenId}`),
  getStatus: (tokenId) => api.get(`/tokens/${tokenId}/status`),
  getNotifications: (tokenId) => api.get(`/tokens/${tokenId}/notifications`),
  updatePriority: (tokenId, priority) => api.post(`/tokens/${tokenId}/priority`, { priority }),
  confirmService: (tokenId) => api.post(`/tokens/${tokenId}/confirm-service`),
  getHistory: () => api.get('/tokens/history'),
};

export const queueApi = {
  getStatus: () => api.get('/queue/status'),
};

export const supportApi = {
  createRequest: (data) => api.post('/support/request', data),
};

export const feedbackApi = {
  submit: (data) => api.post('/feedback', data),
};

export default api;
