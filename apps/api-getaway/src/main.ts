import { NestFactory } from '@nestjs/core';
import { ApiGetawayModule } from './api-getaway.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(ApiGetawayModule);

  await app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
bootstrap();
