export interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface UserMovie extends Movie {
  userId: number;
}

export interface ApiMovies extends Movie {
  id: number;
}

export interface DeleteMovie {
  userId: number;
  title: string;
}
