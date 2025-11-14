import { Movie, DeleteMovie } from '../types/movies';

// Récupère la liste des film populaire par l'Api externe
const getMovies = (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json());
};

//Ajoute en favorie le film de l'utilisateur
const postMoviesUser = (url: string, data: Movie) => {
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

//Supprime le film favori de l'utilisateur
const deleteMoviesUser = (url: string, data: DeleteMovie) => {
  return fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const moviesServices = {
  getMovies: (url: string) => getMovies(url),
  postMoviesUser: (url: string, dataMovie: Movie) => postMoviesUser(url, dataMovie),
  deleteMoviesUser: (url: string, dataDelete: DeleteMovie) => deleteMoviesUser(url, dataDelete),
};
