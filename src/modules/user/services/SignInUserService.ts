import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IUserSignIn } from "../interfaces/IUser";
import { AppError } from "../../../shared/errors/AppError";
import { HTTP_STATUS_CODES } from "../../../shared/constants/httpStatusCodes";
import { IUserRepository } from "../interfaces/IUserRepository";

export default function (userRepository: IUserRepository) {
  async function execute({ email, password }: IUserSignIn) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Invalid credentials");
    }

    const match = await bcrypt.compare(password, String(user.password));
    if (!match) {
      throw new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Invalid credentials");
    }

    const payload = { id: user.id };
    const expiration = { expiresIn: 7200 };
    const token = jwt.sign(
      payload,
      String(process.env.TOKEN_SECRET),
      expiration
    );
    const { password: userPass, ...userToReturn } = user;

    return {
      message: "Successfully authenticated",
      token,
      user: userToReturn,
    };
  }

  return { execute };
}
