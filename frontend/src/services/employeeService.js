import api from '../api/axios';

export const fetchEmployees = (sortBy, order) =>
  api.get('/employees', { params: { sortBy, order } }).then((res) => res.data);

export const addEmployee = (data) =>
  api.post('/employees', data).then((res) => res.data);

export const editEmployee = (id, data) =>
  api.put(`/employees/${id}`, data).then((res) => res.data);

export const removeEmployee = (id) =>
  api.delete(`/employees/${id}`).then((res) => res.data);