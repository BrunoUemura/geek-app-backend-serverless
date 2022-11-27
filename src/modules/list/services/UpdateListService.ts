import { logger } from '../../../shared/logger';
import { httpStatusCodes } from '../../../shared/constants/httpStatusCodes';
import { AppError } from '../../../shared/errors/AppError';
import { IListUpdate } from '../interfaces/IList';
import { ListRepository } from '../repositories/implementation/prisma/ListRepository';
import { RedisCache } from '../../../shared/cache/RedisCache';

export class UpdateListService {
  constructor(private readonly listRepository: ListRepository) {}

  async execute({
    id,
    title,
    description,
    category,
  }: IListUpdate): Promise<void> {
    logger.info(`[API]: Updating list`);

    const listKey = process.env.REDIS_LIST_KEY || '';
    const redisCache = new RedisCache();

    const list = await this.listRepository.findById(id);
    if (!list) {
      throw new AppError('List not found', httpStatusCodes.NOT_FOUND);
    }

    const listToUpdate = {
      title,
      description,
      category,
    };

    try {
      await this.listRepository.update(id, listToUpdate);
      await redisCache.remove(listKey);
      logger.info('Successfully updated List');
    } catch (err) {
      logger.error('Failed to update List');
      throw new AppError('Unable to update List', httpStatusCodes.NOT_FOUND);
    }
  }
}
