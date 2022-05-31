/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Contrato } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';


@Injectable()
export class ContratosService {


  constructor(private prisma: PrismaService, private httpService: HttpService,
  ) { }

  async findAll(page: string, cr: string, pec: string, grupoCliente: string, diretorExec: string, diretorCr: string, gerente: string, gerenteReg: string, supervisor: string, dataInicio: string, dataFim: string, mesReajuste: string, empresa: string, retencaoContrato: string, negocio: string, regional: string, valor: Decimal, status: string, tipoAss: string): Promise<any> {
    const dataInicioFormato = dataInicio ? dataInicio.substring(6, 10) + dataInicio.substring(3, 5) + dataInicio.substring(0, 2) : ''; //? aaaammdd
    const dataFimFormato = dataFim ? dataFim.substring(6, 10) + dataFim.substring(3, 5) + dataFim.substring(0, 2) : ''; //? aaaammdd
    const aRet: any = [];
    let skipPage = 0;
    //const idSiga = '13919'
    const idSiga = '22612'
    //const idSiga = '22789'

    //* Busca o privilegio do usuario queesta acessando o sistema.
    const buscaPrivilegio = this.httpService.get(`${process.env.PRIVILEGIO_API + idSiga}/OEP_EC`)
      .pipe(
        map(
          (res) => res.data));
    const privilegio = await lastValueFrom(buscaPrivilegio);

    //* Busca o acesso de visualização de contratos do usuario que esta acessando o sistema. 
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

      acesso = "AND cr2.cr = ' '"

    }

    if (!(parseInt(page) == 0)) {
      skipPage = (parseInt(page) * 11);
    }

