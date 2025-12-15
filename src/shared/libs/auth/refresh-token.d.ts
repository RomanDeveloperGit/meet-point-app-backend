import { Request } from 'express';

import { JwtPayload } from 'jsonwebtoken';

declare global {
  interface RefreshTokenPayload {
    email: string;
  }

  interface RefreshTokenFullPayload extends JwtPayload, RefreshTokenPayload {}

  interface RequestWithRefreshTokenFullPayload extends Request {
    user: RefreshTokenFullPayload;
  }
}
