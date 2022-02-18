// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  async create(@Body() createContratoDto: CreateContratoDto) {
    return this.contratosService.create(createContratoDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('cr') cr: string,
    @Query('grupoCliente') grupoCliente: string,
    @Query('diretor') diretor: string,
    @Query('gerente') gerente: string,
    @Query('supervisor') supervisor: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
    @Query('dataReajuste') dataReajuste: string,
    @Query('empresa') empresa: string,
    @Query('chamado') chamado: string,
    @Query('retencaoContrato') retencaoContrato: string,
    @Query('negocio') negocio: string,
    @Query('valor') valor: Decimal,
  ) {
    return this.contratosService.findAll(
      page,
      cr,
      grupoCliente,
      diretor,
      gerente,
      supervisor,
      dataInicio,
      dataFim,
      dataReajuste,
      empresa,
      chamado,
      retencaoContrato,
      negocio,
      valor,
    );
  }

  @Get('documento')
  async findDesc() {
    return this.contratosService.findDesc();
  }

  @Get(':id')
  async findOne(@Param('id') documento: string) {
    return this.contratosService.findOne(documento);
  }

  @Patch(':documento')
  async update(
    @Param('documento') documento: string,
    @Body() updateConrtatoDto: UpdateContratoDto,
  ) {
    return this.contratosService.update(documento, updateConrtatoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contratosService.remove(+id);
  }
}
