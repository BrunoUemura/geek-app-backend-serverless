import { logger } from "../../../shared/logger";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { AppError } from "../../../shared/errors/AppError";
import { IListItem, IListItemUpdate } from "../interfaces/IListItem";
import { IListRepository } from "../../list/interfaces/IListRepository";
import { IListItemRepository } from "../interfaces/IListItemRepository";

export default function (
  listRepository: IListRepository,
  listItemRepository: IListItemRepository
) {
  async function execute({
    id,
    listId,
    title,
    season,
    episode,
    chapter,
    link,
    image,
  }: IListItemUpdate): Promise<IListItem> {
    logger.info(`[Service]: Updating List Item`);
    logger.info(`[Service]: Searching for associated List`);
    const list = await listRepository.findById(listId);
    if (!list) {
      throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "List not found");
    }

    logger.info(`[Service]: Found List`);
    logger.info(`[Service]: Searching for List Item`);
    const listItem = await listItemRepository.findById(id);
    if (!listItem) {
      throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "List item not found");
    }

    logger.info(`[Service]: Found List Item`);
    logger.info(`[Service]: Updating List Item`);
    const listItemToUpdate = {
      id,
      listId,
      title,
      season,
      episode,
      chapter,
      link,
      image,
    };
    return listItemRepository.update(listItemToUpdate);
  }

  return { execute };
}
