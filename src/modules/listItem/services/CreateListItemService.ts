import { logger } from '../../../shared/logger';
import { HTTP_STATUS_CODES } from '../../../shared/constants/httpStatusCodes';
import { AppError } from '../../../shared/errors/AppError';
import { generateUniqueId } from '../../../shared/functions';
import { IListItemCreate } from '../interfaces/IListItem';
import { IListRepository } from '../../list/interfaces/IListRepository';
import { IListItemRepository } from '../interfaces/IListItemRepository';
import { CONTEXT_ABBREVIATION } from '../../../shared/constants/contextsAbbreviation';

interface ICreateListItemServiceProps extends Omit<IListItemCreate, 'id'> {
  tokenUserId: string;
}

export default function (
  listRepository: IListRepository,
  listItemRepository: IListItemRepository,
) {
  async function execute({
    tokenUserId,
    listId,
    title,
    season,
    episode,
    chapter,
    status,
    image,
    link,
  }: ICreateListItemServiceProps): Promise<void> {
    logger.info(`[Service]: Creating list`);

    logger.info(`[Service]: Searching for associated list`);
    const list = await listRepository.findById(listId);
    if (!list) {
      throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, 'List not found');
    }
    if (list.userId !== tokenUserId) {
      throw new AppError(
        HTTP_STATUS_CODES.UNAUTHORIZED,
        'User not authorized to create list item',
      );
    }

    logger.info(`[Service]: List found`);
    logger.info(`[Service]: Creating List Item`);
    const id = generateUniqueId(CONTEXT_ABBREVIATION.LIST_ITEM);
    const listItemToCreate = {
      id,
      listId,
      title,
      season,
      episode,
      chapter,
      status,
      image,
      link,
    };

    await listItemRepository.create(listItemToCreate);
  }

  return { execute };
}
