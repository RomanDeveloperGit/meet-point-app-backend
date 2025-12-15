import { IsEmail, IsString, MinLength } from 'class-validator';

import { CreateUserRequest } from '@/modules/user/dto/create-user.dto';

import { SignInResponse } from './sign-in.dto';

export class SignUpRequest implements CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class SignUpResponse extends SignInResponse {}
