import { Test, TestingModule } from '@nestjs/testing';
import { SelectOptionsService } from './select-options.service';

describe('SelectOptionsService', () => {
  let service: SelectOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectOptionsService],
    }).compile();

    service = module.get<SelectOptionsService>(SelectOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
