import { apiFetch } from '../utils/api';

export const debtService = {
  async getAll() {
    const data = await apiFetch('/api/debts');
    return data.debts || [];
  },

  async getById(id) {
    const data = await apiFetch(`/api/debts/${id}`);
    return data;
  },

  async create(debt) {
    return apiFetch('/api/debts', {
      method: 'POST',
      body: JSON.stringify(debt),
    });
  },

  async update(id, debt) {
    return apiFetch(`/api/debts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(debt),
    });
  },

  async delete(id) {
    return apiFetch(`/api/debts/${id}`, {
      method: 'DELETE',
    });
  },

  async markAsPaid(id) {
    return apiFetch(`/api/debts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'paid' }),
    });
  }
};
