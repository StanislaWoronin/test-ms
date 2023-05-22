import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions,} from '@nestjs/microservices';
import {ApiGetawayModule} from './api-getaway.module';
import {Microservices} from '../../../libs/shared';
import {getTransportOptions} from "../../../libs/options";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiGetawayModule,
      getTransportOptions(Microservices.ApiGetaway),
  );

  await app.listen();
}
bootstrap();
