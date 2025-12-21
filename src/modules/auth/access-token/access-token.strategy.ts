import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ACCESS_TOKEN_STRATEGY_NAME } from '@/shared/libs/auth';
import { ConfigService } from '@/shared/modules/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN_STRATEGY_NAME) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get('jwtAccessSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AccessTokenPayload> {
    return payload;
  }
}
