import { Module } from '@nestjs/common';

import { RawAccessTokenGuard } from '@/modules/auth/access-token/access-token.guard';
import { UserService } from '@/modules/user/user.service';

import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';

@Module({
  imports: [],
  controllers: [VerificationController],
  providers: [VerificationService, UserService, RawAccessTokenGuard],
})
export class VerificationModule {}
