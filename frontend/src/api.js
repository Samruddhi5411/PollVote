import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8083/api',
});

export const getPolls = () => api.get('/polls');
export const getPoll = (id) => api.get(`/polls/${id}`);
export const createPoll = (payload) => api.post('/polls', payload);
export const castVote = (optionId) => api.post(`/polls/options/${optionId}/vote`);
export const deletePoll = (id) => api.delete(`/polls/${id}`);

export default api;
