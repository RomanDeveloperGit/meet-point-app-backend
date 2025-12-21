import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { UserService } from '@/modules/user/user.service';

import { Verification } from '@/shared/modules/generated/prisma/client';
import { PrismaService } from '@/shared/modules/prisma';

@Injectable()
export class VerificationService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async getMyVerification(accessTokenPayload: AccessTokenPayload): Promise<Verification> {
    const user = await this.userService.getUserByEmail(accessTokenPayload.email);

    if (!user) {
      throw new InternalServerErrorException();
    }

    const verification = await this.prismaService.verification.findFirst({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    if (!verification) {
      throw new InternalServerErrorException();
    }

    return verification;
  }

  async initVerification(): Promise<void> {}

  async approveVerification(): Promise<void> {}

  async rejectVerification(): Promise<void> {}
}
