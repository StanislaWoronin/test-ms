import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RmqOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import { ApiGetawayModule } from './api-getaway.module';
import { settings } from '../../../libs/shared';

async function bootstrap() {
  const tcpOptions: TcpOptions = {
    transport: Transport.TCP,
    options: {
      host: settings.host.localHost,
      port: settings.port.apiGetaway,
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ApiGetawayModule,
    tcpOptions,
  );

  await app.listen();
}
bootstrap();
