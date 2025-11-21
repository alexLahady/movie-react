import { apiUrl } from '../types';

// Savoir si l'utilisateur est connecté
export const getCookie = async () => {
  const res = await fetch(`${apiUrl}/auth/profile`, {
    method: 'GET',
    credentials: 'include',
  });
  //si pas 200 envoyer null
  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  // Vérifie que data contient ce qu’on attend
  if (!data || !data.id) {
    return null;
  }

  return data;// si tout est ok envoyer le bon cookie

};

export const logout = () => {
  return fetch(`${apiUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  }).then((response) => response.json());
};
