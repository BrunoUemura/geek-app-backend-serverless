import { logger } from '../../../shared/logger';
import { httpStatusCodes } from '../../../shared/constants/httpStatusCodes';
import { AppError } from '../../../shared/errors/AppError';
import { generateUniqueId } from '../../../shared/functions';
import { ListRepository } from '../../list/repositories/implementation/prisma/ListRepository';
import { ListItemRepository } from '../repositories/implementation/prisma/ListItemRepository';
import { IListItemCreate } from '../interfaces/IListItem';
import { RedisCache } from '../../../shared/cache/RedisCache';

export class CreateListItemService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly listItemRepository: ListItemRepository,
  ) {}

  async execute({
    listId,
    title,
    season,
    episode,
    chapter,
    image,
    link,
  }: IListItemCreate): Promise<void> {
    logger.info(`[API]: Creating list`);

    const listKey = process.env.REDIS_LIST_KEY || '';
    const redisCache = new RedisCache();

    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new AppError('List not found', httpStatusCodes.NOT_FOUND);
    }

    const id = generateUniqueId('LIST_ITEM');
    const listItemToCreate = {
      id,
      listId,
      title,
      season,
      episode,
      chapter,
      image,
      link,
    };

    try {
      await this.listItemRepository.create(listItemToCreate);
      await redisCache.remove(listKey);
      logger.info('Successfully created List Item');
    } catch (err) {
      logger.error('Failed to create List Item');
      throw new AppError(
        'Unable to create List Item',
        httpStatusCodes.NOT_FOUND,
      );
    }
  }
}
