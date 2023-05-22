import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ApiGetawayModule } from './api-getaway.module';
import { Microservices } from '../../../libs/shared';
import { getTransportOptions } from '../../../libs/options';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(ApiGetawayModule);

  await app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
bootstrap();
