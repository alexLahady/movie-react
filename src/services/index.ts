//Tout les services de pour le Backend

import { getCookie } from './auth';
import { moviesUser, deleteMovieUser, allMovies, addingMovie } from './movies';
import { createUser, login } from './users';

export const indexService = {
  getCookie,
  moviesUser,
  addingMovie,
  deleteMovieUser,
  allMovies,
  createUser,
  login,
};
