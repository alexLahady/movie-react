import { DataUser, CreateData } from '../types/users';

//Connection de l'utilisateur
const postUser = (url: string, dataUser: DataUser) => {
  return fetch(url, {
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
const postCreateUser = (url: string, createUser: CreateData) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createUser),
  });
};

export const usersServices = {
  postUser: (url: string, dataUser: DataUser) => postUser(url, dataUser),
  postCreateUser: (url: string, createUser: CreateData) => postCreateUser(url, createUser),
};
