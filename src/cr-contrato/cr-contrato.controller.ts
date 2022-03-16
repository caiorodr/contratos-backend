import { Controller, Get, Param } from '@nestjs/common';
import { CrContratoService } from './cr-contrato.service';

@Controller('cr-contrato')
export class CrContratoController {

    constructor( private crContratoService: CrContratoService) {}

  @Get(':cr')
  async findAllCr(
    @Param('cr') cr: string,
  ) {
    return this.crContratoService.findAllCr(cr);
  }
  
}
