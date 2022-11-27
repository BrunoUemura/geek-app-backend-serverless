import { generateUniqueId } from '../../../../../shared/functions';
import { IUser, IUserCreate, IUserUpdate } from '../../../interfaces/IUser';
import { IUserRepository } from '../../../interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  users: IUser[] = [];

  async findById(id: string): Promise<IUser> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.users.find(user => user.email === email);
  }

  async create(data: IUserCreate): Promise<IUser> {
    const user: IUser = {
      id: generateUniqueId('USER'),
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async update(id: string, data: IUserUpdate): Promise<IUser> {
    const user = this.users.find(user => user.id === id);

    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    user.updatedAt = new Date();

    return user;
  }
}
