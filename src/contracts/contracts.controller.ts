import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { ContratosService } from './contracts.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('api/v1/contracts/')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Get('idSiga')
  async idSiga() {
    return this.contratosService.idSiga();
  }

  @Get('findAll/')
  async findAll(
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
    @Query('mesReajuste') mesReajuste: string,
    @Query('empresa') empresa: string,
    @Query('retencaoContrato') retencaoContrato: string,
    @Query('negocio') negocio: string,
    @Query('regional') regional: string,
    @Query('valor') valor: Decimal,
    @Query('status') status: string,
    @Query('tipoAss') tipoAss: string,
  ) {
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
      mesReajuste,
      empresa,
      retencaoContrato,
      negocio,
      regional,
      valor,
      status,
      tipoAss,
    );
  }

  @Get('idContrato/:idContrato')
  async findOne(@Param('idContrato') idContrato: number) {
    return this.contratosService.findUnique(Number(idContrato));
  }

  @Patch('changeUnique/:idContrato')
  async update(
    @Param('idContrato') idContrato: number,
    @Body() updateConrtatoDto: UpdateContratoDto,
  ) {
    return this.contratosService.update(Number(idContrato), updateConrtatoDto);
  }
}
