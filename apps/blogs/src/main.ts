import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BlogsModule } from './blogs.module';
import { settings } from '../../../libs/shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BlogsModule,
    {
      transport: Transport.TCP,
      options: {
        host: settings.host.localHost,
        port: settings.port.blogs,
      },
    },
  );

  await app.listen();
}
bootstrap();
