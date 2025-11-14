//Tout les services de pour le Backend

import { authServices } from './auth';
import { moviesServices } from './movies';
import { usersServices } from './users';

export const indexService = {
  authServices,
  moviesServices,
  usersServices,
};
