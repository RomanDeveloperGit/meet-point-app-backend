import { Request } from 'express';

import { JwtPayload } from 'jsonwebtoken';

declare global {
  interface RefreshTokenPayload extends JwtPayload {
    email: string;
  }

  interface RequestWithRefreshTokenPayload extends Request {
    user: RefreshTokenPayload;
  }
}
