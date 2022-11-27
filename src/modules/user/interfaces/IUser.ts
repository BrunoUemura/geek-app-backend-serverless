export interface IUser {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreate {
  username: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  message: string;
  token: string;
  user: IUser;
}
