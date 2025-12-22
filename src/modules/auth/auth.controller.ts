import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { DecoratedAccessTokenGuard } from './access-token/access-token.guard';
import { AuthService } from './auth.service';
import { SignInRequest } from './dto/sign-in.dto';
import { SignUpRequest } from './dto/sign-up.dto';
import { DecoratedRefreshTokenGuard } from './refresh-token/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'The Refresh Token will be stored in browser cookies',
  })
  @Post('sign-in')
  async signIn(@Body() data: SignInRequest, @Res({ passthrough: true }) response: Response) {
    return await this.authService.signIn(response, data);
  }

  @ApiOperation({
    summary: 'The Refresh Token will be stored in browser cookies',
  })
  @Post('sign-up')
  async signUp(@Body() data: SignUpRequest, @Res({ passthrough: true }) response: Response) {
    return this.authService.signUp(response, data);
  }

  @ApiOperation({
    summary: 'The Refresh Token will be stored in browser cookies',
  })
  @Post('refresh')
  @DecoratedRefreshTokenGuard()
  async refresh(
    @Req() request: RequestWithRefreshTokenPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refresh(response, request.user);
  }

  @Get('access-token/check')
  @DecoratedAccessTokenGuard()
  async checkAccessToken(@Req() request: RequestWithAccessTokenPayload) {
    return this.authService.checkAccessToken(request.user);
  }

  @ApiOperation({
    summary: 'The Refresh Token will be removed from browser cookies',
  })
  @Post('sign-out')
  @DecoratedAccessTokenGuard()
  async signOut(
    @Req() request: RequestWithAccessTokenPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signOut(response, request.user);
  }
}
