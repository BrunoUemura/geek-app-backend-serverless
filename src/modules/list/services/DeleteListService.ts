import { HTTP_STATUS_CODES } from '../../../shared/constants/httpStatusCodes';
import { AppError } from '../../../shared/errors/AppError';
import { logger } from '../../../shared/logger';
import { IListRepository } from '../interfaces/IListRepository';

export default function (listRepository: IListRepository) {
  async function execute(tokenUserId: string, id: string): Promise<void> {
    const list = await listRepository.findById(id);
    if (!list) {
      throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, 'List not found');
    }

    if (list.userId !== tokenUserId) {
      throw new AppError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        'User not authorized to delete list',
      );
    }

    logger.info(`[Service]: Delete List by id ${id}`);
    await listRepository.deleteById(id);
  }

  return { execute };
}
