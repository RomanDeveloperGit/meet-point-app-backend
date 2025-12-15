import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/shared/modules/generated/prisma/client';
import { ConfigService } from '../config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private configService: ConfigService) {
    const adapter = new PrismaPg({ connectionString: configService.get('databaseUrl') });

    super({ adapter });
  }
}
