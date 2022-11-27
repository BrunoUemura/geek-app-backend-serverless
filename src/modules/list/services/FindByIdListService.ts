import { logger } from "../../../shared/logger";
import { IList } from "../interfaces/IList";
import { IListRepository } from "../interfaces/IListRepository";

export default function (listRepository: IListRepository) {
  async function execute(id: string): Promise<IList | null> {
    logger.info(`[Service]: Fetching List by id ${id}`);
    return listRepository.findById(id);
  }

  return { execute };
}
