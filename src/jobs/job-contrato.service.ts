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

  @Cron('20 28 12 *  * 0-6')
  async handleCron() {
    let updateData  : Array<any> = [];
    let createData  : Array<any> = [];
    let data        : Array<any> = [];
    let dateLogInit : Date = new  Date();

    this.createLogJob("Iniciou o processamento do JOB.", dateLogInit);

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
      pecCr: element.pec,
      descricaoPecCr: element.descricaoPec,
      cr: element.crReduzido,
      descricaoCr: element.descricaoCr,
      regionalCr: element.regional,
      diretorCr: element.diretorRegional,
      diretorExecCr: element.diretorExecutivo,
      gerenteRegCr: element.gerenteRegional,
      gerenteCr: element.gereteneExecutivo,
      supervisorCr: element.supervisor,
      });
    }); 
    
    // result todos os contrato ja inseridos na tabela.
    const allContrato = await this.prisma.contrato  .findMany();

    // monta array com contratos a serem atualizados e criados.
    if( allContrato.length > 0 ) {
      for ( let x = 0; x < allContrato.length; x++ ) {
        let validContrato: boolean = true;
  
        for (let i = 0; i < data.length; i++) {
          let arrayUpdate: Array<any> = [];

          if( allContrato[i].pec == data[x].pec ) {
            arrayUpdate.push(data[x]);
            arrayUpdate = arrayUpdate.map((value: any) => {            
              return {
                ...value,
                id: allContrato[x].id
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
        let updateCrContrato: Array<any> = [];
        let dateInitJob: Date = new Date();

        // Atualiza a tabela de contratos
        for (let i = 0; i < updateData.length; i++) {  
                  
          try {
            const updateContrato = await this.prisma.contrato.update({
              data: {
                dataFim: updateData[i][0].dataFim,
                dataInicio: updateData[i][0].dataInicio,
                pec: updateData[i][0].pec,
                grupoCliente: updateData[i][0].grupoCliente,
                empresa: updateData[i][0].empresa,
                negocio: updateData[i][0].negocio,
                reajuste: updateData[i][0].reajuste,
                mesReajuste: updateData[i][0].reajuste,
                valor: updateData[i][0].valor,
              },
              where: {
                id: updateData[i][0].id
              },
              include: {
                crContrato: true
              },
            });
            
            updateCrContrato.push(updateContrato);

            if(updateData.length - 1 == i) {
              this.createLogJob(`${updateData.length.toString()} - Contratos atualizados com sucesso.`,dateInitJob,  new Date());
            }
          } catch(error) {
            this.createLogJob(`Erro ao atualizar a tabela de Contrato: log - ${error}`,dateInitJob,  new Date());
          }
        }

        // Atualiza a tabela de CR's
        for (let i = 0; i < updateCrContrato.length; i++) {

          dateInitJob = new Date();

          try {
            await this.prisma.crContrato.update({
              data: {
                cr: updateCrContrato[i].crContrato[0].cr,
                descricaoCr: updateCrContrato[i].crContrato[0].descricaoCr,
                pecCr: updateCrContrato[i].crContrato[0].pecCr,
                descricaoPecCr: updateCrContrato[i].crContrato[0].descricaoPecCr,
                diretorCr: updateCrContrato[i].crContrato[0].diretorCr,
                diretorExecCr: updateCrContrato[i].crContrato[0].diretorExecCr,
                gerenteRegCr: updateCrContrato[i].crContrato[0].gerenteRegCr,
                gerenteCr: updateCrContrato[i].crContrato[0].gerenteCr,
                supervisorCr: updateCrContrato[i].crContrato[0].supervisorCr,
                regionalCr: updateCrContrato[i].crContrato[0].regionalCr,
              },
              where:{
                id: updateCrContrato[i].crContrato[0].id
              },
            });
          }catch(error) {
            this.createLogJob(`Erro ao atualizar a tabela de CR's: log - ${error}`,dateInitJob,  new Date());
          }
         
          //! Valida o ultimo Cr a ser atualizado para criar o log.
          if(updateCrContrato.length - 1 == i){
            this.createLogJob('Cr atualizado com sucesso.',dateInitJob,  new Date());
          }
        }
      }
      
      // Valida se tem algum contrato novo para ser criado
      if( createData.length > 0 ) {
        let dateInitJob: Date = new Date();

        try {
          createData.forEach(async (element: any,index: number) => {
            await this.prisma.contrato.create({
              data: {
                dataFim: element.dataFim,
                dataInicio: element.dataInicio,
                empresa: element.empresa ,
                grupoCliente: element.grupoCliente,
                mesReajuste: element.reajuste,
                pec: element.pec,
                negocio: element.negocio,
                valor:element.valor,
                crContrato: {
                  create: {
                    cr: element.cr,
                    descricaoCr: element.descricaoCr,
                    pecCr: element.pecCr,
                    descricaoPecCr: element.descricaoPecCr,
                    diretorCr: element.diretorCr,
                    diretorExecCr: element.diretorExecCr,
                    gerenteRegCr: element.gerenteRegCr,
                    gerenteCr: element.gerenteCr,
                    supervisorCr: element.supervisorCr,
                    regionalCr: element.regionalCr,
                    valorCr: element.valor
                  },
                },
              },
            });

            if(createData.length - 1 == index) {
              this.createLogJob(`Criou ${createData.length.toString()} novos contratos.`,dateInitJob,  new Date());
            }

          });
        }catch(error) {
          this.createLogJob(`Erro ao criar novos contratos: log - ${error}`,dateInitJob,  new Date());
        }
      }

      setTimeout(() => {
        this.createLogJob("Finalizou o processamento do JOB.", dateLogInit ,new Date());
      }, 500);

    }else {
      // Grava novos contratos quando não ah nenhum contrato na tabela.
      data.forEach( async (element: any, index: number) => {
        let dateInitJob: Date = new Date();
        try{
          await this.prisma.contrato.create({
            data: {
              dataFim: element.dataFim,
              dataInicio: element.dataInicio,
              empresa: element.empresa ,
              grupoCliente: element.grupoCliente,
              reajuste: element.reajuste,
              mesReajuste: element.mesReajuste,
              pec: element.pec,
              negocio: element.negocio,
              valor:element.valor,
              crContrato: {
                create: {
                  cr: element.cr,
                  descricaoCr: element.descricaoCr,
                  pecCr: element.pecCr,
                  descricaoPecCr: element.descricaoPecCr,
                  diretorCr: element.diretorCr,
                  diretorExecCr: element.diretorExecCr,
                  gerenteRegCr: element.gerenteRegCr,
                  gerenteCr: element.gerenteCr,
                  supervisorCr: element.supervisorCr,
                  regionalCr: element.regionalCr,
                  valorCr: element.valor
                },
              },
            },
          });

          if(data.length - 1 == index) {
            this.createLogJob(`Criou ${data.length.toString()} contratos.`,dateInitJob,  new Date());

            setTimeout(() => {
              this.createLogJob("Finalizou o processamento do JOB.", dateLogInit ,new Date());
            }, 500);
          }

        }catch (error) {
          this.createLogJob(`Ocorreu um erro ao criar o contrato: ${element.pec} : log - ${error}`,dateInitJob, new Date());
        }
      });        
    }
  }

  //! Grava log do processamento do job.
  async createLogJob(textInfoLog: string, dateInit?: Date, dateFim?: Date){

    await this.prisma.logJob.create({
      data: {
        infoLog:  textInfoLog,
        dataInicio: dateInit,
        dataFim: dateFim
      }
    });
  }
}
