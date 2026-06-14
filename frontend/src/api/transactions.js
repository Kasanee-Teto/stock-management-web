import api from './axios';

export const purchase = (data) => api.post('/transactions', data);
export const getMyTransactions = () => api.get('/transactions/mine');
export const getAllTransactions = () => api.get('/transactions');
