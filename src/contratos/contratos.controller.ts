// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
  async findAll() {
    return this.contratosService.findAll();
  }

  @Get('documento')
  async findDesc() {
    return this.contratosService.findDesc();
  }
  
  @Get('findFilters?')
  async findFilter(
      @Query('filter') filter: string,
      @Query('search') search: string,
  ) {
    return this.contratosService.findFilter(filter,search);
  }


  @Get(':id')
  async findOne(@Param('id') documento: string) {
    return this.contratosService.findOne(documento);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContratoDto: UpdateContratoDto,
  ) {
    return this.contratosService.update(+id, updateContratoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contratosService.remove(+id);
  }
}
