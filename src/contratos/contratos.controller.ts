// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) { }

  @Post()
  async create(@Body() createContratoDto: CreateContratoDto) {
    const bodyCr = createContratoDto.crContrato;
    const bodyData = createContratoDto.fileData;
    return this.contratosService.create(createContratoDto, bodyCr, bodyData);
  }

  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('cr') cr: string,
    @Query('grupoCliente') grupoCliente: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
    @Query('mesReajuste') mesReajuste: string,
    @Query('empresa') empresa: string,
    @Query('chamado') chamado: string,
    @Query('retencaoContrato') retencaoContrato: string,
    @Query('negocio') negocio: string,
    @Query('status') status: string,
    @Query('valor') valor: Decimal,
  ) {
    return this.contratosService.findAll(
      page,
      cr,
      grupoCliente,
      dataInicio,
      dataFim,
      mesReajuste,
      empresa,
      chamado,
      retencaoContrato,
      negocio,
      status,
      valor,
    );
  }


  @Get('documento')
  async findDesc() {
    return this.contratosService.findDesc();
  }

  @Get('/documento/:documento')
  async findOne(@Param('documento') documento: string) {
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
