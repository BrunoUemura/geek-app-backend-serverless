import { logger } from "../../../shared/logger";
import { IList } from "../interfaces/IList";
import { IListRepository } from "../interfaces/IListRepository";

export default function (listRepository: IListRepository) {
  async function execute(): Promise<IList[]> {
    logger.info(`[Service]: Fetching all Lists`);
    return listRepository.findAll();
  }

  return { execute };
}
