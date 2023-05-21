import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ApiGetawayModule } from './api-getaway.module';
import { Microservices, settings } from '../../../libs/shared';
import { getTransportOptions } from '../../../libs/options/transport-options.switcher';

async function bootstrap() {
  // const transportOptions = getTransportOptions(Microservices.ApiGetaway);
  const;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiGetawayModule,
    transportOptions,
  );

  await app.listen();
}
bootstrap();
