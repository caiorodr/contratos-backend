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
              DISTINCT contract.id, contract.dataInicio, contract.dataFim,
              contract.natureza, contract.grupoCliente, contract.empresa,
              contract.negocio, contract.docSolid, contract.retencaoContrato, contract.faturamento,
              contract.seguros, contract.reajuste1, contract.mesReajuste1, contract.percReajuste1,
              contract.reajuste2, contract.mesReajuste2, contract.percReajuste2,
              contract.reajuste3, contract.mesReajuste3, contract.percReajuste3, contract.tipoAss, contract.status,
              contract.resumo, contract.lgpd, contract.limiteResponsabilidade, 
              contract.valor, contract.descricaoPec, contract.updatedJuridico, contract.valorComparar, 
              contract.idReajusteComparar1, contract.reajusteComparar1, contract.mesReajusteComparar1, contract.percReajusteComparar1,
              contract.idReajusteComparar2, contract.reajusteComparar2, contract.mesReajusteComparar2,  contract.percReajusteComparar2,
              contract.idReajusteComparar3, contract.reajusteComparar3, contract.mesReajusteComparar3, contract.percReajusteComparar3, 
              contract.dataInicioComparar, contract.dataFimComparar, contract.idSiga, contract.statusPec, cr.diretorExecCr
            FROM CONTRATO AS contract
              LEFT JOIN CR_CONTRATO AS cr ON cr.numContratoId = contract.id
              LEFT JOIN CR_CONTRATO AS cr2  ON cr2.numContratoId = contract.id
              WHERE contract.deleted = 0 
              ${acesso}
              AND cr.descricaoCr LIKE '%${cr}%'
              AND cr.diretorExecCr LIKE '%${diretorExec}%'
              AND cr.diretorCr LIKE '%${diretorCr}%'
              AND cr.gerenteCr LIKE '%${gerente}%'
              AND cr.gerenteRegCr LIKE '%${gerenteReg}%'
              AND cr.supervisorCr LIKE '%${supervisor}%'
              AND cr.regionalCr LIKE '%${regional}%'
              AND contract.pec LIKE '%${pec}%'
              AND contract.grupoCliente LIKE '%${grupoCliente}%'
              AND contract.dataInicio LIKE '%${dataInicioFormato}%'
              AND contract.dataFim LIKE '%${dataFimFormato}%'
              AND contract.mesReajuste1 LIKE '%${mesReajuste1}%'
              AND contract.mesReajuste2 LIKE '%${mesReajuste2}%'
              AND contract.mesReajuste3 LIKE '%${mesReajuste3}%'
              AND contract.empresa LIKE '%${empresa}%'
              AND contract.retencaoContrato LIKE '%${retencaoContrato}%'
              AND contract.negocio LIKE '%${negocio}%'
              AND contract.status LIKE '%${status}%'
              AND contract.tipoAss LIKE '%${tipoAss}%'
              AND contract.valor LIKE '%${validValor}%'
              ORDER BY contract.id DESC LIMIT 20 OFFSET ${skipPage}`)
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
        fileData: true
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
          dataInicio: true,
          dataFim: true,
          reajuste1: true,
          reajuste2: true,
          reajuste3: true,
          mesReajuste1: true,
          mesReajuste2: true,
          mesReajuste3: true,
          percReajuste1: true,
          percReajuste2: true,
          percReajuste3: true,
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
            dataFimComparar: data.dataFimComparar == undefined || data.dataFimComparar == null ? '19990101' : data.dataFimComparar,
            dataInicioComparar: data.dataInicioComparar == undefined || data.dataInicioComparar == null ? '19990101' : data.dataInicioComparar,
            docSolid: data.docSolid == undefined || data.docSolid == null ? '' : data.docSolid,
            faturamento: data.faturamento == undefined || data.faturamento == null ? '' : data.faturamento,
            natureza: data.natureza == undefined || data.natureza == null ? '' : data.natureza,
            idReajusteComparar1: data.idReajusteComparar1 == null ? 0 : data.idReajusteComparar1,
            idReajusteComparar2: data.idReajusteComparar2 == null ? 0 : data.idReajusteComparar2,
            idReajusteComparar3: data.idReajusteComparar3 == null ? 0 : data.idReajusteComparar3,
            reajusteComparar1: resultReajuste1 == undefined ? '' : resultReajuste1,
            reajusteComparar2: resultReajuste2 == undefined ? '' : resultReajuste2,
            reajusteComparar3: resultReajuste3 == undefined ? '' : resultReajuste3,
            mesReajusteComparar1: data.mesReajusteComparar1 == undefined || data.mesReajusteComparar1 == null ? '' : data.mesReajusteComparar1,
            mesReajusteComparar2: data.mesReajusteComparar2 == undefined || data.mesReajusteComparar2 == null ? '' : data.mesReajusteComparar2,
            mesReajusteComparar3: data.mesReajusteComparar3 == undefined || data.mesReajusteComparar3 == null ? '' : data.mesReajusteComparar3,
            percReajusteComparar1: data.percReajusteComparar1 == undefined || data.percReajusteComparar1 == null ? 0 : data.percReajusteComparar1,
            percReajusteComparar2: data.percReajusteComparar2 == undefined || data.percReajusteComparar2 == null ? 0 : data.percReajusteComparar2,
            percReajusteComparar3: data.percReajusteComparar3 == undefined || data.percReajusteComparar3 == null ? 0 : data.percReajusteComparar3,
            retencaoContrato: data.retencaoContrato == undefined || data.retencaoContrato == null ? '' : data.retencaoContrato,
            seguros: data.seguros == undefined || data.seguros == null ? '' : data.seguros,
            tipoAss: data.tipoAss == undefined || data.tipoAss == null ? '' : data.tipoAss,
            valorComparar: data.valorComparar == undefined || data.valorComparar == null ? 0 : data.valorComparar,
            resumo: data.resumo,
            status: statusAtualizado,
            updatedJuridico: data.updatedJuridico,
            lgpd: data.lgpd,
            limiteResponsabilidade: data.limiteResponsabilidade,
            idSiga: data.idSiga,
          },
        });

      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato, contate a equipe de desenvolvimento.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

