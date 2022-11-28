import { HTTP_STATUS_CODES } from '../../../shared/constants/httpStatusCodes';
import { AppError } from '../../../shared/errors/AppError';
import { logger } from '../../../shared/logger';
import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';

export default function (userRepository: IUserRepository) {
  async function execute(id: string): Promise<IUser> {
    logger.info(`[Service]: Executing Find User By Id`);

    const user = await userRepository.findById(id);
    if (!user) {
      logger.info(`[Service]: User not found`);
      throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, 'User not found');
    }

    return user;
  }

  return { execute };
}
