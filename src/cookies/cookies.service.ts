/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class CookiesService {
  constructor(private httpService: HttpService) { }

  async getIdSiga(valueCookie: any) {

    const headersOptions = {
      'cookie': `${valueCookie}`
    }

    const header = {
      headers: headersOptions
    };

    //*busca o idsiga do usuario logado.
    const buscaIdSiga: any = this.httpService.get(`${process.env.IDSIGA_API_PORTAL}`, header).pipe(
      map(
        (res) => res.data));

    return await lastValueFrom(buscaIdSiga);
  }

}
