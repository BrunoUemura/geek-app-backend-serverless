import { logger } from '../../../shared/logger';
import { IListRepository } from '../interfaces/IListRepository';

export default function (listRepository: IListRepository) {
  async function execute(id: string): Promise<void> {
    logger.info(`[Service]: Delete List by id ${id}`);
    await listRepository.deleteById(id);
  }

  return { execute };
}
