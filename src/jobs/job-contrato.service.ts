import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobContratoService {

  constructor(
    private httpService: HttpService,
    private prisma: PrismaService
  ) {}

  @Cron('0 11 19 *  * 0-6')
  async handleCron() {

    const observable = this.httpService.get('http://localhost:3001/select-options/findAllPec')
    .pipe(
      map(
        (res) => res.data
        )
      );

    // you can use the data object now !!
    const data = await lastValueFrom(observable);

    this.createdContrato(data)
    
  }

  async createdContrato(contratos: any) {
    let data: Array<any> = [];


    contratos.forEach( (element: any) => {
      data.push({
      dataInicio: element.dataInicio,
      dataFim: element.dataFim,
      pec: element.descricaoPec,
      grupoCliente: element.grupoCliente,
      empresa: element.empresa,
      negocio: element.negocio,
      reajuste: element.indiceReajuste,
      mesReajuste: element.mesReajuste,
      valor: 666.666,
      });
    });  
    
    await this.prisma.contrato.createMany({
      data
    })
  }
}
