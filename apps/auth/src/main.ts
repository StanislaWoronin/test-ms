import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Microservices, settings } from '../../../libs/shared';
import { getTransportOptions } from '../../../libs/options/transport-options.switcher';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    getTransportOptions(Microservices.Auth),
  );

  await app.listen();
}
bootstrap();
