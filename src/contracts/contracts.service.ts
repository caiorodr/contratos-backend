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
    const valorQuery = validValor === '' ? '' : `AND contract.valor ::varchar  LIKE '%${validValor}%`;
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
      acesso = "AND cr2.cr IN ('${" + acesso + "}')"
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
              DISTINCT contract.id, contract.data_inicio, contract.data_fim,
              contract.natureza, contract.grupo_cliente, contract.empresa,
              contract.negocio, contract.doc_solid, contract.retencao_contrato, contract.faturamento,
              contract.seguros, contract.reajuste1, contract.mes_reajuste1, contract.perc_reajuste1,
              contract.reajuste2, contract.mes_reajuste2, contract.perc_reajuste2,
              contract.reajuste3, contract.mes_reajuste3, contract.perc_reajuste3, contract.tipo_ass, contract.status,
              contract.resumo, contract.lgpd, contract.limite_responsabilidade, 
              contract.valor, contract.descricao_pec, contract.updated_juridico, contract.valor_comparar, 
              contract.id_reajuste_comparar1, contract.reajuste_comparar1, contract.mes_reajuste_comparar1, contract.perc_reajuste_comparar1,
              contract.id_reajuste_comparar2, contract.reajuste_comparar2, contract.mes_reajuste_comparar2,  contract.perc_reajuste_comparar2,
              contract.id_reajuste_comparar3, contract.reajuste_comparar3, contract.mes_reajuste_comparar3, contract.perc_reajuste_comparar3, 
              contract.data_inicio_comparar, contract.data_fim_comparar, contract.id_siga, contract.status_pec, cr.diretor_exec_cr
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
              ORDER BY contract.id DESC LIMIT 20 OFFSET ${skipPage}`)
          .then((values: any) => {
            return values.map((value: any) => {
              return {
                ...value,
                data_fim: value.data_fim.substring(6, 8) + '/' + value.data_fim.substring(4, 6) + '/' + value.data_fim.substring(0, 4) == '//' ? '' :
                  value.data_fim.substring(6, 8) + '/' + value.data_fim.substring(4, 6) + '/' + value.data_fim.substring(0, 4),
                data_inicio: value.data_inicio.substring(6, 8) + '/' + value.data_inicio.substring(4, 6) + '/' + value.data_inicio.substring(0, 4) == '//' ? '' :
                  value.data_inicio.substring(6, 8) + '/' + value.data_inicio.substring(4, 6) + '/' + value.data_inicio.substring(0, 4),
                data_inicio_comparar: value.data_inicio_comparar.split('-').reverse().join('/'),
                data_fim_comparar: value.data_fim_comparar.split('-').reverse().join('/'),
              }
            });
          });

        ret.forEach(addAcoes);

        function addAcoes(contrato) {
          if (privilegio == "ADM" && contrato.status_pec == 9) {
            contrato.acoes = ['visualizar', 'alterar', 'baixar'];
            aRet.push(contrato);
          } else if (privilegio == "USER" || contrato.status_pec == 14) {
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
        file_data: true
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
        if ((dataContract.valor != data.valorComparar) || (dataContract.dataInicio != data.dataInicioComparar.split("-").join("")) || (dataContract.dataFim != data.dataFimComparar.split("-").join("")) ||
          (dataContract.reajuste1 != resultReajuste1) || (dataContract.reajuste2 != resultReajuste2) || (dataContract.reajuste3 != resultReajuste3) ||
          (dataContract.mesReajuste1 != data.mesReajusteComparar1) || (dataContract.mesReajuste2 != data.mesReajusteComparar2) ||
          (dataContract.mesReajuste3 != data.mesReajusteComparar3) || (Number(dataContract.percReajuste1) != Number(data.percReajusteComparar1)) ||
          (Number(dataContract.percReajuste2) != Number(data.percReajusteComparar2)) || (Number(dataContract.percReajuste3) != Number(data.percReajusteComparar3))) {

          statusAtualizado = 'analise'
        } else {
          statusAtualizado = 'ativo'
        }
      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
      }


      try {
        return await this.prisma.contrato.update({
          where: {
            id: contratoId
          },
          data: {
            data_fim_comparar: data.data_fim_comparar == undefined || data.data_fim_comparar == null ? '19990101' : data.data_fim_comparar,
            data_inicio_comparar: data.data_inicio_comparar == undefined || data.data_inicio_comparar == null ? '19990101' : data.data_inicio_comparar,
            doc_solid: data.doc_solid == undefined || data.doc_solid == null ? '' : data.doc_solid,
            faturamento: data.faturamento == undefined || data.faturamento == null ? '' : data.faturamento,
            natureza: data.natureza == undefined || data.natureza == null ? '' : data.natureza,
            id_reajuste_comparar1: data.id_reajuste_comparar1 == null ? 0 : data.id_reajuste_comparar1,
            id_reajuste_comparar2: data.id_reajuste_comparar2 == null ? 0 : data.id_reajuste_comparar2,
            id_reajuste_comparar3: data.id_reajuste_comparar3 == null ? 0 : data.id_reajuste_comparar3,
            reajuste_comparar1: resultReajuste1 == undefined ? '' : resultReajuste1,
            reajuste_comparar2: resultReajuste2 == undefined ? '' : resultReajuste2,
            reajuste_comparar3: resultReajuste3 == undefined ? '' : resultReajuste3,
            mes_reajuste_comparar1: data.mes_reajuste_comparar1 == undefined || data.mes_reajuste_comparar1 == null ? '' : data.mes_reajuste_comparar1,
            mes_reajuste_comparar2: data.mes_reajuste_comparar2 == undefined || data.mes_reajuste_comparar2 == null ? '' : data.mes_reajuste_comparar2,
            mes_reajuste_comparar3: data.mes_reajuste_comparar3 == undefined || data.mes_reajuste_comparar3 == null ? '' : data.mes_reajuste_comparar3,
            perc_reajuste_comparar1: data.perc_reajuste_comparar1 == undefined || data.perc_reajuste_comparar1 == null ? 0 : data.perc_reajuste_comparar1,
            perc_reajuste_comparar2: data.perc_reajuste_comparar2 == undefined || data.perc_reajuste_comparar2 == null ? 0 : data.perc_reajuste_comparar2,
            perc_reajuste_comparar3: data.perc_reajuste_comparar3 == undefined || data.perc_reajuste_comparar3 == null ? 0 : data.perc_reajuste_comparar3,
            retencao_contrato: data.retencao_contrato == undefined || data.retencao_contrato == null ? '' : data.retencao_contrato,
            seguros: data.seguros == undefined || data.seguros == null ? '' : data.seguros,
            tipo_ass: data.tipo_ass == undefined || data.tipo_ass == null ? '' : data.tipo_ass,
            valor_comparar: data.valor_comparar == undefined || data.valor_comparar == null ? 0 : data.valor_comparar,
            resumo: data.resumo,
            status: statusAtualizado,
            updated_juridico: data.updated_juridico,
            lgpd: data.lgpd,
            limite_responsabilidade: data.limite_responsabilidade,
            id_siga: data.id_siga,
          },
        });

      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

