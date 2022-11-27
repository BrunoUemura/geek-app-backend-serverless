import { IList, IListCreate } from "../interfaces/IList";
import { logger } from "../../../shared/logger";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { AppError } from "../../../shared/errors/AppError";
import { generateUniqueId } from "../../../shared/functions";
import { IListRepository } from "../interfaces/IListRepository";
import { IUserRepository } from "../../user/interfaces/IUserRepository";
import { CONTEXT_ABBREVIATION } from "../../../shared/constants/contextsAbbreviation";

interface ICreateListServiceProps extends Omit<IListCreate, "id"> {}

export default function (
  userRepository: IUserRepository,
  listRepository: IListRepository
) {
  async function execute({
    userId,
    title,
    description,
    category,
  }: ICreateListServiceProps): Promise<IList> {
    logger.info(`[Service]: Creating list`);

    logger.info(`[Service]: Creating list`);
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "User not found");
    }

    logger.info(`[Service]: Associated user found`);
    logger.info(`[Service]: Creating List`);
    const id = generateUniqueId(CONTEXT_ABBREVIATION.LIST);
    const listToCreate = {
      id,
      userId,
      title,
      description,
      category,
    };

    return listRepository.create(listToCreate);
  }

  return { execute };
}
