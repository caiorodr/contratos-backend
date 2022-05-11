import { Param, Query } from '@nestjs/common';
import { Get, Controller } from '@nestjs/common';
import { OptionsService } from './options.service';

@Controller('options')
export class OptionsController {
    constructor (private optionsService: OptionsService){}

    @Get('seguros')
    async findSeguros(
        @Query('filter') filter: string,
        @Query('value') value: string,
        ){
        return this.optionsService.findSeguros(filter, value);

    }
    @Get('docSolidaria')
    async findDocSolidaria(
        @Query('filter') filter: string,
        @Query('value') value: string,
        ){
        return this.optionsService.findDocSolidaria(filter, value);

    }
    @Get('retencao')
    async findRetencContratual(){
        return this.optionsService.findRetencContratual();

    }
    @Get('tipoAss')
    async findTipoAss(){
        return this.optionsService.findTipoAss();
    }
    
    @Get('tipoFaturamento')
    async findTipoFaturamento(){
        return this.optionsService.findTipoFaturamento();
    }
    
    @Get('reajuste')
    async findReajuste(){
        return this.optionsService.findReajuste();
    }
}

