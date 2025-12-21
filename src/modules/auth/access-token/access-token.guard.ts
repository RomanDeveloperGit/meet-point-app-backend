import { applyDecorators, Injectable, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

import { ACCESS_TOKEN_STRATEGY_NAME } from '@/shared/libs/auth';

@Injectable()
export class RawAccessTokenGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY_NAME) {}

export function DecoratedAccessTokenGuard() {
  return applyDecorators(ApiBearerAuth(), UseGuards(RawAccessTokenGuard));
}
