import { logger } from '../../../shared/logger';
import { IList } from '../interfaces/IList';
import { IListRepository } from '../interfaces/IListRepository';

export default function (listRepository: IListRepository) {
  async function execute(id: string): Promise<IList[] | null> {
    logger.info(`[Service]: Fetching List by user id ${id}`);
    return listRepository.findByUserId(id);
  }

  return { execute };
}
