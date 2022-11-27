import { database } from "../../../../../infra/db/mongodb/connection";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../interfaces/IUserRepository";
import { IUser, IUserCreate } from "../../../interfaces/IUser";

export function UserRepository(): IUserRepository {
  async function findAll(): Promise<IUser[]> {
    await database.connect();
    const users = await User.find();
    await database.disconnect();
    return users;
  }

  async function findById(id: string): Promise<IUser | null> {
    await database.connect();
    const user = await User.findOne({
      _id: id,
    });
    await database.disconnect();
    return user;
  }

  async function findByUsername(username: string): Promise<IUser | null> {
    await database.connect();
    const user = await User.findOne({ username });
    await database.disconnect();
    return user;
  }

  async function findByEmail(email: string): Promise<IUser | null> {
    await database.connect();
    const user = await User.findOne({ email });
    await database.disconnect();
    return user;
  }

  async function create({
    id,
    username,
    email,
    password,
  }: IUser): Promise<IUser> {
    await database.connect();
    const user = new User({
      _id: id,
      username,
      email,
      password,
    });
    await user.save();
    await database.disconnect();
    return user;
  }

  async function update({
    id,
    username,
    email,
    password,
  }: IUser): Promise<IUser | null> {
    await database.connect();
    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        username,
        email,
        password,
      },
      { new: true }
    );

    await database.disconnect();
    return user;
  }

  async function deleteById(id: string): Promise<void> {
    await database.connect();
    await User.deleteOne({ _id: id });
    await database.disconnect();
  }

  return {
    findAll,
    findById,
    findByUsername,
    findByEmail,
    create,
    update,
    deleteById,
  };
}
