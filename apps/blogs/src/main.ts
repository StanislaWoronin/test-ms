import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { BlogsModule } from './blogs.module';
import { Microservices } from '../../../libs/shared';
import { getTransportOptions } from '../../../libs/options';

async function bootstrap() {
  const options = getTransportOptions(Microservices.Blogs);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogsModule,
    options,
  );

  await app.listen();
}

bootstrap();
