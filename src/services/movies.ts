import { apiUrl } from '../types';
import { Movie, DeleteMovie } from '../types/movies';

// Récupère la liste des film populaire par l'Api externe
export const allMovies = () => {
  return fetch(`${apiUrl}/api`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((response) => response.json());
};

//Ajoute en favorie le film de l'utilisateur
export const addingMovie = (userId: number, data: Movie) => {
  return fetch(`${apiUrl}/movies/${userId}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const moviesUser = (
  userId: number,
  sort: 'title' | 'release_date' | 'vote_average' = 'title',
  order: 'asc' | 'desc' = 'asc',
) => {
  return fetch(`${apiUrl}/movies/user/${userId}?sort=${sort}&order=${order}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

//Supprime le film favori de l'utilisateur
export const deleteMovieUser = (data: DeleteMovie) => {
  return fetch(`${apiUrl}/movies/delete`, {
    method: 'DELETE',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
