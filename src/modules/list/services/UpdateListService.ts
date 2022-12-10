import { logger } from '../../../shared/logger';
import { HTTP_STATUS_CODES } from '../../../shared/constants/httpStatusCodes';
import { AppError } from '../../../shared/errors/AppError';
import { IListUpdate } from '../interfaces/IList';
import { IListRepository } from '../interfaces/IListRepository';

export default function (listRepository: IListRepository) {
  async function execute({
    tokenUserId,
    id,
    title,
    description,
    category,
  }: IListUpdate) {
    logger.info(`[Service]: Updating list ${id}`);

    logger.info(`[Service]: Searching for list ${id}`);
    const list = await listRepository.findById(id);
    if (!list) {
      throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, 'List not found');
    }

    if (list.userId !== tokenUserId) {
      throw new AppError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        'User not authorized to update list',
      );
    }

    logger.info(`[Service]: Found list`);
    logger.info(`[Service]: Updating list`);
    const listToUpdate = {
      id,
      title,
      description,
      category,
    };

    return listRepository.update(listToUpdate);
  }

  return { execute };
}
