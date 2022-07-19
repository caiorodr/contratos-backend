/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Contrato } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { CookiesService } from 'src/cookies/cookies.service';


@Injectable()
export class ContratosService {


  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private cookiesService: CookiesService) { }

  async findAll(page: string, cr: string, pec: string, grupoCliente: string, diretorExec: string, diretorCr: string, gerente: string, gerenteReg: string, supervisor: string, dataInicio: string, dataFim: string, mesReajuste1: string, mesReajuste2: string, mesReajuste3: string, empresa: string, retencaoContrato: string, negocio: string, regional: string, valor: Decimal, status: string, tipoAss: string, valueCookie: string): Promise<any> {
    const dataInicioFormato = dataInicio ? dataInicio.substring(6, 10) + dataInicio.substring(3, 5) + dataInicio.substring(0, 2) : ''; //? aaaammdd
    const dataFimFormato = dataFim ? dataFim.substring(6, 10) + dataFim.substring(3, 5) + dataFim.substring(0, 2) : ''; //? aaaammdd
    const aRet: any = [];
    const validValor = String(valor).split(",").join("") == ('0' || null || undefined) ? '' : String(valor).split(",").join("");
    const valorQuery = validValor === '' ? '' : `AND contract.valor ::VARCHAR LIKE '%${validValor}%'`;
    let skipPage = 0;


    const idSiga: any = await this.cookiesService.getIdSiga(valueCookie);

    //* Busca o privilegio do usuario logado.
    const buscaPrivilegio = this.httpService.get(`${process.env.PRIVILEGIO_API + idSiga}/PRT_GC`)
      .pipe(
        map(
          (res) => res.data));
    const privilegio = await lastValueFrom(buscaPrivilegio);

    //* Busca o acesso de visualização de contratos do usuario logado. 
    const buscaAcesso = this.httpService.get(`${process.env.ACESSO_API + idSiga}`)
      .pipe(
        map(
          (res) => res.data));
    let acesso = await lastValueFrom(buscaAcesso);
    if (acesso == "TODOS") {

      acesso = ""
    } else if (acesso.length > 0) {

      acesso = acesso.split(',').join("','");
      acesso = "AND cr2.cr IN ('" + acesso.replace(/\s/g, "") + "')"
    } else {

      acesso = "AND cr2.cr = '*****'"

    }

    if (parseInt(page) != 0) {
      skipPage = (parseInt(page) * 11);
    }
    if ((privilegio == "ADM" || privilegio == "USER")) {
      try {
        const ret = await this.prisma.$queryRawUnsafe<any>(`
              SELECT 
                DISTINCT contract.id, contract.data_inicio AS "dataInicio", contract.data_fim AS "dataFim",
                contract.natureza, contract.grupo_cliente AS "grupoCliente", contract.empresa,
                contract.negocio, contract.doc_solid AS "docSolid", contract.retencao_contrato AS "retencaoContrato", contract.faturamento,
                contract.seguros, contract.reajuste1, contract.mes_reajuste1 AS "mesReajuste1", contract.perc_reajuste1 AS "percReajuste1",
                contract.reajuste2, contract.mes_reajuste2 AS "mesReajuste2", contract.perc_reajuste2 AS "percReajuste2",
                contract.reajuste3, contract.mes_reajuste3 AS "mesReajuste3", contract.perc_reajuste3 AS "percReajuste3", contract.tipo_ass AS "tipoAss", contract.status,
                contract.resumo, contract.lgpd, contract.limite_responsabilidade AS "limiteResponsabilidade", 
                contract.valor, contract.descricao_pec AS "descricaoPec", contract.updated_juridico AS "updatedJuridico", contract.valor_comparar AS "valorComparar", 
                contract.id_reajuste_comparar1 AS "idReajusteComparar1", contract.reajuste_comparar1 AS "reajusteComparar1", contract.mes_reajuste_comparar1 AS "mesReajusteComparar1", contract.perc_reajuste_comparar1 AS "percReajusteComparar1",
                contract.id_reajuste_comparar2 AS "idReajusteComparar2", contract.reajuste_comparar2 AS "reajusteComparar2", contract.mes_reajuste_comparar2 AS "mesReajusteComparar2",  contract.perc_reajuste_comparar2 AS "percReajusteComparar2",
                contract.id_reajuste_comparar3 AS "idReajusteComparar3", contract.reajuste_comparar3 AS "reajusteComparar3", contract.mes_reajuste_comparar3 AS "mesReajusteComparar3", contract.perc_reajuste_comparar3 AS "percReajusteComparar3", 
                contract.data_inicio_comparar AS "dataInicioComparar", contract.data_fim_comparar AS "dataFimComparar", contract.id_siga AS "idSiga", contract.status_pec AS "statusPec", cr.diretor_exec_cr AS "diretorExecCr"
              FROM "CONTRATO" AS contract
                LEFT JOIN "CR_CONTRATO" AS cr ON cr.num_contrato_id = contract.id
                LEFT JOIN "CR_CONTRATO" AS cr2  ON cr2.num_contrato_id = contract.id
                WHERE contract.deleted = '0' 
                ${acesso}
              AND cr.descricao_cr LIKE '%${cr}%'
              AND cr.diretor_exec_cr LIKE '%${diretorExec}%'
              AND cr.diretor_cr LIKE '%${diretorCr}%'
              AND cr.gerente_cr LIKE '%${gerente}%'
              AND cr.gerente_reg_cr LIKE '%${gerenteReg}%'
              AND cr.supervisor_cr LIKE '%${supervisor}%'
              AND cr.regional_cr LIKE '%${regional}%'
              AND contract.pec LIKE '%${pec}%'
              AND contract.grupo_cliente LIKE '%${grupoCliente}%'
              AND contract.data_inicio LIKE '%${dataInicioFormato}%'
              AND contract.data_fim LIKE '%${dataFimFormato}%'
              AND contract.mes_reajuste1 LIKE '%${mesReajuste1}%'
              AND contract.mes_reajuste2 LIKE '%${mesReajuste2}%'
              AND contract.mes_reajuste3 LIKE '%${mesReajuste3}%'
              AND contract.empresa LIKE '%${empresa}%'
              AND contract.retencao_contrato LIKE '%${retencaoContrato}%'
              AND contract.negocio LIKE '%${negocio}%'
              AND contract.status LIKE '%${status}%'
              AND contract.tipo_ass LIKE '%${tipoAss}%'
              ${valorQuery}
              ORDER BY contract.id DESC LIMIT 11 OFFSET ${skipPage}`)
          .then((values: any) => {
            return values.map((value: any) => {
              return {
                ...value,
                dataFim: value.dataFim.substring(6, 8) + '/' + value.dataFim.substring(4, 6) + '/' + value.dataFim.substring(0, 4) == '//' ? '' :
                  value.dataFim.substring(6, 8) + '/' + value.dataFim.substring(4, 6) + '/' + value.dataFim.substring(0, 4),
                dataInicio: value.dataInicio.substring(6, 8) + '/' + value.dataInicio.substring(4, 6) + '/' + value.dataInicio.substring(0, 4) == '//' ? '' :
                  value.dataInicio.substring(6, 8) + '/' + value.dataInicio.substring(4, 6) + '/' + value.dataInicio.substring(0, 4),
                dataInicioComparar: value.dataInicioComparar.split('-').reverse().join('/'),
                dataFimComparar: value.dataFimComparar.split('-').reverse().join('/'),
                lgpd: value.lgpd == true ? 1 : 0,
                limiteResponsabilidade: value.limiteResponsabilidade == true ? 1 : 0,
              }
            });
          });

        ret.forEach(addAcoes);

        function addAcoes(contrato) {
          if (privilegio == "ADM" && contrato.statusPec == 9) {
            contrato.acoes = ['visualizar', 'alterar', 'baixar'];
            aRet.push(contrato);
          } else if (privilegio == "USER" || contrato.statusPec == 14) {
            contrato.acoes = ['visualizar'];
            aRet.push(contrato);
          }
        }

        return aRet;

      } catch (error) {
        throw new HttpException('Parâmetro inválido, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException('Você não possui privilégio para acessar o sistema, contate a equipe HelpDesk Portal.', HttpStatus.NOT_FOUND);
    }
  }


  async findUnique(idContrato: number): Promise<Contrato> {
    return await this.prisma.contrato.findUnique({
      where: {
        id: idContrato
      },
      include: {
        file_data: true,
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(contratoId: number, data: UpdateContratoDto | any): Promise<Contrato> {

    let validResultReajuste1: any;
    let validResultReajuste2: any;
    let validResultReajuste3: any;
    let resultReajuste1: any = '';
    let resultReajuste2: any = '';
    let resultReajuste3: any = '';
    let dataContract: any;
    let statusAtualizado: any;



    if (data.length == 1) {

      try {
        return await this.prisma.contrato.update({
          where: {
            id: contratoId
          },
          data: data[0]
        });

      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
      }

    } else {
      try {
        if (typeof data.idReajusteComparar1 == 'number') {
          validResultReajuste1 = await this.prisma.reajuste.findUnique({
            select: {
              id: true,
              name: true
            },
            where: {
              id: data.idReajusteComparar1
            }
          });
          resultReajuste1 = validResultReajuste1.name == (null || undefined) ? '' : validResultReajuste1.name

        }

        if (typeof data.idReajusteComparar2 == 'number' && data.idReajusteComparar2 > 0) {
          validResultReajuste2 = await this.prisma.reajuste.findUnique({
            select: {
              id: true,
              name: true
            },
            where: {
              id: data.idReajusteComparar2
            }
          });
          resultReajuste2 = validResultReajuste2.name == (null || undefined) ? '' : validResultReajuste2.name
        }

        if (typeof data.idReajusteComparar3 == 'number' && data.idReajusteComparar3 > 0) {
          validResultReajuste3 = await this.prisma.reajuste.findUnique({
            select: {
              id: true,
              name: true
            },
            where: {
              id: data.idReajusteComparar3
            }
          });
          resultReajuste3 = validResultReajuste3.name == (null || undefined) ? '' : validResultReajuste3.name
        }
      } catch (error) {
        throw new HttpException('Falha ao buscar os campos na tabela REAJUSTE, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      //* Realizar a busca das informaçõess da tabela contratos e atualizar o status.
      dataContract = await this.prisma.contrato.findUnique({
        select: {
          valor: true,
          data_inicio: true,
          data_fim: true,
          reajuste1: true,
          reajuste2: true,
          reajuste3: true,
          mes_reajuste1: true,
          mes_reajuste2: true,
          mes_reajuste3: true,
          perc_reajuste1: true,
          perc_reajuste2: true,
          perc_reajuste3: true,
        }, where: {
          id: contratoId
        }
      });

      try {
        if ((dataContract.valor != data.valorComparar) || (dataContract.data_inicio != data.dataInicioComparar.split("-").join("")) || (dataContract.data_fim != data.dataFimComparar.split("-").join("")) ||
          (dataContract.reajuste1 != resultReajuste1) || (dataContract.reajuste2 != resultReajuste2) || (dataContract.reajuste3 != resultReajuste3) ||
          (dataContract.mes_reajuste1 != data.mesReajusteComparar1) || (dataContract.mes_reajuste2 != data.mesReajusteComparar2) ||
          (dataContract.mes_reajuste3 != data.mesReajusteComparar3) || (Number(dataContract.perc_reajuste1) != Number(data.percReajusteComparar1)) ||
          (Number(dataContract.perc_reajuste2) != Number(data.percReajusteComparar2)) || (Number(dataContract.perc_reajuste3) != Number(data.percReajusteComparar3))) {

          statusAtualizado = 'analise'
        } else {
          statusAtualizado = 'ativo'
        }
      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
      }


      try {
        return await this.prisma.contrato.update({
          data: {
            data_fim_comparar: data.dataFimComparar == undefined || data.dataFimComparar == null ? '19990101' : data.dataFimComparar,
            data_inicio_comparar: data.dataInicioComparar == undefined || data.dataInicioComparar == null ? '19990101' : data.dataInicioComparar,
            doc_solid: data.docSolid == undefined || data.docSolid == null ? '' : data.docSolid,
            faturamento: data.faturamento == undefined || data.faturamento == null ? '' : data.faturamento,
            natureza: data.natureza == undefined || data.natureza == null ? '' : data.natureza,
            id_reajuste_comparar1: data.idReajusteComparar1 == null ? 0 : data.idReajusteComparar1,
            id_reajuste_comparar2: data.idReajusteComparar2 == null ? 0 : data.idReajusteComparar2,
            id_reajuste_comparar3: data.idReajusteComparar3 == null ? 0 : data.idReajusteComparar3,
            reajuste_comparar1: resultReajuste1 == undefined ? '' : resultReajuste1,
            reajuste_comparar2: resultReajuste2 == undefined ? '' : resultReajuste2,
            reajuste_comparar3: resultReajuste3 == undefined ? '' : resultReajuste3,
            mes_reajuste_comparar1: data.mesReajusteComparar1 == undefined || data.mesReajusteComparar1 == null ? '' : data.mesReajusteComparar1,
            mes_reajuste_comparar2: data.mesReajusteComparar2 == undefined || data.mesReajusteComparar2 == null ? '' : data.mesReajusteComparar2,
            mes_reajuste_comparar3: data.mesReajusteComparar3 == undefined || data.mesReajusteComparar3 == null ? '' : data.mesReajusteComparar3,
            perc_reajuste_comparar1: data.percReajusteComparar1 == undefined || data.percReajusteComparar1 == null ? 0 : data.percReajusteComparar1,
            perc_reajuste_comparar2: data.percReajusteComparar2 == undefined || data.percReajusteComparar2 == null ? 0 : data.percReajusteComparar2,
            perc_reajuste_comparar3: data.percReajusteComparar3 == undefined || data.percReajusteComparar3 == null ? 0 : data.percReajusteComparar3,
            retencao_contrato: data.retencaoContrato == undefined || data.retencaoContrato == null ? '' : data.retencaoContrato,
            seguros: data.seguros == undefined || data.seguros == null ? '' : data.seguros,
            tipo_ass: data.tipoAss == undefined || data.tipoAss == null ? '' : data.tipoAss,
            valor_comparar: data.valorComparar == undefined || data.valorComparar == null ? 0 : data.valorComparar,
            resumo: data.resumo,
            status: statusAtualizado,
            updated_juridico: data.updatedJuridico,
            lgpd: data.lgpd,
            limite_responsabilidade: data.limiteResponsabilidade,
            id_siga: data.idSiga,
          },
          where: {
            id: contratoId
          }
        });

      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findExportAll(valueCookie: any) {

    

    const idSiga: any = await this.cookiesService.getIdSiga(valueCookie);

    const buscaAcesso = this.httpService.get(`${process.env.ACESSO_API + idSiga}`)
      .pipe(
        map(
          (res) => res.data));
    let acesso = await lastValueFrom(buscaAcesso);

    if (acesso == "TODOS") {

      acesso = ""
    } else if (acesso.length > 0) {

      acesso = acesso.split(',').join("','");
      acesso = "AND cr.cr IN ('" + acesso.replace(/\s/g, "") + "')"
    } else {

      acesso = "AND cr.cr = '*****'"

    }


    try {
      const exportAllRet = await this.prisma.$queryRawUnsafe<any>(`
            SELECT 
              DISTINCT contract.id AS "ID", contract.data_inicio AS "Data Inicio", contract.data_fim AS "Data Fim",
              contract.natureza AS "Natureza", contract.grupo_cliente AS "Grupo Cliente", contract.empresa AS "Empresa",
              contract.negocio AS "Negocio", contract.doc_solid AS "Documentação Solidaria", contract.retencao_contrato AS "Retenção Contrato", contract.faturamento AS "Faturamento",
              contract.seguros AS "Seguros", contract.reajuste1 AS "Reajuste", contract.mes_reajuste1 AS "Mes Reajuste 1", contract.perc_reajuste1 AS "Percentagem 1",
              contract.reajuste2 AS "Reajuste 2", contract.mes_reajuste2 AS "Mes Reajuste 2", contract.perc_reajuste2 AS "Percentagem 2",
              contract.reajuste3 AS "Reajuste 3", contract.mes_reajuste3 AS "Mes Reajuste 3", contract.perc_reajuste3 AS "Percentagem 3", contract.tipo_ass AS "Tipo Assinatura", contract.status AS "Status",
              contract.resumo AS "Resumo", contract.lgpd AS "LGPD", contract.limite_responsabilidade AS "Limite Responsabilidade", 
              contract.valor AS "Valor", contract.descricao_pec AS "Descrição Pec", contract.updated_juridico AS "Updated Jurídico", contract.valor_comparar AS "Valor Comparar", 
              contract.reajuste_comparar1 AS "Reajuste Jurídico 1", contract.mes_reajuste_comparar1 AS "Mes Reajuste Jurídico 1", contract.perc_reajuste_comparar1 AS "Percentual Jurídico 1",
              contract.reajuste_comparar2 AS "Reajuste Jurídico 2", contract.mes_reajuste_comparar2 AS "Mes Reajuste Jurídico 2",  contract.perc_reajuste_comparar2 AS "Percentual Jurídico 2",
              contract.reajuste_comparar3 AS "Reajuste Jurídico 3", contract.mes_reajuste_comparar3 AS "Mes Reajuste Jurídico 3", contract.perc_reajuste_comparar3 AS "Percentual Jurídico 3", 
              contract.data_inicio_comparar AS "Data Inicio Jurídico", contract.data_fim_comparar AS "Data Fim Jurídico", cr.diretor_exec_cr AS "Diretor Executivo"
            FROM "CONTRATO" AS contract
              LEFT JOIN "CR_CONTRATO" AS cr ON cr.num_contrato_id = contract.id
              WHERE contract.deleted = '0' 
              ${acesso}`)


      return exportAllRet
    }
    catch (error) {
      throw new HttpException('Falha ao tentar alterar o contrato, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}