import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  interface AccessTokenPayload {
    firstName: string;
    lastName: string;
    email: string;
  }

  interface AccessTokenFullPayload extends JwtPayload, AccessTokenPayload {}

  interface RequestWithAccessTokenFullPayload extends Request {
    user: AccessTokenFullPayload;
  }
}
