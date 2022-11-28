import { PrismaClient } from '@prisma/client';

import { IUserRepository } from '../../../interfaces/IUserRepository';
import { IUser } from '../../../interfaces/IUser';

const prisma = new PrismaClient().user;

export function UserRepository(): IUserRepository {
  async function findAll(): Promise<IUser[]> {
    return prisma.findMany();
  }

  async function findById(id: string): Promise<IUser | null> {
    return prisma.findFirst({ where: { id: id } });
  }

  async function findByUsername(username: string): Promise<IUser | null> {
    return prisma.findFirst({ where: { username: username } });
  }

  async function findByEmail(email: string): Promise<IUser | null> {
    return prisma.findFirst({ where: { email: email } });
  }

  async function create(data: IUser): Promise<IUser> {
    return prisma.create({
      data: {
        id: String(data.id),
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
  }

  async function update(data: IUser): Promise<IUser> {
    return prisma.update({
      where: { id: data.id },
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
  }

  async function deleteById(id: string): Promise<void> {
    await prisma.delete({ where: { id: id } });
  }

  return {
    findAll,
    findById,
    findByUsername,
    findByEmail,
    create,
    update,
    deleteById,
  };
}
