import { Controller, Get, Body, Patch, Param, Query, Req } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { ContratosService } from './contracts.service';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('api/v1/contracts/')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) { }

  @Get('findAll/')
  findAll(
    @Query('page') page: string,
    @Query('cr') cr: string,
    @Query('pec') pec: string,
    @Query('grupoCliente') grupoCliente: string,
    @Query('diretorExec') diretorExec: string,
    @Query('diretor') diretor: string,
    @Query('gerente') gerente: string,
    @Query('gerenteReg') gerenteReg: string,
    @Query('supervisor') supervisor: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
    @Query('mesReajuste1') mesReajuste1: string,
    @Query('mesReajuste2') mesReajuste2: string,
    @Query('mesReajuste3') mesReajuste3: string,
    @Query('empresa') empresa: string,
    @Query('retencaoContrato') retencaoContrato: string,
    @Query('negocio') negocio: string,
    @Query('regional') regional: string,
    @Query('valor') valor: Decimal,
    @Query('status') status: string,
    @Query('tipoAss') tipoAss: string,
    @Req() req: any,
  ) {

    const valueCookie = req.header('Cookie-Id-Siga');

    return this.contratosService.findAll(
      page,
      cr,
      pec,
      grupoCliente,
      diretorExec,
      diretor,
      gerente,
      gerenteReg,
      supervisor,
      dataInicio,
      dataFim,
      mesReajuste1,
      mesReajuste2,
      mesReajuste3,
      empresa,
      retencaoContrato,
      negocio,
      regional,
      valor,
      status,
      tipoAss,
      valueCookie,
    );
  }

  @Get('idContrato/:idContrato')
  findOne(@Param('idContrato') idContrato: number) {
    return this.contratosService.findUnique(Number(idContrato));
  }

  @Patch('changeUnique/:idContrato')
  update(
    @Param('idContrato') idContrato: number,
    @Body() updateConrtatoDto: UpdateContratoDto,
  ) {
    return this.contratosService.update(Number(idContrato), updateConrtatoDto);
  }
  @Get('findExportAll/')
  findExportAll(@Req() req: any){
      const valueCookie = req.header('Cookie-Id-Siga');
      return this.contratosService.findExportAll(valueCookie);
    }

}
