import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import { ApiGetawayModule } from './api-getaway.module';
import { Microservices, settings } from '../../../libs/shared';

async function bootstrap() {
  const tcpOptions: TcpOptions = {
    transport: Transport.TCP,
    options: {
      host: settings.host.localHost,
      port: settings.port[Microservices.Auth],
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiGetawayModule,
    tcpOptions,
  );

  await app.listen();
}
bootstrap();
