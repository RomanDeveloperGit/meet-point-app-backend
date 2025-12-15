import { Config } from './config.entity';

type ConfigFactory = () => Config;

// TODO: to add the validation

export const configFactory: ConfigFactory = () => {
  return {
    databaseUrl: String(process.env.DATABASE_URL),

    hasDocs: Boolean(process.env.HAS_DOCS),

    passwordHashSalt: Number(process.env.PASSWORD_HASH_SALT),

    jwtAccessSecret: String(process.env.JWT_ACCESS_SECRET),
    jwtAccessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),

    jwtRefreshSecret: String(process.env.JWT_REFRESH_SECRET),
    jwtRefreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),

    refreshTokenCookieKey: 'refresh-token',
  };
};
