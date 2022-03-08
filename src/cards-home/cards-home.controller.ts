import { Controller, Get, Query } from '@nestjs/common';
import { CardsHomeService } from './cards-home.service';

@Controller('cards-home')
export class CardsHomeController {

  //* API's da Home

  // (Instanciando) no construtor para acessar métodos
  constructor(private readonly cardsHomeService: CardsHomeService) {
  } 

  @Get() // ('preencher aqui') para declarar uma rota alternativa
  async getStatus(
    @Query('status')    qtdStatus: number,
  ){
    return this.cardsHomeService.getStatus(qtdStatus); //pegando método da cards-home.service.ts
  } 
} 
