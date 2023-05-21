import { NestFactory } from '@nestjs/core';
import { ApiGetawayModule } from './api-getaway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGetawayModule);
  await app.listen(3000);
}
bootstrap();
