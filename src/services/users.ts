import { apiUrl } from '../types';
import { DataUser, CreateData } from '../types/users';

//Connection de l'utilisateur
export const login = (dataUser: DataUser) => {
  return fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUser),
  });
};

//Creation de l'utilisateur
export const createUser = (dataUser: CreateData) => {
  return fetch(`${apiUrl}/users/signup`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUser),
  });
};
