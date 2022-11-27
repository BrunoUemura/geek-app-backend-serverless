import { RedisCache } from '../../../shared/cache/RedisCache';
import { logger } from '../../../shared/logger';
import { IList } from '../interfaces/IList';
import { ListRepository } from '../repositories/implementation/prisma/ListRepository';

export class FindByIdListService {
  constructor(private readonly listRepository: ListRepository) {}

  async execute(id: string): Promise<IList> {
    logger.info(`[API]: Find List by id ${id}`);

    const listKey = process.env.REDIS_LIST_KEY || '';
    const redisCache = new RedisCache();

    let list = await redisCache.get<IList[]>(listKey);
    let listById = list.find(l => l.id === id);

    if (!listById) {
      listById = await this.listRepository.findById(id);
    }

    return listById;
  }
}
