import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

import { ConfigService } from '@/shared/modules/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(cookieParser());
  app.enableCors();

  if (configService.get('hasDocs')) {
    const swaggerConfig = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Meet Point')
      .setDescription('Backend API docs')
      .setExternalDoc('Prisma entities docs', 'docs/prisma')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, swaggerDocument);

    const prismaEntitiesDocument = yaml.load(
      readFileSync(
        join(process.cwd(), './src/shared/modules/generated/prisma-docs/openapi.yaml'),
        'utf8',
      ),
    ) as OpenAPIObject;
    SwaggerModule.setup('docs/prisma', app, prismaEntitiesDocument);
  }

  await app.listen(configService.get('port'));
}

bootstrap();
