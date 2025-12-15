import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { REFRESH_TOKEN_STRATEGY_NAME } from '@/shared/libs/auth';

@Injectable()
class BasicRefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY_NAME) {}

export function RefreshTokenGuard() {
  return applyDecorators(ApiBearerAuth(), UseGuards(BasicRefreshTokenGuard));
}
