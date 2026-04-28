import axios from 'axios';
import { URL } from '@env';
import { getToken, removeToken } from './token';
import { store } from '../../app/store/store';
import { saveCartToStorage } from '../../features/cart/services/cartStorage';
import { navigationRef } from '../../app/navigation/navigationRef';

export const apiClient = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.status === 401) {
      const currentCart = store.getState().cart.items;

     
      await saveCartToStorage(currentCart);
      await removeToken();

      if (navigationRef.isReady()) {
        navigationRef.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    }

    return Promise.reject(error);
  },
);