import { beforeAll, describe, expect, test } from 'vitest';
import { UserRepository } from '../../repositories/implementation/InMemory/UserRepository';
import { SignUpUserService } from '../SignUpUserService';
import { newUser } from './mock/user';

describe('Sign Up User Service', () => {
  let userRepository: UserRepository;
  let signUpUserService: SignUpUserService;

  beforeAll(() => {
    userRepository = new UserRepository();
    signUpUserService = new SignUpUserService(userRepository);
  });

  test('User already registered Error', async () => {
    await userRepository.create(newUser);

    expect(async () => {
      await signUpUserService.execute({
        username: 'John Doe',
        email: 'john@doe.com',
        password: 'test',
      });
    }).rejects.toThrow('User already registered');
  });
});
