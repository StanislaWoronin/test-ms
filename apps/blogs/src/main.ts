import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RmqOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import { BlogsModule } from './blogs.module';
import { Microservices, settings } from '../../../libs/shared';


async function bootstrap() {
  const tcpOptions: TcpOptions = {
    transport: Transport.TCP,
    options: {
      host: settings.host.localHost,
      port: settings.port[Microservices.Blogs],
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogsModule,
    tcpOptions,
  );

  await app.listen();
}
bootstrap();
