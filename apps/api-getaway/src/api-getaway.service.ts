import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGetawayService {
  getHello(): string {
    return 'Hello World!';
  }
}
