import { beforeAll, describe, expect, test } from 'vitest';
import bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/implementation/InMemory/UserRepository';
import { SignInUserService } from '../SignInUserService';
import { newUser } from './mock/user';
import { SignUpUserService } from '../SignUpUserService';

describe('Sign In User Service', () => {
  let userRepository: UserRepository;
  let signInUserService: SignInUserService;
  let signUpUserService: SignUpUserService;

  beforeAll(async () => {
    userRepository = new UserRepository();
    signInUserService = new SignInUserService(userRepository);
    signUpUserService = new SignUpUserService(userRepository);

    await signUpUserService.execute(newUser);
  });

  test('User not found error', async () => {
    expect(async () => {
      await signInUserService.execute({
        email: 'not@exists.com',
        password: 'password',
      });
    }).rejects.toThrow('User not found');
  });

  test('Invalid credentials', async () => {
    try {
      await signInUserService.execute({
        email: 'john@doe.com',
        password: 'wrongPassword',
      });
    } catch (error) {
      expect(error.message).toContain('Invalid credentials');
    }
  });

  test('Successfully return authentication token', async () => {
    const response = await signInUserService.execute({
      email: 'john@doe.com',
      password: 'password',
    });

    expect(response).toHaveProperty('token');
  });
});
