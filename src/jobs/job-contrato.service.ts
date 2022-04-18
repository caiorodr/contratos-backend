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

  @Cron('20 12 18 *  * 0-6')
  async handleCron() {
    let updateData: Array<any> = [];
    let createData: Array<any> = [];
    let data      : Array<any> = [];

    const observable = this.httpService.get('http://localhost:3001/select-options/pecApi')
    .pipe(
      map(
        (res) => res.data
        )
      );

    // result api microserviço pec
    const apiContratos = await lastValueFrom(observable);
    // deleta todos os contratos da tabela intermediaria
    const deleteAllPec = await this.prisma.pecContrato.deleteMany();

    // realiza a criação dos contratos atualizado.
    if (deleteAllPec.count > 0 || apiContratos.length > 0 ) {
      await this.prisma.pecContrato.createMany({
        data: apiContratos
      });
    }

    // monta array para ficar no formato do create e update para tabela contratos.
    apiContratos.forEach( (element: any) => {
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
    
    // result todos os contrato ja inseridos na tabela.
    const allContrato = await this.prisma.contrato.findMany();


    // monta array com contratos a serem atualizados e criados.
    if( allContrato.length > 0 ) {
      for (let x = 0; x < data.length; x++) {
        let validContrato: boolean = true;
  
        for (let i = 0; i < allContrato.length; i++) {
          let arrayUpdate: Array<any> = [];

          if( allContrato[i].pec == data[x].pec ) {
            arrayUpdate.push(data[x]);
            arrayUpdate = arrayUpdate.map((value: any) => {            
              return {
                ...value,
                id: allContrato[i].id
              }
            });

            updateData.push( arrayUpdate );
            validContrato = false;
            break;
          }
  
          if(allContrato.length - 1 == i) {
            if(validContrato) {
              createData.push(data[x]);
            }
          }
        }
      }
      
      if( updateData.length > 0 ) {
        for (let x = 0; x < updateData.length; x++) {
          await this.prisma.contrato.update({
            data: {
              dataFim: updateData[x][0].dataFim,
              dataInicio: updateData[x][0].dataInicio,
              pec: updateData[x][0].pec,
              grupoCliente: updateData[x][0].grupoCliente,
              empresa: updateData[x][0].empresa,
              negocio: updateData[x][0].negocio,
              reajuste: updateData[x][0].reajuste,
              mesReajuste: updateData[x][0].reajuste,
              valor: updateData[x][0].valor,
            },
            where: {
              id: updateData[x][0].id
            }
          });
        }
      }
  
      if( createData.length > 0 ) {
        await this.prisma.contrato.createMany({
          data: createData
        });
      }

    }else {
      await this.prisma.contrato.createMany({
        data: data
      });      
    }
  }
}
