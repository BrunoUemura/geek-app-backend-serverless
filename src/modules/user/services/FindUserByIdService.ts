import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { AppError } from "../../../shared/errors/AppError";
import { IUser } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";

export default function (userRepository: IUserRepository) {
  async function execute(id: string): Promise<IUser> {
    console.log(`[Service]: Executing Find User By Id`);

    const user = await userRepository.findById(id);
    if (!user) {
      console.log(`[Service]: User not found`);
      throw new AppError(HTTP_STATUS_CODES.NOT_FOUND, "User not found");
    }

    return user;
  }

  return { execute };
}
