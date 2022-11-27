import { logger } from '../../../shared/logger';
import { httpStatusCodes } from '../../../shared/constants/httpStatusCodes';
import { AppError } from '../../../shared/errors/AppError';
import { IListItemUpdate } from '../interfaces/IListItem';
import { ListItemRepository } from '../repositories/implementation/prisma/ListItemRepository';
import { ListRepository } from '@src/modules/list/repositories/implementation/prisma/ListRepository';
import { RedisCache } from '../../../shared/cache/RedisCache';

export class UpdateListItemService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly listItemRepository: ListItemRepository,
  ) {}

  async execute({
    id,
    listId,
    title,
    season,
    episode,
    chapter,
    link,
    image,
  }: IListItemUpdate): Promise<void> {
    logger.info(`[API]: Updating list item`);

    const listKey = process.env.REDIS_LIST_KEY || '';
    const redisCache = new RedisCache();

    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new AppError('List not found', httpStatusCodes.NOT_FOUND);
    }

    const listItem = await this.listItemRepository.findById(id);
    if (!listItem) {
      throw new AppError('List item not found', httpStatusCodes.NOT_FOUND);
    }

    const listItemToUpdate = {
      title,
      season,
      episode,
      chapter,
      link,
      image,
    };

    try {
      await this.listItemRepository.update(id, listItemToUpdate);
      await redisCache.remove(listKey);
      logger.info('Successfully updated List Item');
    } catch (err) {
      logger.error('Failed to update List Item');
      throw new AppError(
        'Unable to update List Item',
        httpStatusCodes.NOT_FOUND,
      );
    }
  }
}
