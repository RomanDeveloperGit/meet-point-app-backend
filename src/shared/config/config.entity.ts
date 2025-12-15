export interface Config {
  databaseUrl: string;

  hasDocs: boolean;

  passwordHashSalt: number;

  jwtAccessSecret: string;
  jwtAccessExpiresIn: number; // only in seconds

  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: number; // only in seconds

  refreshTokenCookieKey: string;
}
