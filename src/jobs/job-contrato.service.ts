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
  ) { }

  @Cron('59 59 16 * * 0-6')

  async handleCron() {
    let updateData: Array<any> = [];
    let createDataEncerrado: Array<any> = [];
    let createData: Array<any> = [];
    let data: Array<any> = [];
    let dateLogInit: Date = new Date();
    let monthValidation: Array<string> = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
    let resultPecContratos: Array<any> = [];
    let allContrato: any;
    let dateInitJob: Date = new Date();
    
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

    if (deleteAllPec.count > 0 || apiContratos.length > 0) {

      apiContratos.forEach(async (contrato: any, index: number) => {
        try {
          await this.prisma.pecContrato.create({
            data: {
              descricaoPec: contrato.desc_contrato == null ? "" : contrato.desc_contrato.trim(),
              grupoCliente: contrato.grupo_cliente == null ? "" : contrato.grupo_cliente.trim(),
              dataInicio: contrato.data_inicio == null ? "" : contrato.data_inicio.trim(),
              dataFim: contrato.data_fim == null ? "" : contrato.data_fim.trim(),
              empresa: contrato.empresa == null ? "" : contrato.empresa.trim(),
              negocio: contrato.negocio == null ? "" : contrato.negocio.trim(),
              indiceReajuste1: contrato.indice_reajuste1 == null ? "" : contrato.indice_reajuste1.trim(),
              mesReajuste1: contrato.mes_reajuste1 == (null || 0) ? "" : monthValidation[contrato.mes_reajuste1 - 1],
              indiceReajuste2: contrato.indice_reajuste2 == null ? "" : contrato.indice_reajuste2.trim(),
              mesReajuste2: contrato.mes_reajuste2 == (null || 0) ? "" : monthValidation[contrato.mes_reajuste2 - 1],
              indiceReajuste3: contrato.indice_reajuste3 == null ? "" : contrato.indice_reajuste3.trim(),
              mesReajuste3: contrato.mes_reajuste3 == (null || 0) ? "" : monthValidation[contrato.mes_reajuste3 - 1],
              pecCr: contrato.numero_pec == null ? "" : contrato.numero_pec.trim(),
              cr: contrato.cr_reduzido == null ? "" : contrato.cr_reduzido.trim(),
              descricaoCr: contrato.descricao_cr == null ? "" : contrato.descricao_cr.trim(),
              regionalCr: contrato.regional_cr == null ? "" : contrato.regional_cr.trim(),
              diretorCr: contrato.diretor_regional == null ? "" : contrato.diretor_regional.trim(),
              diretorExecCr: contrato.diretor_executivo == null ? "" : contrato.diretor_executivo.trim(),
              gerenteRegCr: contrato.gerente_regional == null ? "" : contrato.gerente_regional.trim(),
              gerenteCr: contrato.gerente == null ? "" : contrato.gerente.trim(),
              supervisorCr: contrato.supervisor == null ? "" : contrato.supervisor.trim(),
              status: contrato.status_pec == (null) ? 0 : contrato.status_pec,
              valorCr: contrato.faturamento_por_cr == (null) ? 0 : contrato.faturamento_por_cr,
            }
          });

          if (apiContratos.length - 1 == index) {
            this.createLogJob(`${apiContratos.length.toString()} - Contratos criados com sucesso na tabela PEC_CONTRATO.`, dateInitJob, new Date());
          }

        } catch (error) {
          this.createLogJob(`Ocorreu um erro ao tentar criar o contrato na tabela PEC_CONTRATO: ${JSON.stringify(contrato)}`, dateInitJob, new Date());
        }
      });
    }
    
    allContrato = await this.prisma.contrato.findMany();

    // monta array para ficar no formato do create e update para tabela contratos.
    resultPecContratos = await this.prisma.pecContrato.findMany({
      distinct: "pecCr",
    })
    

    resultPecContratos.forEach( async (element: any, index: number) => {
      
      
      try {
      let resultArrayCr: Array<any> = [];
      
      const resultValorGlobal = await this.prisma.$queryRaw<PecContrato>`
      SELECT SUM(valorCr) AS valorGlobal FROM PEC_CONTRATO
      WHERE pecCr = ${element.pecCr}`

      const resultCr = await this.prisma.pecContrato.findMany({
            select:{
              pecCr: true,
              cr: true,
              descricaoCr: true,
              regionalCr: true,
              diretorCr: true,
              diretorExecCr: true,
              gerenteRegCr: true,
              gerenteCr: true,
              supervisorCr: true,
              valorCr: true,
            }, where: {
              pecCr: element.pecCr
            }
          });
      

      data.push({
        descricaoPec: element.descricaoPec == null ? "" : element.descricaoPec,
        grupoCliente: element.grupoCliente == null ? "" : element.grupoCliente,
        dataInicio: element.dataInicio == null ? "" : element.dataInicio,
        dataFim: element.dataFim == null ? "" : element.dataFim,
        empresa: element.empresa == null ? "" : element.empresa,
        negocio: element.negocio == null ? "" : element.negocio,
        indiceReajuste1: element.indiceReajuste1 == null ? "" : element.indiceReajuste1,
        mesReajuste1: element.mesReajuste1 == (null || "") ? "" : element.mesReajuste1,
        indiceReajuste2: element.indiceReajuste2 == null ? "" : element.indiceReajuste2,
        mesReajuste2: element.mesReajuste2 == (null || "") ? "" : element.mesReajuste2,
        indiceReajuste3: element.indiceReajuste3 == null ? "" : element.indiceReajuste3,
        mesReajuste3: element.mesReajuste3 == (null || "") ? "" : element.mesReajuste3,
        valorGlobalPec: resultValorGlobal[0].valorGlobal,
        status: element.status == (null) ? 0 : element.status,
        data: resultCr
      });

      if (resultPecContratos.length - 1 == index) {
        
        this.createLogJob(`${data.length.toString()} Contratos adicionados com sucesso no data.`, dateInitJob, new Date());

        if(allContrato.length == 0) {
          // Grava novos contratos quando não ah nenh        um contrato na tabela.
      
          data.forEach(async (element: any, index: number) => {
            
            let statusAtualizado: string = ''
            let dateApi = element.dataFim.substring(0, 4) + '-' + element.dataFim.substring(4, 6) + '-' + element.dataFim.substring(6, 8) // yyyymmdd

            if (element.status == 14) {
              statusAtualizado = 'encerrado';
            } else if (dateApi < date) {
              statusAtualizado = 'vencido';
            } else {
              statusAtualizado = 'revisao';
            }

            try {
              if (index == 1){
                this.createLogJob('iniciou o processo de criação dos Contratos.', dateLogInit, new Date());}

              await this.prisma.contrato.create({
                data: {
                  dataFim: element.dataFim,
                  dataInicio: element.dataInicio,
                  empresa: element.empresa,
                  grupoCliente: element.grupoCliente,
                  reajuste1: element.indiceReajuste1,
                  mesReajuste1: element.mesReajuste1,
                  reajuste2: element.indiceReajuste2,
                  mesReajuste2: element.mesReajuste2,
                  reajuste3: element.indiceReajuste3,
                  mesReajuste3: element.mesReajuste3,
                  pec: element.descricaoPec,
                  negocio: element.negocio,
                  valor: element.valorGlobalPec,
                  status: statusAtualizado,
                  statusPec: element.status,
                  crContrato: {
                    createMany: {
                      data: element.data
                    }
                  },
                },
              });

              if (data.length - 1 == index) {
                this.createLogJob(`Criou ${data.length.toString()} contratos.`, dateInitJob, new Date());

                setTimeout(() => {
                  this.createLogJob("Finalizou o processamento do JOB.", dateLogInit, new Date());
                }, 500);
              }

            } catch (error) {
              this.createLogJob(`Ocorreu um erro ao criar o contrato: ${element.pec} : log - ${error}`, dateInitJob, new Date());
            }
          });
        }
      }
      
    } catch (error) {
      this.createLogJob('Ocorreu um erro no processo de push do data.', dateInitJob, new Date());
    }
    });

    
    // monta array com contratos a serem atualizados e criados.
    if (allContrato.length > 0) {
      for (let x = 0; x < allContrato.length; x++) {
        let validContrato: boolean = true;

        for (let i = 0; i < data.length; i++) {
          let arrayUpdate: Array<any> = [];
          let arrayCreateEncerrado: Array<any> = [];
          let deleteContrato: boolean = false;

          if (allContrato[i].pec == data[x].pec) {

            if (data[x].statusPec == 14 && allContrato[i].statusPec == 9) {
              arrayCreateEncerrado.push(data[x]);
              createDataEncerrado.push(arrayCreateEncerrado)
              deleteContrato = true;
            }

            arrayUpdate.push(data[x]);
            arrayUpdate = arrayUpdate.map((value: any) => {
              return {
                ...value,
                id: allContrato[x].id,
                deleted: deleteContrato,
              }
            });

            updateData.push(arrayUpdate);
            validContrato = false;
            break;
          }

          if (allContrato.length - 1 == i) {
            if (validContrato) {
              createData.push(data[x]);
            }
          }
        }
      }

      if (updateData.length > 0) {
 
        let updateCrContrato: Array<any> = [];

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
                reajuste1: updateData[i][0].reajuste1,
                mesReajuste1: updateData[i][0].mesReajuste1,
                reajuste2: updateData[i][0].reajuste2,
                mesReajuste2: updateData[i][0].mesReajuste2,
                reajuste3: updateData[i][0].reajuste3,
                mesReajuste3: updateData[i][0].mesReajuste3,
                valor: updateData[i][0].valorGlobalPec,
                status: updateData[i][0].status,
                deleted: updateData[i][0].deleted,
              },
              where: {
                id: updateData[i][0].id
              },
              include: {
                crContrato: true
              },
            });

            updateCrContrato.push(updateContrato);

            if (updateData.length - 1 == i) {
              this.createLogJob(`${updateData.length.toString()} - Contratos atualizados com sucesso.`, dateInitJob, new Date());
            }
          } catch (error) {
            this.createLogJob(`Erro ao atualizar a tabela de Contrato: log - ${error}`, dateInitJob, new Date());
          }
        }

        // Atualiza a tabela de CR's
        for (let i = 0; i < updateCrContrato.length; i++) {


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
                deleted: updateCrContrato[i].crContrato[0].deleted,
                valorCr: updateCrContrato[i].crContrato[0].valorCr,
              },
              where: {
                id: updateCrContrato[i].crContrato[0].id
              },
            });
          } catch (error) {
            this.createLogJob(`Erro ao atualizar a tabela de CR's: log - ${error}`, dateInitJob, new Date());
          }

          //! Valida o ultimo Cr a ser atualizado para criar o log.
          if (updateCrContrato.length - 1 == i) {
            this.createLogJob('Cr atualizado com sucesso.', dateInitJob, new Date());
          }
        }
      }


      // Valida se tem algum contrato novo para ser criado
      if (createData.length > 0) {

        let statusAtualizado: string = '';
        let dateApi: string = '';

        try {
          createData.forEach(async (element: any, index: number) => {
            dateApi = element.dataFim.substring(0, 4) + '-' + element.dataFim.substring(4, 6) + '-' + element.dataFim.substring(6, 8); // yyyymmdd 

            if (element.status == 14) {
              statusAtualizado = 'encerrado';
            } else if (dateApi < date) {
              statusAtualizado = 'vencido';
            } else {
              statusAtualizado = 'revisao';
            }

            await this.prisma.contrato.create({
              data: {
                dataFim: element.dataFim,
                dataInicio: element.dataInicio,
                empresa: element.empresa,
                grupoCliente: element.grupoCliente,
                reajuste1: element.indiceReajuste1,
                mesReajuste1: element.mesReajuste1,
                reajuste2: element.indiceReajuste2,
                mesReajuste2: element.mesReajuste2,
                reajuste3: element.indiceReajuste3,
                mesReajuste3: element.mesReajuste3,
                pec: element.descricaoPec,
                negocio: element.negocio,
                valor: element.valorGlobalPec,
                status: statusAtualizado,
                statusPec: element.status,
                crContrato: {
                  createMany: {
                    data: element.data
                  }
                },
              },
            });

            if (createData.length - 1 == index) {
              this.createLogJob(`Criou ${createData.length.toString()} novos contratos.`, dateInitJob, new Date());
            }

          });
        } catch (error) {
          this.createLogJob(`Erro ao criar novos contratos: log - ${error}`, dateInitJob, new Date());
        }
      }



      // Cria novos contratos encerrados
      if (createDataEncerrado.length > 0) {

        try {
          createDataEncerrado.forEach(async (element: any, index: number) => {

            await this.prisma.contrato.create({
              data: {
                dataFim: element.dataFim,
                dataInicio: element.dataInicio,
                empresa: element.empresa,
                grupoCliente: element.grupoCliente,
                reajuste1: element.indiceReajuste1,
                mesReajuste1: element.mesReajuste1,
                reajuste2: element.indiceReajuste2,
                mesReajuste2: element.mesReajuste2,
                reajuste3: element.indiceReajuste3,
                mesReajuste3: element.mesReajuste3,
                pec: element.descricaoPec,
                negocio: element.negocio,
                valor: element.valorGlobalPec,
                status: 'encerrado',
                statusPec: 14,
                crContrato: {
                  createMany: {
                    data: element.data
                  }
                },
              },
            });

            if (createDataEncerrado.length - 1 == index) {
              this.createLogJob(`Criou ${createDataEncerrado.length.toString()} novos contratos encerrado.`, dateInitJob, new Date());
            }

          });

        } catch (error) {
          this.createLogJob(`Erro ao criar contrato encerrado: log - ${error}`, dateInitJob, new Date());
        }

      }


      setTimeout(() => {
        this.createLogJob("Finalizou o processamento do JOB.", dateLogInit, new Date());
      }, 800);

    } 
  }

  //! Grava log do processamento do job.
  async createLogJob(textInfoLog: string, dateInit?: Date, dateFim?: Date) {

    await this.prisma.logJob.create({
      data: {
        infoLog: textInfoLog,
        dataInicio: dateInit,
        dataFim: dateFim
      }
    });
  }
}
