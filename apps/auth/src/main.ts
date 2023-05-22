import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';
import { Microservices, settings } from '../../../libs/shared';
import { getTcpOptions } from '../../../libs/options/transport-options.switcher';

async function bootstrap() {
  const tcpOptions: TcpOptions = {
    transport: Transport.TCP,
    options: {
      host: settings.host.localHost,
      port: settings.port[Microservices.Auth],
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    tcpOptions,
  );

  await app.listen();
}
bootstrap();
