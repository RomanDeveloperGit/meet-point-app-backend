import { IsEmail, IsString, MinLength } from 'class-validator';

import { GetUserByEmailAndPasswordRequest } from '@/modules/user/dto/get-user-by-email-and-password';

import { AuthorizedUser } from './authorized-user.dto';

export class SignInRequest implements GetUserByEmailAndPasswordRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class SignInResponse {
  accessToken: string;
  user: AuthorizedUser;
}
