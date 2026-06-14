import api from './axios';

export const getItems = () => api.get('/items');
export const getItem = (id) => api.get(`/items/${id}`);
export const createItem = (data) => api.post('/items', data);
export const updateItem = (id, data) => api.put(`/items/${id}`, data);
export const updateStock = (id, stock) => api.patch(`/items/${id}/stock`, { stock });
export const deleteItem = (id) => api.delete(`/items/${id}`);
