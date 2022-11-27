import { IListCreate } from '../interfaces/IList';
import { logger } from '../../../shared/logger';
import { httpStatusCodes } from '../../../shared/constants/httpStatusCodes';
import { AppError } from '../../../shared/errors/AppError';
import { generateUniqueId } from '../../../shared/functions';
import { ListRepository } from '../repositories/implementation/prisma/ListRepository';
import { UserController } from '../../user/controllers/UserController';
import { RedisCache } from '../../../shared/cache/RedisCache';

export class CreateListService {
  constructor(
    private readonly userController: UserController,
    private readonly listRepository: ListRepository,
  ) {}

  async execute({
    userId,
    title,
    description,
    category,
  }: IListCreate): Promise<void> {
    logger.info(`[API]: Creating list`);

    const listKey = process.env.REDIS_LIST_KEY || '';
    const redisCache = new RedisCache();

    const user = await this.userController.findById(userId);
    if (!user) {
      throw new AppError('User not found', httpStatusCodes.NOT_FOUND);
    }

    const id = generateUniqueId('LIST');

    const listToCreate = {
      id,
      userId,
      title,
      description,
      category,
    };

    try {
      await this.listRepository.create(listToCreate);
      await redisCache.remove(listKey);
      logger.info('Successfully created List');
    } catch (err) {
      logger.error('Failed to create List');
      throw new AppError('Unable to create List', httpStatusCodes.NOT_FOUND);
    }
  }
}
