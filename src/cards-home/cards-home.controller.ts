import { Controller, Get, Query } from '@nestjs/common';
import { CardsHomeService } from './cards-home.service';

@Controller('cards-home')
export class CardsHomeController {

  //* API's da Home

  // (Instanciando) no construtor para acessar métodos
  constructor(private readonly cardsHomeService: CardsHomeService) {
  } 

  @Get() // ('preencher aqui') para declarar uma rota alternativa
  async getVigentes(
    @Query('qVigente')    qtdVigente: number,
    @Query('qVencido')    qtdVencido: number,
    @Query('qElaboracao') qtdElaboracao: number,
  ){
    return this.cardsHomeService.getVigentes(qtdVigente, qtdVencido, qtdElaboracao); //pegando método da cards-home.service.ts
  } 
}
