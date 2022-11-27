import { logger } from '../../../shared/logger';
import { IList } from '../interfaces/IList';
import { ListRepository } from '../repositories/implementation/prisma/ListRepository';
import { RedisCache } from '../../../shared/cache/RedisCache';

export class DeleteListService {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(id: string): Promise<IList> {
    logger.info(`[API]: Delete List by id ${id}`);

    const listKey = process.env.REDIS_LIST_KEY || '';
    const redisCache = new RedisCache();

    await redisCache.remove(listKey);

    return this.listRepository.delete(id);
  }
}
