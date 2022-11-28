import { PrismaClient } from '@prisma/client';

import { IList, IListCreate, IListUpdate } from '../../../interfaces/IList';
import { IListRepository } from '../../../interfaces/IListRepository';

const prisma = new PrismaClient().list;

export function ListRepository(): IListRepository {
  async function findAll(): Promise<IList[]> {
    return prisma.findMany({ include: { listItem: true } });
  }

  async function findById(id: string): Promise<IList | null> {
    return prisma.findFirst({
      where: { id: id },
      include: { listItem: true },
    });
  }

  async function findByUserId(id: string): Promise<IList[]> {
    return prisma.findMany({
      where: { userId: id },
      include: { listItem: true },
    });
  }

  async function create(data: IListCreate): Promise<IList> {
    return prisma.create({
      data: {
        id: String(data.id),
        userId: data.userId,
        title: data.title,
        category: data.category,
        description: data.description,
      },
      include: { listItem: true },
    });
  }

  async function update(data: IListUpdate): Promise<IList> {
    return prisma.update({
      where: { id: data.id },
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
      },
      include: { listItem: true },
    });
  }

  async function deleteById(id: string): Promise<void> {
    await prisma.delete({ where: { id: id } });
  }

  return {
    findAll,
    findById,
    findByUserId,
    create,
    update,
    deleteById,
  };
}
