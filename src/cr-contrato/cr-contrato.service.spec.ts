import { Test, TestingModule } from '@nestjs/testing';
import { CrContratoService } from './cr-contrato.service';

describe('CrContratoService', () => {
  let service: CrContratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrContratoService],
    }).compile();

    service = module.get<CrContratoService>(CrContratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
