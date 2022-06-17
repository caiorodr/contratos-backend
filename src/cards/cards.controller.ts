import { Controller, Get, Req } from '@nestjs/common';
import { CardsHomeService } from './cards.service';


@Controller('api/v1/cards/')
export class CardsHomeController {

  //* API's da Home
  // (Instanciando) no construtor para acessar métodos
  constructor(private readonly cardsHomeService: CardsHomeService) {
  }

  @Get('findData/') // ('preencher aqui') para declarar uma rota alternativa
  async getStatus(@Req() req: any) {
    const valueCookie = req.header('Cookie-Id-Siga');
    return this.cardsHomeService.getStatus(valueCookie); //pegando método da cards-home.service.ts
  }
} 