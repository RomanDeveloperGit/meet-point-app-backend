import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@/shared/modules/config';
import { REFRESH_TOKEN_STRATEGY_NAME } from '@/shared/libs/auth';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN_STRATEGY_NAME) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get('jwtRefreshSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: RefreshTokenFullPayload,
  ): Promise<RefreshTokenFullPayload | false> {
    return payload;
  }
}
