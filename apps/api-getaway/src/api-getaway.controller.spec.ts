import { Test, TestingModule } from '@nestjs/testing';
import { ApiGetawayController } from './api-getaway.controller';
import { ApiGetawayService } from './api-getaway.service';

describe('ApiGetawayController', () => {
  let apiGetawayController: ApiGetawayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiGetawayController],
      providers: [ApiGetawayService],
    }).compile();

    apiGetawayController = app.get<ApiGetawayController>(ApiGetawayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiGetawayController.getHello()).toBe('Hello World!');
    });
  });
});
