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

  @Cron('0 34 17 *  * 0-6')
  async handleCron() {
    const observable = this.httpService.get('http://localhost:3001/select-options/pecApi')
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

    let updateData: Array<any> = [];
    let createData: Array<any> = [];
    let data:       Array<any> = [];
    
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

    const deleteAllPec = await this.prisma.pecContrato.deleteMany();

    if (deleteAllPec.count > 0 || data.length > 0 ) {
      await this.prisma.pecContrato.createMany({
        data
      });
    }

    // deleta os registros da tabela de contrato
    const retAllContrato = await this.prisma.contrato.findMany();
    
    for (let x = 0; x < retAllContrato.length; x++) {
      let validContrato: boolean = true;

      for (let i = 0; i < data.length; i++) {
        
        if(retAllContrato[x].pec == data[i].pec) {
          updateData.push(data[x]);
          validContrato = false;
          break;
        }

        if(data.length - 1 == i) {
          if(validContrato) {
            createData.push(data[x]);
          }
        }
      }
    }
    

    if( updateData.length > 0 ) {
      this.prisma.contrato.updateMany({
        data : updateData
      });
    }


    if( createData.length > 0 ) {
      this.prisma.contrato.createMany({
        data: createData
      });
    }

  }
}
