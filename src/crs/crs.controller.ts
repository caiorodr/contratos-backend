import { Controller, Get, Param } from '@nestjs/common';
import { CrContratoService } from './crs.service';

@Controller('api/v1/crs/')
export class CrContratoController {
  constructor(private crContratoService: CrContratoService) { }

  @Get('pec/:pec')
  async buscaCr(@Param('pec') pec: string) {
    return this.crContratoService.buscaCr(pec);
  }
}
