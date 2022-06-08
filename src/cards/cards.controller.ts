import { Controller, Get, Query } from '@nestjs/common';
import { CardsHomeService } from './cards.service';

@Controller('api/v1/cards/')
export class CardsHomeController {

  //* API's da Home

  // (Instanciando) no construtor para acessar métodos
  constructor(private readonly cardsHomeService: CardsHomeService) {
  }

  @Get('findData/') // ('preencher aqui') para declarar uma rota alternativa
  async getStatus() {
    return this.cardsHomeService.getStatus(); //pegando método da cards-home.service.ts
  }
} 