    try {
      const ret = await this.prisma.$queryRawUnsafe<any>(`
      SELECT 
        DISTINCT contrat.id, contrat.dataInicio, contrat.dataFim,
        contrat.natureza, contrat.grupoCliente, contrat.empresa,
        contrat.negocio, contrat.docSolid, contrat.retencaoContrato, contrat.faturamento,
        contrat.seguros, contrat.reajuste1, contrat.mesReajuste1, contrat.percReajuste1,
        contrat.reajuste2, contrat.mesReajuste2, contrat.percReajuste2,
        contrat.reajuste3, contrat.mesReajuste3, contrat.percReajuste3, contrat.tipoAss, contrat.status,
        contrat.resumo, contrat.lgpd, contrat.limiteResponsabilidade, 
        contrat.valor, contrat.descricaoPec, contrat.updatedJuridico, contrat.valorComparar, 
        contrat.idReajusteComparar1, contrat.reajusteComparar1, contrat.mesReajusteComparar1, contrat.percReajusteComparar1,
        contrat.idReajusteComparar2, contrat.reajusteComparar2, contrat.mesReajusteComparar2,  contrat.percReajusteComparar2,
        contrat.idReajusteComparar3, contrat.reajusteComparar3, contrat.mesReajusteComparar3, contrat.percReajusteComparar3, 
        contrat.dataInicioComparar, contrat.dataFimComparar, cr.diretorExecCr 
      FROM CONTRATO AS contrat
        LEFT JOIN CR_CONTRATO AS cr ON cr.numContratoId = contrat.id
        LEFT JOIN CR_CONTRATO AS cr2  ON cr2.numContratoId = contrat.id
        WHERE contrat.deleted = 0 
        ${acesso}
        AND cr.descricaoCr LIKE '%${cr}%'
        AND cr.diretorExecCr LIKE '%${diretorExec}%'
        AND cr.diretorCr LIKE '%${diretorCr}%'
        AND cr.gerenteCr LIKE '%${gerente}%'
        AND cr.gerenteRegCr LIKE '%${gerenteReg}%'
        AND cr.supervisorCr LIKE '%${supervisor}%'
        AND cr.regionalCr LIKE '%${regional}%'
        AND contrat.pec LIKE '%${pec}%'
        AND contrat.grupoCliente LIKE '%${grupoCliente}%'
        AND contrat.dataInicio LIKE '%${dataInicioFormato}%'
        AND contrat.dataFim LIKE '%${dataFimFormato}%'
        AND contrat.mesReajuste1 LIKE '%${mesReajuste}%'
        AND contrat.mesReajuste2 LIKE '%${mesReajuste}%'
        AND contrat.mesReajuste3 LIKE '%${mesReajuste}%'
        AND contrat.empresa LIKE '%${empresa}%'
        AND contrat.retencaoContrato LIKE '%${retencaoContrato}%'
        AND contrat.negocio LIKE '%${negocio}%'
        AND contrat.status LIKE '%${status}%'
        AND contrat.tipoAss LIKE '%${tipoAss}%'
        ORDER BY contrat.id DESC LIMIT 20 OFFSET ${skipPage}`)
        .then((values: any) => {
          return values.map((value: any) => {
            return {
              ...value,
              dataFim: value.dataFim.substring(6, 8) + '/' + value.dataFim.substring(4, 6) + '/' + value.dataFim.substring(0, 4) == '//' ? '' :
                value.dataFim.substring(6, 8) + '/' + value.dataFim.substring(4, 6) + '/' + value.dataFim.substring(0, 4),
              dataInicio: value.dataInicio.substring(6, 8) + '/' + value.dataInicio.substring(4, 6) + '/' + value.dataInicio.substring(0, 4) == '//' ? '' :
                value.dataFim.substring(6, 8) + '/' + value.dataFim.substring(4, 6) + '/' + value.dataFim.substring(0, 4),
              dataInicioComparar: value.dataInicioComparar.split('-').reverse().join('/'),
              dataFimComparar: value.dataFimComparar.split('-').reverse().join('/'),
            }
          });
        });

      ret.forEach(addAction);

      function addAction(element) {
        if (privilegio == "CORD") {
          element.acoes = ['visualizar', 'alterar', 'baixar'];
          aRet.push(element);
        } else {
          element.acoes = ['visualizar', 'baixar'];
          aRet.push(element);
        }
      }

      return aRet;

    } catch (error) {
      throw new HttpException('Parâmetro inválido, Contate o suporte.', HttpStatus.BAD_REQUEST);
    }
  }


  async findUnique(idContrato: number): Promise<Contrato> {
    const result = await this.prisma.contrato.findUnique({
      where: {
        id: idContrato
      },
      include: {
        fileData: true
      }
    });

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(contratoId: number, data: UpdateContratoDto | any): Promise<Contrato> {

    let resultReajuste1: any;
    let resultReajuste2: any;
    let resultReajuste3: any;

    if (data.length == 1) {


      try {
        const ret = await this.prisma.contrato.update({
          where: {
            id: contratoId
          },
          data: data[0]
        });

        return ret;
      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato.', HttpStatus.INTERNAL_SERVER_ERROR);
      }

    } else {
      try {
        if (typeof data.idReajusteComparar1 == 'number') {
            resultReajuste1 = await this.prisma.reajuste.findUnique({
              select: {
                id:true,
                name: true
              },
              where: {
                id: Number(data.idReajusteComparar1)
              }
            });
        }

        if (typeof data.idReajusteComparar2 == 'number') {
            resultReajuste2 = await this.prisma.reajuste.findUnique({
              select: {
                id: true,
                name: true
              },
              where: {
                id: Number(data.idReajusteComparar2)
              }
            });
        }

        if (typeof data.idReajusteComparar3 == 'number') {
            resultReajuste3 = await this.prisma.reajuste.findUnique({
              select: {
                id: true,
                name: true
              },
              where: {
                id: Number(data.idReajusteComparar3)
              }
            });
        }
      }catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato.', HttpStatus.INTERNAL_SERVER_ERROR);
    }


      try {
        const ret = await this.prisma.contrato.update({
          where: {
            id: contratoId
          },
          data: {
            dataFimComparar: data.dataFimComparar,
            dataInicioComparar: data.dataInicioComparar,
            docSolid: data.docSolid,
            faturamento: data.faturamento,
            lgpd: data.lgpd,
            limiteResponsabilidade: data.limiteResponsabilidade,
            natureza: data.natureza,
            idReajusteComparar1: resultReajuste1 == null ? 0 : resultReajuste1.id,
            idReajusteComparar2: resultReajuste2 == null ? 0 : resultReajuste2.id,
            idReajusteComparar3: resultReajuste3 == null ? 0 : resultReajuste3.id,
            reajusteComparar1: resultReajuste1 == null ? '' : resultReajuste1.name,
            reajusteComparar2: resultReajuste2 == null ? '' : resultReajuste2.name,
            reajusteComparar3: resultReajuste3 == null ? '' : resultReajuste3.name,
            mesReajusteComparar1: data.mesReajusteComparar1,
            mesReajusteComparar2: data.mesReajusteComparar2,
            mesReajusteComparar3: data.mesReajusteComparar3,
            percReajusteComparar1: data.percReajusteComparar1,
            percReajusteComparar2: data.percReajusteComparar2,
            percReajusteComparar3: data.percReajusteComparar3,
            resumo: data.resumo,
            retencaoContrato: data.retencaoContrato,
            seguros: data.seguros,
            status: data.status,
            tipoAss: data.tipoAss,
            updatedJuridico: data.updatedJuridico,
            valorComparar: data.valorComparar,
          },
        });

        return ret;
      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

