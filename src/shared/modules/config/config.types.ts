export interface Config {
  port: number;
  hasDocs: boolean;

  databaseUrl: string;

  passwordHashSalt: number;

  jwtAccessSecret: string;
  jwtAccessExpiresIn: number; // only in seconds

  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: number; // only in seconds

  refreshTokenCookieKey: string;
}
