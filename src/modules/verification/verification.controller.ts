import { Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DecoratedAccessTokenGuard } from '../auth/access-token/access-token.guard';
import { VerificationService } from './verification.service';

@ApiTags('Verification')
@Controller('verification')
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Get('me')
  @DecoratedAccessTokenGuard()
  async getMyVerification(@Req() request: RequestWithAccessTokenPayload) {
    return this.verificationService.getMyVerification(request.user);
  }

  @Post('/init')
  async initVerification() {
    return this.verificationService.initVerification();
  }

  // админский контроллер сделать
  @Patch('/:id/approve')
  async approveVerification() {
    return this.verificationService.approveVerification();
  }

  // админский контроллер сделать
  @Patch('/:id/reject')
  async rejectVerification() {
    return this.verificationService.rejectVerification();
  }
}
