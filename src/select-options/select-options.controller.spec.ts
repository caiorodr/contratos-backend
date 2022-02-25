import { Test, TestingModule } from '@nestjs/testing';
import { SelectOptionsController } from './select-options.controller';

describe('SelectOptionsController', () => {
  let controller: SelectOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectOptionsController],
    }).compile();

    controller = module.get<SelectOptionsController>(SelectOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
