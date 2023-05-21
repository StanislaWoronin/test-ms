import { Module } from '@nestjs/common';
import { ApiGetawayController } from './api-getaway.controller';
import { ApiGetawayService } from './api-getaway.service';

@Module({
  imports: [],
  controllers: [ApiGetawayController],
  providers: [ApiGetawayService],
})
export class ApiGetawayModule {}
