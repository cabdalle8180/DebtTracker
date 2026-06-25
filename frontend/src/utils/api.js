// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Token management
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// User management (local storage)
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));
export const removeUser = () => localStorage.removeItem('user');

// Core fetch function with interceptors
export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

// Utility functions
export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value || 0);

export const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const statusLabel = (status) => {
  const map = {
    pending: 'PENDING',
    partial: 'PARTIAL',
    paid: 'PAID',
  };
  return map[status] || status?.toUpperCase() || 'PENDING';
};

export const statusClass = (status) => {
  if (status === 'paid') return 'bg-emerald-100 text-emerald-700';
  if (status === 'partial') return 'bg-indigo-100 text-indigo-700';
  return 'bg-red-100 text-red-600';
};
