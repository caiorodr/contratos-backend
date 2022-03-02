import { Test, TestingModule } from '@nestjs/testing';
import { CardsHomeService } from './cards-home.service';

describe('CardsHomeService', () => {
  let service: CardsHomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsHomeService],
    }).compile();

    service = module.get<CardsHomeService>(CardsHomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
