/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { CookiesService } from './cookies.service';
import { CreateCookieDto } from './dto/create-cookie.dto';

@Controller('api/v1/cookies/')
export class CookiesController {

  constructor(private cookiesService: CookiesService) { }

  @Post('idSiga')
  getIdSiga(@Body() body: CreateCookieDto) {
    console.log(body);
    return this.cookiesService.getIdSiga(body);
  }

}
