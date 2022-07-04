import { Controller, Get, Req } from '@nestjs/common';
import { CookiesService } from './cookies.service';

@Controller('api/v1/cookies/')
export class CookiesController {

  constructor(private cookiesService: CookiesService) { }

  @Get('idSiga')
  getIdSiga(@Req() req: any) {
    const valueCookie = req.header('Cookie-Id-Siga');
    return this.cookiesService.getIdSiga(valueCookie);
  }

}
