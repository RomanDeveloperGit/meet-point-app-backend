import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { ConfigService } from '@/shared/modules/config';
import { User } from '@/shared/modules/generated/prisma/client';
import { PrismaService } from '@/shared/modules/prisma';

import { CreateUserRequest } from './dto/create-user.dto';
import { GetUserByEmailAndPasswordRequest } from './dto/get-user-by-email-and-password';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(data: CreateUserRequest): Promise<User> {
    const password = await hash(data.password, this.configService.get('passwordHashSalt'));
    const user = await this.prismaService.user.create({ data: { ...data, password } });

    return user;
  }

  async getUserByEmail(data: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: data,
      },
    });

    return user;
  }

  async getUserByEmailAndPassword(data: GetUserByEmailAndPasswordRequest): Promise<User | null> {
    const user = await this.getUserByEmail(data.email);
    if (!user) return null;

    const isPasswordCorrect = await compare(data.password, user.password);

    return isPasswordCorrect ? user : null;
  }
}
