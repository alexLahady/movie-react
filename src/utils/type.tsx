export interface Movie {
  //id : number;
  title: string;
  poster_path : string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface UserMovie extends Movie {
  userId: number;
}

export let apiUrl = process.env.REACT_APP_BASE_URL || '';