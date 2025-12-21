import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { REFRESH_TOKEN_STRATEGY_NAME } from '@/shared/libs/auth';

@Injectable()
class RawRefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY_NAME) {}

export function DecoratedRefreshTokenGuard() {
  return applyDecorators(ApiBearerAuth(), UseGuards(RawRefreshTokenGuard));
}
