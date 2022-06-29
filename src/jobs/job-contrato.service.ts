import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pec_contrato } from '@prisma/client';


@Injectable()
export class JobContratoService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService
  ) { }

  //?=================================================winn========================================================
  //? Objetivo: Responsavel por atualizar a tabela PEC_CONTRATO                                                  =
  //? Autor   : Web Innovation                                                                                   =
  //? Data    : 20220101                                                                                         =
  //?=================================================winn========================================================
  @Cron('00 00 00 * * 0-6')

  async jobpec_contrato() {
    let dateInitProcess: Date = new Date();
    let monthValidation: Array<string> = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
    let dateInitJob: Date = new Date();

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

    await this.createLogJob("JOB PEC_CONTRATO - INICIADO.", dateInitJob);

    const observable = this.httpService.post('https://ms-pec-api-dswen62thq-ue.a.run.app/api/pec/listarContratos', dataBody, header)
      .pipe(
        map(
          (res) => res.data
        )
      );

    // result api microserviço pec
    const apiContratos = await lastValueFrom(observable);

    // deleta todos os contratos da tabela intermediaria
    const deleteAllPec = await this.prisma.pec_contrato.deleteMany();

    if (deleteAllPec.count > 0) {
      await this.createLogJob(`TABELA PEC_CONTRATO DELETADO COM SUCESSO!`, new Date());
    }


    // realiza a criação dos contratos atualizado.
    if (apiContratos.length > 0) {
      dateInitProcess = new Date();

      apiContratos.forEach(async (contrato: any, index: number) => {
        try {
          if ((contrato.status_pec == 14 && Number(contrato.data_fim.substring(0, 4))) > 2022 || contrato.status_pec == 9) {
            await this.prisma.pec_contrato.create({
              data: {
                descricao_pec: contrato.desc_contrato == null || contrato.desc_contrato == undefined ? "" : contrato.desc_contrato.trim(),
                grupo_cliente: contrato.grupo_cliente == null || contrato.grupo_cliente == undefined ? "" : contrato.grupo_cliente.trim(),
                data_inicio: contrato.data_inicio == null || contrato.data_inicio == undefined ? "" : contrato.data_inicio.trim(),
                data_fim: contrato.data_fim == null || contrato.data_fim == undefined ? "" : contrato.data_fim.trim(),
                empresa: contrato.empresa == null || contrato.empresa == undefined ? "" : contrato.empresa.trim(),
                negocio: contrato.negocio == null || contrato.negocio == undefined ? "" : contrato.negocio.trim(),
                indice_reajuste1: contrato.indice_reajuste1 == null || contrato.indice_reajuste1 == undefined ? "" : contrato.indice_reajuste1.trim(),
                mes_reajuste1: contrato.mes_reajuste1 == null || 0 || contrato.mes_reajuste1 == undefined ? "" : monthValidation[contrato.mes_reajuste1 - 1],
                perc_reajuste1: contrato.perc_reajuste1 == null || contrato.perc_reajuste1 == undefined ? 0 : contrato.perc_reajuste1,
                indice_reajuste2: contrato.indice_reajuste2 == null || contrato.indice_reajuste2 == undefined ? "" : contrato.indice_reajuste2.trim(),
                mes_reajuste2: contrato.mes_reajuste2 == null || 0 || contrato.mes_reajuste2 == undefined ? "" : monthValidation[contrato.mes_reajuste2 - 1],
                perc_reajuste2: contrato.perc_reajuste2 == null || contrato.perc_reajuste2 == undefined ? 0 : contrato.perc_reajuste2,
                indice_reajuste3: contrato.indice_reajuste3 == null || contrato.indice_reajuste3 == undefined ? "" : contrato.indice_reajuste3.trim(),
                mes_reajuste3: contrato.mes_reajuste3 == null || 0 || contrato.mes_reajuste3 == undefined ? "" : monthValidation[contrato.mes_reajuste3 - 1],
                perc_reajuste3: contrato.perc_reajuste3 == null || contrato.perc_reajuste3 == undefined ? 0 : contrato.perc_reajuste3,
                pec_cr: contrato.numero_pec == null || contrato.numero_pec == undefined ? "" : contrato.numero_pec.trim(),
                cr: contrato.cr_reduzido == null || contrato.cr_reduzido == undefined ? "" : contrato.cr_reduzido.trim(),
                descricao_cr: contrato.descricao_cr == null || contrato.descricao_cr == undefined ? "" : contrato.cr_reduzido.trim() + " - " + contrato.descricao_cr.trim(),
                regional_cr: contrato.regional_cr == null || contrato.regional_cr == undefined ? "" : contrato.regional_cr.trim(),
                diretor_cr: contrato.diretor_regional == null || contrato.diretor_regional == undefined ? "" : contrato.diretor_regional.trim(),
                diretor_exec_cr: contrato.diretor_executivo == null || contrato.diretor_executivo == undefined ? "" : contrato.diretor_executivo.trim(),
                gerente_reg_cr: contrato.gerente_regional == null || contrato.gerente_regional == undefined ? "" : contrato.gerente_regional.trim(),
                gerente_cr: contrato.gerente == null || contrato.gerente == undefined ? "" : contrato.gerente.trim(),
                supervisor_cr: contrato.supervisor == null || contrato.supervisor == undefined ? "" : contrato.supervisor.trim(),
                status: contrato.status_pec == null || contrato.status_pec == undefined ? 0 : contrato.status_pec,
                valor_cr: contrato.faturamento_por_cr == null || contrato.faturamento_por_cr == undefined ? 0 : contrato.faturamento_por_cr,
              }
            });

            if (apiContratos.length - 1 == index) {
              await this.createLogJob(`${apiContratos.length.toString()} - CONTRATO CRIADOS COM SUCESSO NA TABELA PEC_CONTRATO.`, dateInitProcess, new Date());
              await this.createLogJob("JOB PEC_CONTRATO - FINALIZADO!", null, new Date());
            }
          }
        } catch (error) {
          await this.createLogJob(`ERRO AO CRIAR UM CONTRATO NA TABELA PEC_CONTRATO - INDEX:  ${index} - ERRO: ${error}`, dateInitProcess, new Date());
        }
      });
    }
  }





  //?=============================================================================================================
  //? Objetivo: Responsavel por atualizar a tabela CONTRATO                                                      =
  //? Autor   : Web Innovation                                                                                   =
  //? Data    : 20220101                                                                                         =
  //?==================================================web========================================================
  @Cron('00 01 11 * * 0-6')

  async jobContrato() {
    let updateData: Array<any> = [];
    let createDataEncerrado: Array<any> = [];
    let createData: Array<any> = [];
    let data: Array<any> = [];
    let resultpec_contratos: Array<any> = [];
    let allContrato: Array<any> = [];
    let dateInitProcess: Date;
    let dateInitJob: Date = new Date();

    // realiza a gravação do inicio do job
    await this.createLogJob("JOB CONTRATO - INICIADO.", dateInitJob);

    // realiza a criação dos contratos atualizado.
    allContrato = await this.prisma.contrato.findMany({
      where: {
        deleted: false,
      }
    });

    // monta array para ficar no formato do create e update para tabela contratos.
    resultpec_contratos = await this.prisma.pec_contrato.findMany({
      distinct: "pec_cr",
    })

    dateInitProcess = new Date();

    resultpec_contratos.forEach(async (element: any, index: number) => {

      try {
        const resultValorGlobal = await this.prisma.$queryRaw<Pec_contrato>`
        SELECT SUM(valor_cr) AS valorGlobal FROM "PEC_CONTRATO"
        WHERE pec_cr = ${element.pec_cr}`

        const resultCr = await this.prisma.pec_contrato.findMany({
          select: {
            pec_cr: true,
            cr: true,
            descricao_cr: true,
            regional_cr: true,
            diretor_cr: true,
            diretor_exec_cr: true,
            gerente_reg_cr: true,
            gerente_cr: true,
            supervisor_cr: true,
            valor_cr: true,
          }, where: {
            pec_cr: element.pec_cr
          }
        });


        data.push({
          pec: element.pec_cr == null || element.pec_cr == undefined ? "" : element.pec_cr,
          descricao_pec: element.descricao_pec == null || element.descricao_pec == undefined ? "" : element.descricao_pec,
          grupo_cliente: element.grupo_cliente == null || element.grupo_cliente == undefined ? "" : element.grupo_cliente,
          data_inicio: element.data_inicio == null || element.data_inicio == undefined ? "19990101" : element.data_inicio,
          data_fim: element.data_fim == null || element.data_fim == undefined ? "19990101" : element.data_fim,
          empresa: element.empresa == null || element.empresa == undefined ? "" : element.empresa,
          negocio: element.negocio == null || element.negocio == undefined ? "" : element.negocio,
          reajuste1: element.indice_reajuste1 == null || element.indice_reajuste1 == undefined ? "" : element.indice_reajuste1,
          mes_reajuste1: element.mes_reajuste1 == null || element.mes_reajuste1 == undefined ? "" : element.mes_reajuste1,
          perc_reajuste1: element.perc_reajuste1 == null || element.perc_reajuste1 == undefined ? 0 : element.perc_reajuste1,
          reajuste2: element.indice_reajuste2 == null || element.indice_reajuste2 == undefined ? "" : element.indice_reajuste2,
          mes_reajuste2: element.mes_reajuste2 == null || element.mes_reajuste2 == undefined ? "" : element.mes_reajuste2,
          perc_reajuste2: element.perc_reajuste2 == null || element.perc_reajuste2 == undefined ? 0 : element.perc_reajuste2,
          indice_reajuste3: element.indice_reajuste3 == null || element.indice_reajuste3 == undefined ? "" : element.indice_reajuste3,
          reajuste3: element.mes_reajuste3 == null || element.mes_reajuste3 == undefined ? "" : element.mes_reajuste3,
          perc_reajuste3: element.perc_reajuste3 == null || element.perc_reajuste3 == undefined ? "" : element.perc_reajuste3,
          status_pec: element.status == null || element.status == undefined ? 0 : element.status,
          valor_global_pec: resultValorGlobal[0].valorglobal,
          data_cr: resultCr
        });


        // Verifica se finalizou o for para gravar os dados na tabela de CONTRATO.
        if (resultpec_contratos.length - 1 == index) {
          await this.createLogJob(`${data.length.toString()} CONTRATOS ADICIONADO NO ARRAY DATA`, dateInitJob, new Date());

          // Grava novos contratos quando não ah nenhum contrato na tabela.
          if (allContrato.length == 0) {
            dateInitProcess = new Date();

            data.forEach(async (contrato: any, index: number) => {
              let statusAtualizado: string = ''

              if (contrato.status_pec == 14) {
                statusAtualizado = 'encerrado';
              } else {
                statusAtualizado = 'revisao';
              }

              try {
                if (index == 0) {
                  await this.createLogJob('CRIAÇÃO CONTRATOS - INICIADO.', dateInitProcess);
                }

                await this.prisma.contrato.create({
                  data: {
                    data_fim: contrato.data_fim,
                    data_inicio: contrato.data_inicio,
                    empresa: contrato.empresa,
                    grupo_cliente: contrato.grupo_cliente,
                    reajuste1: contrato.reajuste1,
                    mes_reajuste1: contrato.mes_reajuste1,
                    perc_reajuste1: contrato.perc_reajuste1,
                    reajuste2: contrato.reajuste2,
                    mes_reajuste2: contrato.mes_reajuste2,
                    perc_reajuste2: contrato.perc_reajuste2,
                    reajuste3: contrato.reajuste3,
                    mes_reajuste3: contrato.mes_reajuste3,
                    perc_reajuste3: contrato.perc_reajuste3,
                    pec: contrato.pec,
                    descricao_pec: contrato.descricao_pec,
                    negocio: contrato.negocio,
                    valor: contrato.valor_global_pec,
                    status: statusAtualizado,
                    status_pec: contrato.status_pec,
                    cr_contrato: {
                      createMany: {
                        data: contrato.data_cr
                      }
                    },
                  },
                });


                if (data.length - 1 == index) {
                  await this.createLogJob(`CRIOU ${data.length.toString()} CONTRATOS.`, dateInitProcess, new Date());

                  setTimeout(() => {
                    this.createLogJob("JOB FINALIZADO.", null, new Date());
                  }, 500);
                }

              } catch (error) {
                this.createLogJob(`ERRO AO CRIAR O CONTRATO: ${contrato.pec} : LOG - ${error}`, dateInitProcess, new Date());
              }
            });
          } else {

            // Monta array com contratos a serem atualizados e criados.
            if (allContrato.length > 0) {
              for (let i = 0; i < allContrato.length; i++) {
                let validContrato: boolean = true;

                for (let x = 0; x < data.length; x++) {
                  let arrayUpdate: Array<any> = [];
                  let arrayCreateEncerrado: Array<any> = [];

                  if (allContrato[i].pec == data[x].pec && allContrato[i].pec) {

                    if (data[x].status_pec == 14 && allContrato[i].status_pec == 9) {
                      arrayCreateEncerrado.push(data[x]);
                      createDataEncerrado.push(arrayCreateEncerrado);

                      arrayUpdate.push(allContrato[i]);
                      arrayUpdate = arrayUpdate.map((value: any) => {
                        return {
                          ...value,
                          id: allContrato[i].id,
                          deleted: true,
                        }
                      });

                      updateData.push(arrayUpdate);
                      validContrato = false;
                      break;

                    } else {

                      arrayUpdate.push(data[x]);
                      arrayUpdate = arrayUpdate.map((value: any) => {
                        return {
                          ...value,
                          id: allContrato[i].id,
                          deleted: false,
                        }
                      });

                      updateData.push(arrayUpdate);
                      validContrato = false;
                      break;

                    }
                  }

                  if (data.length - 1 == x) {
                    if (validContrato) {
                      createData.push(data[x]);
                    }
                  }
                }
              }


              // Valida se existe registros a serem atualizados.
              if (updateData.length > 0) {
                let updateCrContrato: Array<any> = [];

                for (let i = 0; i < updateData.length; i++) {

                  if (i == 0) {
                    this.createLogJob('ATUALIZAÇÃO CONTRATOS - INICIADO.', dateInitProcess);
                  }

                  try {
                    const updateContrato = await this.prisma.contrato.update({
                      data: {
                        data_fim: updateData[i][0].data_fim,
                        data_inicio: updateData[i][0].data_inicio,
                        grupo_cliente: updateData[i][0].grupo_cliente,
                        empresa: updateData[i][0].empresa,
                        negocio: updateData[i][0].negocio,
                        reajuste1: updateData[i][0].reajuste1,
                        mes_reajuste1: updateData[i][0].mes_reajuste1,
                        perc_reajuste1: updateData[i][0].perc_reajuste1,
                        reajuste2: updateData[i][0].reajuste2,
                        mes_reajuste2: updateData[i][0].mes_reajuste2,
                        perc_reajuste2: updateData[i][0].perc_reajuste2,
                        reajuste3: updateData[i][0].reajuste3,
                        mes_reajuste3: updateData[i][0].mes_reajuste3,
                        perc_reajuste3: updateData[i][0].perc_reajuste3,
                        valor: updateData[i][0].valor_global_pec,
                        status: updateData[i][0].status,
                        deleted: updateData[i][0].deleted,
                      },
                      where: {
                        id: updateData[i][0].id,
                      },
                      include: {
                        cr_contrato: true,
                      },
                    });

                    updateCrContrato.push(updateContrato);

                    if (updateData.length - 1 == i) {
                      this.createLogJob(`${updateData.length.toString()} - CONTRATOS ATUALIZADO COM SUCESSO.`, dateInitJob, new Date());
                    }
                  } catch (error) {
                    this.createLogJob(`ERRO AO ATUALIZAR A TABELA DE CONTRATOS: LOG - ${error}`, dateInitJob, new Date());
                  }
                }

                // Atualiza a tabela de CR's
                for (let i = 0; i < updateCrContrato.length; i++) {
                  if (i == 1) {
                    this.createLogJob('ATUALIZAÇÃO CR_CONTRATO - INICIADO.', dateInitProcess);
                  }

                  try {
                    await this.prisma.cr_contrato.update({
                      data: {
                        descricao_cr: updateCrContrato[i].cr_contrato[0].descricao_cr,
                        diretor_cr: updateCrContrato[i].cr_contrato[0].diretor_cr,
                        diretor_exec_cr: updateCrContrato[i].cr_contrato[0].diretor_exec_cr,
                        gerente_reg_cr: updateCrContrato[i].cr_contrato[0].gerente_reg_cr,
                        gerente_cr: updateCrContrato[i].cr_contrato[0].gerente_cr,
                        supervisor_cr: updateCrContrato[i].cr_contrato[0].supervisor_cr,
                        regional_cr: updateCrContrato[i].cr_contrato[0].regional_cr,
                        deleted: updateCrContrato[i].cr_contrato[0].deleted,
                        valor_cr: updateCrContrato[i].cr_contrato[0].valor_cr,
                      },
                      where: {
                        id: updateCrContrato[i].cr_contrato[0].id
                      },
                    });
                  } catch (error) {
                    this.createLogJob(`ERRO AO ATUALIZAR A TABELA DE CR: LOG - ${error}`, dateInitJob, new Date());
                  }

                  //! Valida o ultimo Cr a ser atualizado para criar o log.
                  if (updateCrContrato.length - 1 == i) {
                    this.createLogJob('CR ATUALIZADO COM SUCESSO.', dateInitJob, new Date());
                  }
                }
              }


              // Valida se tem algum contrato novo para ser criado
              if (createData.length > 0) {
                let statusAtualizado: string = '';

                try {
                  createData.forEach(async (element: any, index: number) => {

                    if (index == 0) {
                      this.createLogJob(`CRIAÇÃO DE ${createData.length.toString()} NOVOS CONTRATOS - INICIADO.`, dateInitProcess);
                    }

                    if (element.status_pec == 14) {
                      statusAtualizado = 'encerrado';
                    } else {
                      statusAtualizado = 'revisao';
                    }

                    await this.prisma.contrato.create({
                      data: {
                        data_fim: element.data_fim,
                        data_inicio: element.data_inicio,
                        empresa: element.empresa,
                        grupo_cliente: element.grupo_cliente,
                        reajuste1: element.indice_reajuste1,
                        mes_reajuste1: element.mes_reajuste1,
                        perc_reajuste1: element.perc_reajuste1,
                        reajuste2: element.indice_reajuste2,
                        mes_reajuste2: element.mes_reajuste2,
                        perc_reajuste2: element.perc_reajuste2,
                        reajuste3: element.indice_reajuste3,
                        mes_reajuste3: element.mes_reajuste3,
                        perc_reajuste3: element.perc_reajuste3,
                        pec: element.pec,
                        descricao_pec: element.descricao_pec,
                        negocio: element.negocio,
                        valor: element.valor_global_pec,
                        status: statusAtualizado,
                        status_pec: element.status,
                        cr_contrato: {
                          createMany: {
                            data: element.data_cr
                          }
                        },
                      },
                    });

                    if (createData.length - 1 == index) {
                      this.createLogJob(`CRIOU ${createData.length.toString()} NOVOS CONTRATOS.`, dateInitJob, new Date());
                    }
                  });
                } catch (error) {
                  this.createLogJob(`ERRO AO CRIAR NOVOS CONTRATOS: INDEX - ${index} - LOG - ${error}`, dateInitJob, new Date());
                }
              }


              // Cria novos contratos encerrados
              if (createDataEncerrado.length > 0) {

                try {
                  createDataEncerrado.forEach(async (element: any, index: number) => {

                    if (index == 0) {
                      this.createLogJob(`CRIAÇÃO DE ${createDataEncerrado.length.toString()} NOVOS CONTRATO COM STATUS 14 - INICIADO.`, dateInitProcess);
                    }

                    await this.prisma.contrato.create({
                      data: {
                        data_fim: element[0].data_fim,
                        data_inicio: element[0].data_inicio,
                        empresa: element[0].empresa,
                        grupo_cliente: element[0].grupo_cliente,
                        reajuste1: element[0].indice_reajuste1,
                        mes_reajuste1: element[0].mes_reajuste1,
                        perc_reajuste1: element[0].perc_reajuste1,
                        reajuste2: element[0].indice_reajuste2,
                        mes_reajuste2: element[0].mes_reajuste2,
                        perc_reajuste2: element[0].perc_reajuste2,
                        reajuste3: element[0].indice_reajuste3,
                        mes_reajuste3: element[0].mes_reajuste3,
                        perc_reajuste3: element[0].perc_reajuste3,
                        pec: element[0].pec,
                        descricao_pec: element[0].descricao_pec,
                        negocio: element[0].negocio,
                        valor: element[0].valor_global_pec,
                        status: 'encerrado',
                        status_pec: 14,
                        cr_contrato: {
                          createMany: {
                            data: element[0].data_cr
                          }
                        },
                      },
                    });

                    if (createDataEncerrado.length - 1 == index) {
                      this.createLogJob(`CRIOU ${createDataEncerrado.length.toString()} NOVOS CONTRATOS ENCERRADOS.`, dateInitJob, new Date());
                    }

                  });

                } catch (error) {
                  this.createLogJob(`ERRO AO CRIAR CONTRATOS ENCERRADOS: LOG - ${error}`, null, new Date());
                }
              }


              setTimeout(() => {
                this.createLogJob("JOB CONTRATO FINALIZADO!", null, new Date());
              }, 800);

            };
          }
        }
      } catch (error) {
        this.createLogJob(`ERRO AO FAZER O PUSH NO DATA. LOG: ${error}`, dateInitJob, new Date());
      }
    });

  };





  //?=============================================================================================================
  //? Objetivo: Responsavel por atualizar a tabela REAJUSTE                                                      =
  //? Autor   : Web Innovation                                                                                   =
  //? Data    : 20220101                                                                                         =
  //?==================================================web========================================================
  @Cron('00 00 11 * * 0-6')
  async jobCreateReajuste() {
    let tablePec: Array<any> = [];
    let createData: Array<any> = [];
    let createAllData: Array<any> = [];
    let tableReajuste: Array<any> = [];
    let dateInitProcess: Date = new Date();

    await this.createLogJob(`JOB CREATE REAJUSTE - INICIADO.`, dateInitProcess, null);


    // Result de todos os reajustes da tabela PEC_CONTRATO
    tablePec = await this.prisma.pec_contrato.findMany({
      distinct: 'indice_reajuste1',
      select: {
        indice_reajuste1: true
      }
    });

    // Result de todos os reajustes da tabela REAJUSTE
    tableReajuste = await this.prisma.reajuste.findMany({
      select: {
        name: true,
      }
    });

    if (tableReajuste.length > 0) {
      dateInitProcess = new Date();

      for (let i = 0; i < tablePec.length; i++) {
        let validReajuste: boolean = true;
        for (let _n = 0; _n < tableReajuste.length; _n++) {
          if (tablePec[i].indice_reajuste1 == tableReajuste[_n].name) {
            validReajuste = false;
            break;
          }

          if (tableReajuste.length - 1 == _n) {
            if (validReajuste) {
              createData.push({ name: tablePec[i].indice_reajuste1 });
            }
          }
        }
      }
    } else {
      tablePec.forEach((reajuste: any) => {
        createAllData.push({ name: reajuste.indice_reajuste1 })
      });
    }



    if (createAllData.length > 0) {
      try {
        await this.prisma.reajuste.createMany({
          data: createAllData
        });

        await this.createLogJob(`JOB REAJUSTE FINALIZADO! `, null, new Date());

      } catch (error) {
        await this.createLogJob(`ERRO AO CRIAR OS REAJUSTES:  ${error}`, dateInitProcess, new Date());
      }
    }



    if (createData.length > 0) {
      try {
        await this.prisma.reajuste.createMany({
          data: createData
        });

        await this.createLogJob(`JOB REAJUSTE FINALIZADO! `, null, new Date());

      } catch (error) {
        this.createLogJob(`ERRO AO CRIAR OS REAJUSTES:  ${error}`, dateInitProcess, new Date());
      }
    }
  }


  //! Grava log do processamento do job.
  async createLogJob(textInfoLog: string, dateInit?: Date, dateFim?: Date) {
    try {
      await this.prisma.logJob.create({
        data: {
          info_log: textInfoLog,
          data_inicio: dateInit,
          data_fim: dateFim,
        },
      });
    } catch (error) {
      console.log(error)
    }

  }
}
