import { ApiMovies, UserMovie } from './movies';
import { CookieUser } from './auth';

export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL_DEV;

export interface PageDataUsers {
  user: CookieUser;
  userMovies: UserMovie[];
}

export interface PageData extends PageDataUsers {
  movies: ApiMovies[];
}
