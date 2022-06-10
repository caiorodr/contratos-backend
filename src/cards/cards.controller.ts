import { Body, Controller, Post } from '@nestjs/common';
import { CardsHomeService } from './cards.service';
import { CreateCookieDto } from '../cookies/dto/create-cookie.dto'

@Controller('api/v1/cards/')
export class CardsHomeController {

  //* API's da Home

  // (Instanciando) no construtor para acessar métodos
  constructor(private readonly cardsHomeService: CardsHomeService) {
  }

  @Post('findData/') // ('preencher aqui') para declarar uma rota alternativa
  async getStatus(@Body() valueCookie: CreateCookieDto) {
    return this.cardsHomeService.getStatus(valueCookie); //pegando método da cards-home.service.ts
  }
} 