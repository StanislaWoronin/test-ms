import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { BlogsModule } from './blogs.module';
import { Microservices } from '../../../libs/shared';
import { getTransportOptions } from '../../../libs/options/transport-options.switcher';

async function bootstrap() {
  const options = getTransportOptions(Microservices.Blogs);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogsModule,
    options,
  );

  await app.listen();
}
bootstrap();
