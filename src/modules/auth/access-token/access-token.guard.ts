import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { ACCESS_TOKEN_STRATEGY_NAME } from '@/shared/libs/auth';

@Injectable()
class BasicAccessTokenGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY_NAME) {}

export function AccessTokenGuard() {
  return applyDecorators(ApiBearerAuth(), UseGuards(BasicAccessTokenGuard));
}
