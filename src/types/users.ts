export interface DataUser {
  email: string;
  password: string;
}

export interface CreateData extends DataUser {
  name: string;
}
