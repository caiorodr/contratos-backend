import { Test, TestingModule } from '@nestjs/testing';
import { CardsHomeController } from './cards-home.controller';

describe('CardsHomeController', () => {
  let controller: CardsHomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsHomeController],
    }).compile();

    controller = module.get<CardsHomeController>(CardsHomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
