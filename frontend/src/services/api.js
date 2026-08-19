import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);

export const blogAPI = {
  getAll: async () => {
    const response = await api.get('/api/blogs');
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/api/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Blog created successfully!');
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/api/blogs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Blog updated successfully!');
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/blogs/${id}`);
    toast.success('Blog deleted successfully!');
    return response.data;
  },
};

export const eventAPI = {
  getAll: async () => {
    const response = await api.get('/api/events');
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post('/api/events', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Event created successfully!');
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/api/events/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success('Event updated successfully!');
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/events/${id}`);
    toast.success('Event deleted successfully!');
    return response.data;
  },
};

export default api;