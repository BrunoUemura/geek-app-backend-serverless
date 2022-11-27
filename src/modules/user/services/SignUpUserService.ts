import bcrypt from "bcrypt";

import { IUserCreate } from "../interfaces/IUser";
import { IUserRepository } from "../interfaces/IUserRepository";
import { AppError } from "../../../shared/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { generateUniqueId } from "../../../shared/functions";

export default function (userRepository: IUserRepository) {
  async function execute({ username, email, password }: IUserCreate) {
    const emailExists = await userRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError(
        HTTP_STATUS_CODES.BAD_REQUEST,
        "User with provided email already exists"
      );
    }

    const usernameExists = await userRepository.findByUsername(username);
    if (usernameExists) {
      throw new AppError(
        HTTP_STATUS_CODES.BAD_REQUEST,
        "User with provided username already exists"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = generateUniqueId("USER");
    return userRepository.create({
      id,
      username,
      email,
      password: hashedPassword,
    });
  }

  return { execute };
}
