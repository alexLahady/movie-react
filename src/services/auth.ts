import { apiUrl } from '../types';

// Savoir si l'utilisateur est connecté
function getCookie() {
  return fetch(`${apiUrl}/auth/profile`, {
    method: 'GET',
    credentials: 'include',
  }).then((response) => response.json());
}

export const authServices = {
  getCookie: () => getCookie(),
};
