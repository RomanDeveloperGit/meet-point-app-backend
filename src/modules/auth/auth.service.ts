import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';

import { JwtService } from '@nestjs/jwt';

import { User } from '@/shared/modules/generated/prisma/client';

import { ConfigService } from '@/shared/modules/config';
import { UserService } from '@/modules/user/user.service';

import { AuthorizedUser } from './dto/authorized-user.dto';
import { SignInRequest, SignInResponse } from './dto/sign-in.dto';
import { RefreshResponse } from './dto/refresh.dto';
import { SignUpRequest, SignUpResponse } from './dto/sign-up.dto';
import { AUTH_ERROR, REFRESH_TOKEN_COOKIE_PATH } from '@/shared/libs/auth';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  private async getTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const accessTokenPayload: AccessTokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: this.configService.get('jwtAccessExpiresIn'),
        secret: this.configService.get('jwtAccessSecret'),
      }),
      this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn: this.configService.get('jwtRefreshExpiresIn'),
        secret: this.configService.get('jwtRefreshSecret'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private saveRefreshTokenCookie(response: Response, refreshToken: string) {
    const maxAge = this.configService.get('jwtRefreshExpiresIn') * 1000;

    response.cookie(this.configService.get('refreshTokenCookieKey'), refreshToken, {
      maxAge,
      httpOnly: true,
      path: REFRESH_TOKEN_COOKIE_PATH,
      sameSite: 'strict',
    });
  }

  private clearRefreshTokenCookie(response: Response) {
    response.clearCookie(this.configService.get('refreshTokenCookieKey'), {
      path: REFRESH_TOKEN_COOKIE_PATH,
    });
  }

  async signIn(response: Response, data: SignInRequest): Promise<SignInResponse> {
    const user = await this.userService.getUserByEmailAndPassword(data);

    if (!user) {
      throw new BadRequestException({
        code: AUTH_ERROR.USER_NOT_FOUND,
        message: "User doesn't exist with this auth data",
      });
    }

    const { accessToken, refreshToken } = await this.getTokens(user);

    this.saveRefreshTokenCookie(response, refreshToken);

    return {
      accessToken,
      user: new AuthorizedUser(user),
    };
  }

  async signUp(response: Response, data: SignUpRequest): Promise<SignUpResponse> {
    const isEmailTaken = Boolean(await this.userService.getUserByEmail(data.email));

    if (isEmailTaken) {
      throw new BadRequestException({
        code: AUTH_ERROR.EMAIL_TAKEN,
        message: 'User with this email already exists',
      });
    }

    const user = await this.userService.create(data);
    const { accessToken, refreshToken } = await this.getTokens(user);

    this.saveRefreshTokenCookie(response, refreshToken);

    return {
      accessToken,
      user: new AuthorizedUser(user),
    };
  }

  async refresh(
    response: Response,
    refreshTokenFullPayload: RefreshTokenFullPayload,
  ): Promise<RefreshResponse> {
    const user = await this.userService.getUserByEmail(refreshTokenFullPayload.email);

    if (!user) {
      throw new BadRequestException({
        code: AUTH_ERROR.USER_NOT_FOUND,
        message: "User doesn't exist with this token data",
      });
    }

    const { accessToken, refreshToken } = await this.getTokens(user);

    this.saveRefreshTokenCookie(response, refreshToken);

    return {
      accessToken,
    };
  }

  async checkAccessToken(accessTokenFullPayload: AccessTokenFullPayload): Promise<AuthorizedUser> {
    const user = await this.userService.getUserByEmail(accessTokenFullPayload.email);

    if (!user) {
      throw new BadRequestException({
        code: AUTH_ERROR.USER_NOT_FOUND,
        message: "User doesn't exist with this token data",
      });
    }

    return new AuthorizedUser(user);
  }

  async signOut(response: Response, accessTokenFullPayload: AccessTokenFullPayload): Promise<void> {
    const user = await this.userService.getUserByEmail(accessTokenFullPayload.email);

    if (!user) {
      throw new BadRequestException({
        code: AUTH_ERROR.USER_NOT_FOUND,
        message: "User doesn't exist with this token data",
      });
    }

    this.clearRefreshTokenCookie(response);
  }
}
