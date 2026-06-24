import { apiFetch } from '../utils/api';

export const customerService = {
  async getAll() {
    const data = await apiFetch('/api/customers');
    return data.customers || [];
  },

  async getById(id) {
    const data = await apiFetch(`/api/customers/${id}`);
    return data;
  },

  async create(customer) {
    return apiFetch('/api/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  },

  async update(id, customer) {
    return apiFetch(`/api/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    });
  },

  async delete(id) {
    return apiFetch(`/api/customers/${id}`, {
      method: 'DELETE',
    });
  },

  async addFeedback(id, feedback) {
    return apiFetch(`/api/customers/${id}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }
};
