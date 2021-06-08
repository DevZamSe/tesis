export interface authLogin {
  username: string;
  password: string;
}

export interface responseLogin {
  token: string;
  userType: number;
  username: string;
}

export interface permission {
  id: number;
  name: string;
}
