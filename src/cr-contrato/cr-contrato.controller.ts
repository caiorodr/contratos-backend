import { Controller, Get, Param, Query } from '@nestjs/common';
import { CrContratoService } from './cr-contrato.service';

@Controller('cr-contrato')
export class CrContratoController {
  constructor(private crContratoService: CrContratoService) {}
  
  @Get('/pec/:pec')
  async buscaCr(@Param('pec') pec: string) {
    return this.crContratoService.buscaCr(pec);
  }

  @Get('/valor/:pec')
  async buscaValorGlobal(@Param('pec') pecValor: string) {
    return this.crContratoService.buscaValorGlobal(pecValor);
  }
}
