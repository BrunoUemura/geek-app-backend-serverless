import { PrismaClient } from '@prisma/client';

import { database } from '../../../../../infra/db/prisma/connection';
import {
  IListItem,
  IListItemCreate,
  IListItemUpdate,
} from '../../../interfaces/IListItem';
import { IListItemRepository } from '../../../interfaces/IListItemRepository';

const prisma = new PrismaClient().listItem;

export class ListItemRepository implements IListItemRepository {
  async findById(id: string): Promise<IListItem> {
    await database.connect();

    const list = await prisma.findFirst({ where: { id } });

    await database.disconnect();
    return list;
  }

  async create(data: IListItemCreate): Promise<IListItem> {
    await database.connect();

    const list = await prisma.create({
      data: {
        id: data.id,
        listId: data.listId,
        title: data.title,
        season: data.season,
        episode: data.episode,
        chapter: data.chapter,
        link: data.link,
        image: data.image,
      },
      include: { list: true },
    });

    await database.disconnect();
    return list;
  }

  async update(id: string, data: IListItemUpdate): Promise<IListItem> {
    await database.connect();

    const list = await prisma.update({
      where: { id: id },
      data: {
        title: data.title,
        season: data.season,
        episode: data.episode,
        chapter: data.chapter,
        link: data.link,
        image: data.image,
      },
      include: { list: true },
    });

    await database.disconnect();
    return list;
  }

  async delete(id: string): Promise<IListItem> {
    await database.connect();

    const list = await prisma.delete({ where: { id } });

    await database.disconnect();
    return list;
  }
}
