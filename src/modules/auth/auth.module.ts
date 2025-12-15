import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserService } from '@/modules/user/user.service';

import { AccessTokenStrategy } from './access-token/access-token.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenStrategy } from './refresh-token/refresh-token.strategy';

@Module({
  imports: [PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
