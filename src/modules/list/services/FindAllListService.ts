import { RedisCache } from '../../../shared/cache/RedisCache';
import { logger } from '../../../shared/logger';
import { IList } from '../interfaces/IList';
import { ListRepository } from '../repositories/implementation/prisma/ListRepository';

export class FindAllListService {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(): Promise<IList[]> {
    logger.info(`[API]: Find All Lists`);

    const listKey = process.env.REDIS_LIST_KEY || '';
    const redisCache = new RedisCache();

    let list = await redisCache.get<IList[]>(listKey);

    if (!list) {
      list = await this.listRepository.findAll();
      await redisCache.save(listKey, list);
    }

    return list;
  }
}
