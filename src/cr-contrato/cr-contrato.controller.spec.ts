import { Test, TestingModule } from '@nestjs/testing';
import { CrContratoController } from './cr-contrato.controller';

describe('CrContratoController', () => {
  let controller: CrContratoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrContratoController],
    }).compile();

    controller = module.get<CrContratoController>(CrContratoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
