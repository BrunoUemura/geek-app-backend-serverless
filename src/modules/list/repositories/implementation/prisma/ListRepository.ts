import { PrismaClient } from '@prisma/client';

import { database } from '../../../../../infra/db/prisma/connection';
import { IList, IListCreate, IListUpdate } from '../../../interfaces/IList';
import { IListRepository } from '../../../interfaces/IListRepository';

const prisma = new PrismaClient().list;

export class ListRepository implements IListRepository {
  async findAll(): Promise<IList[]> {
    await database.connect();

    const list = await prisma.findMany({ include: { listItem: true } });

    await database.disconnect();
    return list;
  }

  async findById(id: string): Promise<IList> {
    await database.connect();

    const list = await prisma.findFirst({
      where: { id: id },
      include: { listItem: true },
    });

    await database.disconnect();
    return list;
  }

  async findByUserId(id: string): Promise<IList[]> {
    await database.connect();

    const list = await prisma.findMany({
      where: { userId: id },
      include: { listItem: true },
    });

    await database.disconnect();
    return list;
  }

  async create(data: IListCreate): Promise<IList> {
    await database.connect();

    const list = await prisma.create({
      data: {
        id: data.id,
        userId: data.userId,
        title: data.title,
        category: data.category,
        description: data.description,
      },
      include: { listItem: true },
    });

    await database.disconnect();
    return list;
  }

  async update(id: string, data: IListUpdate): Promise<IList> {
    await database.connect();

    const list = await prisma.update({
      where: { id: id },
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
      },
      include: { listItem: true },
    });

    await database.disconnect();
    return list;
  }

  async delete(id: string): Promise<IList> {
    await database.connect();

    const list = await prisma.delete({ where: { id: id } });

    await database.disconnect();
    return list;
  }
}
