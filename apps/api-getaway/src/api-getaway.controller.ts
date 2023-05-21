import { Controller, Get } from '@nestjs/common';
import { ApiGetawayService } from './api-getaway.service';

@Controller()
export class ApiGetawayController {
  constructor(private readonly apiGetawayService: ApiGetawayService) {}

  @Get()
  getHello(): string {
    return this.apiGetawayService.getHello();
  }
}
