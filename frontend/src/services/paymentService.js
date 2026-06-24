import { apiFetch } from '../utils/api';

export const paymentService = {
  async getAll() {
    const data = await apiFetch('/api/payments');
    return data.payments || [];
  },

  async getById(id) {
    const data = await apiFetch(`/api/payments/${id}`);
    return data;
  },

  async create(payment) {
    return apiFetch('/api/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  },

  async update(id, payment) {
    return apiFetch(`/api/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payment),
    });
  },

  async delete(id) {
    return apiFetch(`/api/payments/${id}`, {
      method: 'DELETE',
    });
  }
};
