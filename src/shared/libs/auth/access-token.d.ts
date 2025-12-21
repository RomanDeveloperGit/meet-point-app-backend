import { Request } from 'express';

import { JwtPayload } from 'jsonwebtoken';

declare global {
  interface AccessTokenPayload extends JwtPayload {
    firstName: string;
    lastName: string;
    email: string;
  }

  interface RequestWithAccessTokenPayload extends Request {
    user: AccessTokenPayload;
  }
}
