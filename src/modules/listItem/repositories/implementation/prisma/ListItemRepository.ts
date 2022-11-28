import { PrismaClient } from '@prisma/client';

import {
  IListItem,
  IListItemCreate,
  IListItemUpdate,
} from '../../../interfaces/IListItem';
import { IListItemRepository } from '../../../interfaces/IListItemRepository';

const prisma = new PrismaClient().listItem;

export default function (): IListItemRepository {
  async function findById(id: string): Promise<IListItem | null> {
    return prisma.findFirst({ where: { id } });
  }

  async function create(data: IListItemCreate): Promise<IListItem> {
    return prisma.create({
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
  }

  async function update(data: IListItemUpdate): Promise<IListItem> {
    return prisma.update({
      where: { id: data.id },
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
  }

  async function deleteById(id: string): Promise<IListItem> {
    return prisma.delete({ where: { id } });
  }

  return {
    findById,
    create,
    update,
    deleteById,
  };
}
