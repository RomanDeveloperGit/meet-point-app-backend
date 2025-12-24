import { Config } from './config.types';

type ConfigFactory = () => Config;

export const configFactory: ConfigFactory = () => {
  return {
    port: Number(process.env.PORT),
    hasDocs: process.env.HAS_DOCS === 'true',

    databaseUrl: String(process.env.DATABASE_URL),

    passwordHashSalt: Number(process.env.PASSWORD_HASH_SALT),

    jwtAccessSecret: String(process.env.JWT_ACCESS_SECRET),
    jwtAccessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),

    jwtRefreshSecret: String(process.env.JWT_REFRESH_SECRET),
    jwtRefreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
  };
};
