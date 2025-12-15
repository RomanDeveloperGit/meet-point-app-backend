import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@/shared/modules/config';
import { ACCESS_TOKEN_STRATEGY_NAME } from '@/shared/libs/auth';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY_NAME) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get('jwtAccessSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AccessTokenFullPayload): Promise<AccessTokenFullPayload> {
    return payload;
  }
}
