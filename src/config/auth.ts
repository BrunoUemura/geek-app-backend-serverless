import { Secret } from 'jsonwebtoken';

interface IAuthConfig {
  jwt: {
    secret?: Secret;
    expiresIn: string;
  };
}

export const authConfig: IAuthConfig = Object.freeze({
  jwt: {
    secret: process.env.TOKEN_SECRET,
    expiresIn: '1d',
  },
});
