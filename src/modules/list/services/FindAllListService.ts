import { logger } from "../../../shared/logger";
import { IList } from "../interfaces/IList";
import { IListRepository } from "../interfaces/IListRepository";

export default function (listRepository: IListRepository) {
  async function execute(): Promise<IList[]> {
    logger.info(`[Service]: Fetching all Lists`);

    const lists = await listRepository.findAll();
    logger.info(`[Service]: Found ${lists.length} lists`);

    return lists;
  }

  return { execute };
}
