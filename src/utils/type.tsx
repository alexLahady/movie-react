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


 export interface CookieUser {
  id : number,
  name : string,
  iat: number,
  exp: number;
}


export let apiUrl = 
  process.env.NODE_ENV === "production" 
  ? process.env.REACT_APP_BASE_URL_PROD 
  : process.env.REACT_APP_BASE_URL_DEV;
