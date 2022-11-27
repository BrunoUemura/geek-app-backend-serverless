import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { AppError } from "../../../shared/errors/AppError";
import { logger } from "../../../shared/logger";
import { IListRepository } from "../../list/interfaces/IListRepository";
import { IListItem } from "../interfaces/IListItem";
import { IListItemRepository } from "../interfaces/IListItemRepository";

export default function (
  listRepository: IListRepository,
  listItemRepository: IListItemRepository
) {
  async function execute(listId: string, id: string): Promise<IListItem> {
    logger.info(`[Service]: Delete List Item by id ${id}`);
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

    return listItemRepository.deleteById(id);
  }

  return { execute };
}
