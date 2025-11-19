import { apiUrl } from '../types';
//import { useAuth } from '../components/auth/authContext';

//const { setUser } = useAuth();

// Savoir si l'utilisateur est connecté
export const getCookie = () => {
  return fetch(`${apiUrl}/auth/profile`, {
    method: 'GET',
    credentials: 'include',
  }).then((response) => response.json());
};

export const logout = () => {
  return fetch(`${apiUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  }).then((response) => response.json());
};
