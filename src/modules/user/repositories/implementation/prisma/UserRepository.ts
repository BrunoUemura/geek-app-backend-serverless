import { PrismaClient } from '@prisma/client';

import { database } from '../../../../../infra/db/prisma/connection';
import { IUserRepository } from '../../../interfaces/IUserRepository';
import { IUser, IUserCreate, IUserUpdate } from '../../../interfaces/IUser';

const prisma = new PrismaClient().user;

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<IUser | null> {
    await database.connect();
    const user = await prisma.findFirst({ where: { id: id } });
    await database.disconnect();
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    await database.connect();
    const user = await prisma.findFirst({ where: { email: email } });
    await database.disconnect();
    return user;
  }

  async create(data: IUserCreate): Promise<IUser> {
    await database.connect();
    const user = await prisma.create({
      data: {
        id: data.id,
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    await database.disconnect();
    return user;
  }

  async update(id: string, data: IUserUpdate): Promise<IUser> {
    await database.connect();
    const user = await prisma.update({
      where: { id: id },
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    await database.disconnect();
    return user;
  }
}
