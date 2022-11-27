import { logger } from '../../../shared/logger';
import { IListItem } from '../interfaces/IListItem';
import { ListItemRepository } from '../repositories/implementation/prisma/ListItemRepository';
import { RedisCache } from '../../../shared/cache/RedisCache';

export class DeleteListItemService {
  constructor(private readonly listItemRepository: ListItemRepository) {}

  async execute(id: string): Promise<IListItem> {
    logger.info(`[API]: Delete List Item by id ${id}`);

    const listKey = process.env.REDIS_LIST_KEY || '';
    const redisCache = new RedisCache();

    await redisCache.remove(listKey);

    return this.listItemRepository.delete(id);
  }
}
