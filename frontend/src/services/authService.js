import { apiFetch, setToken, setUser, removeToken, removeUser } from '../utils/api';

export const authService = {
  async login(credentials) {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    setToken(data.token);
    setUser(data.user);
    
    return data;
  },

  async register(userData) {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    setToken(data.token);
    setUser(data.user);
    
    return data;
  },

  logout() {
    removeToken();
    removeUser();
  }
};
