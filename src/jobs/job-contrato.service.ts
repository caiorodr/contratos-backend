import { HttpService } from '@nestjs/axios'; 
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PecContrato } from '@prisma/client';


@Injectable()
export class JobContratoService {

  constructor(
    private httpService: HttpService,
    private prisma: PrismaService
  ) {}

  @Cron('10 41 16 * * 0-6')

  async handleCron() {
    let updateData  : Array<any> = [];
    let createData  : Array<any> = [];
    let data        : Array<any> = [];
    let dateLogInit : Date = new  Date();
    let MonthValidation: Array<string> = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];

    // DATA DE HOJE
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //Janeiro = 0
    let yyyy = today.getFullYear();
    let date = yyyy + '-' + mm + '-' + dd;

    const headersOptions = {
      'Content-Type': 'application/json',
      'authenticationToken': 'M0IxTFFSWlgtSU8zRS1WT1dLLUY5RkUtRDZTMldMS1hXTDBU'
    }
    
    const header = {                                                                                                                                                                                 
      headers: headersOptions
    };
    const dataBody = {
      "dataHoraAtualizacao": null
    };
    
    this.createLogJob("Iniciou o processamento do JOB.", dateLogInit);

    const observable = this.httpService.post('https://ms-pec-api-dswen62thq-ue.a.run.app/api/pec/listarContratos', dataBody, header)
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

      apiContratos.forEach(async (contrato: any, index: number) => {
        try{
          await this.prisma.pecContrato.create({
            data: {
              descricaoPec: contrato.desc_contrato == null ? "": contrato.desc_contrato.trim(),
              grupoCliente: contrato.grupo_cliente == null ? "": contrato.grupo_cliente.trim(),
              dataInicio: contrato.data_inicio == null ? "": contrato.data_inicio.trim(),
              dataFim: contrato.data_fim == null ? "": contrato.data_fim.trim(),
              empresa: contrato.empresa == null ? "": contrato.empresa.trim(),
              negocio: contrato.negocio == null ? "": contrato.negocio.trim(),
              indiceReajuste: contrato.indice_reajuste1 == null ? "": contrato.indice_reajuste1.trim(),
              mesReajuste: MonthValidation[contrato.mes_reajuste1 - 1],
              pec: contrato.numero_pec == null ? "": contrato.numero_pec.trim(),
              crReduzido: contrato.cr_reduzido == null ? "": contrato.cr_reduzido.trim(),
              descricaoCr: contrato.descricao_cr == null ? "": contrato.descricao_cr.trim(),
              regional: contrato.regional_cr == null ? "": contrato.regional_cr.trim(),
              diretorRegional: contrato.diretor_regional == null ? "": contrato.diretor_regional.trim(),
              diretorExecutivo: contrato.diretor_executivo == null ? "": contrato.diretor_executivo.trim(),
              gerenteRegional: contrato.gerente_regional == null ? "": contrato.gerente_regional.trim(),
              gerenteExecutivo: contrato.gerente == null ? "": contrato.gerente.trim(),
              supervisor: contrato.supervisor == null ? "": contrato.supervisor.trim(),
            }
          });
      }catch (error) {
          throw new HttpException('Parâmetro invalido.' + error, HttpStatus.INTERNAL_SERVER_ERROR);}
      })
    }
  

    // monta array para ficar no formato do create e update para tabela contratos.
    apiContratos.forEach( (element: any) => {      


      data.push({
      pec: element.desc_contrato == null ? "": element.desc_contrato.trim(),
      grupoCliente: element.grupo_cliente == null ? "": element.grupo_cliente.trim(),
      dataInicio: element.data_inicio == null ? "": element.data_inicio.trim(),
      dataFim: element.data_fim == null ? "": element.data_fim.trim(),
      empresa: element.empresa == null ? "": element.empresa.trim(),
      negocio: element.negocio == null ? "": element.negocio.trim(),
      reajuste: element.indice_reajuste1 == null ? "": element.indice_reajuste1.trim(),
      mesReajuste: MonthValidation[element.mes_reajuste1 - 1],
      valor: 666.666,
      pecCr: element.numero_pec == null ? "": element.indice_reajuste1.trim(),
      descricaoPecCr: element.desc_contrato == null ? "": element.indice_reajuste1.trim(),
      cr: element.cr_reduzido == null ? "": element.indice_reajuste1.trim(),
      descricaoCr: element.descricao_cr == null ? "": element.indice_reajuste1.trim(),
      regionalCr: element.regional_cr == null ? "": element.indice_reajuste1.trim(),
      diretorCr: element.diretor_regional == null ? "": element.indice_reajuste1.trim(),
      diretorExecCr: element.diretor_executivo == null ? "": element.indice_reajuste1.trim(),
      gerenteRegCr: element.gerente_regional == null ? "": element.indice_reajuste1.trim(),
      gerenteCr: element.gerente == null ? "": element.indice_reajuste1.trim(),
      supervisorCr: element.supervisor == null ? "": element.indice_reajuste1.trim(),
      });
    }); 
    
    // result todos os contrato ja inseridos na tabela.
    const allContrato = await this.prisma.contrato.findMany();

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
                mesReajuste: updateData[i][0].mesReajuste,
                valor: updateData[i][0].valor,
                status: updateData[i][0].status,
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
        let statusAtualizado: string = '';     
        let dateApi: string = ''; 
        
        try {
          createData.forEach(async (element: any,index: number) => {
            dateApi = element.dataFim.substring(0,4) +'-'+  element.dataFim.substring(4,6)  +'-'+  element.dataFim.substring(6,8); // yyyymmdd 

            if(dateApi > date) {
              statusAtualizado = 'vencido';
            }else {
              statusAtualizado = 'revisao';
            }

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
                status: statusAtualizado,
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
        let statusAtualizado: string = ''     
        let dateApi = element.dataFim.substring(0,4) +'-'+  element.dataFim.substring(4,6)  +'-'+  element.dataFim.substring(6,8) // yyyymmdd

        if(dateApi < date) {
          statusAtualizado = 'vencido';
        }else {
          statusAtualizado = 'revisao';
        }

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
              valor: element.valor,
              status: statusAtualizado,
              crContrato: {
                create: {
                  cr: element.cr,
                  descricaoCr: element.cr + ' - ' + element.descricaoCr,
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
