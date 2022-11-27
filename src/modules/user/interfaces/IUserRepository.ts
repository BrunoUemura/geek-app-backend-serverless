import { IUser, IUserCreate, IUserUpdate } from "./IUser";

export interface IUserRepository {
  findAll: () => Promise<IUser[]>;
  findById: (id: string) => Promise<IUser | null>;
  findByEmail: (email: string) => Promise<IUser | null>;
  findByUsername: (username: string) => Promise<IUser | null>;
  create: (data: IUser) => Promise<IUser>;
  update: (data: IUser) => Promise<IUser | null>;
  deleteById: (id: string) => Promise<void>;
}
