/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Contrato, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';


@Injectable()
export class ContratosService {

  constructor(private prisma: PrismaService) { }

  async findAll(page: string, cr: string, pec: string, grupoCliente: string, diretorExec: string , diretorCr: string, gerente: string, gerenteReg: string, supervisor: string, dataInicio: string, dataFim:string, mesReajuste:string, empresa:string, retencaoContrato:string, negocio:string, regional: string, valor: Decimal, status: string , tipoAss: string): Promise<any> {
    const dataInicioFormato = dataInicio ? dataInicio.substring(6, 10) + dataInicio.substring(3, 5) + dataInicio.substring(0, 2) : ''; //? aaaammdd
    const dataFimFormato = dataFim ? dataFim.substring(6, 10) + dataFim.substring(3, 5) + dataFim.substring(0, 2) : ''; //? aaaammdd
    const aRet: any = [];
    let crInnerJoin = ``
    let skipPage = 0;

    if (!(parseInt(page) === 0)) {
      skipPage = (parseInt(page) * 11);
    }

    if (cr.length > 0) {
      crInnerJoin = `AND cr.descricaoCr   LIKE ${"'%" + cr + "%'"}`
    }

    try {
      const ret = await this.prisma.$queryRawUnsafe<any>(`
      SELECT DISTINCT contrat.id, contrat.dataInicio, contrat.dataFim,
      contrat.natureza, contrat.grupoCliente, contrat.empresa,
      contrat.negocio, contrat.docSolid, contrat.retencaoContrato, contrat.faturamento,
      contrat.seguros, contrat.reajuste1, contrat.mesReajuste1, contrat.reajuste2, contrat.mesReajuste2,
      contrat.reajuste3, contrat.mesReajuste3, contrat.tipoAss, contrat.status,
      contrat.resumo, contrat.lgpd, contrat.limiteResponsabilidade, 
      contrat.valor, contrat.descricaoPec, contrat.updatedJuridico, contrat.valorComparar, 
      contrat.reajusteComparar1, contrat.mesReajusteComparar1,
      contrat.reajusteComparar2, contrat.mesReajusteComparar2,
      contrat.reajusteComparar3, contrat.mesReajusteComparar3, contrat.dataInicioComparar, 
      contrat.dataFimComparar, cr.diretorExecCr 
      FROM CONTRATO AS contrat
      LEFT JOIN CR_CONTRATO AS cr 
      ON cr.numContratoId = contrat.id
      WHERE contrat.deleted = 0 ${crInnerJoin}
      AND cr.diretorExecCr LIKE '%${ diretorExec }%'
      AND cr.diretorCr LIKE '%${ diretorCr }%'
      AND cr.gerenteCr LIKE '%${ gerente }%'
      AND cr.gerenteRegCr LIKE '%${ gerenteReg }%'
      AND cr.supervisorCr LIKE '%${ supervisor }%'
      AND cr.regionalCr LIKE '%${ regional }%'
      AND contrat.pec LIKE '%${ pec }%'
      AND contrat.grupoCliente LIKE '%${ grupoCliente }%'
      AND contrat.dataInicio LIKE '%${ dataInicioFormato }%'
      AND contrat.dataFim LIKE '%${ dataFimFormato }%'
      AND contrat.mesReajuste1 LIKE '%${ mesReajuste }%'
      AND contrat.mesReajuste2 LIKE '%${ mesReajuste }%'
      AND contrat.mesReajuste3 LIKE '%${ mesReajuste }%'
      AND contrat.empresa LIKE '%${ empresa }%'
      AND contrat.retencaoContrato LIKE '%${ retencaoContrato }%'
      AND contrat.negocio LIKE '%${ negocio }%'
      AND contrat.status LIKE '%${ status }%'
      AND contrat.tipoAss LIKE '%${ tipoAss }%'
      ORDER BY contrat.id DESC LIMIT 20 OFFSET ${skipPage}`)
        .then((values: any) => {
          return values.map((value: any) => {
            return {
              ...value,
              dataFim: value.dataFim.substring(6, 8) + '/' + value.dataFim.substring(4, 6) + '/' + value.dataFim.substring(0, 4),
              dataInicio: value.dataInicio.substring(6, 8) + '/' + value.dataInicio.substring(4, 6) + '/' + value.dataInicio.substring(0, 4),
              dataInicioComparar: value.dataInicioComparar.split('-').reverse().join('/'),
              dataFimComparar: value.dataFimComparar.split('-').reverse().join('/'),
            }
          });
        });

      ret.forEach(addAction);

      function addAction(element, index, array) {
        element.acoes = ['visualizar', 'alterar', 'baixar', 'aditivo',];
        aRet.push(element);
      }

      return aRet;

    } catch (error) {
      throw new HttpException('Parâmetro invalido.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUnique(idContrato: number): Promise<Contrato> {
    return this.prisma.contrato.findUnique({
      where: {
        id: idContrato
      },
      include: {
        fileData: true
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(contratoId: number, data: UpdateContratoDto): Promise<Contrato> {

    try {
      const ret = await this.prisma.contrato.update({
        where: {
          id: contratoId
        },
        data,
      })

      return ret
    } catch (error) {
      throw new HttpException('Falha ao tentar alterar o contrato.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  async remove(id: number): Promise<Contrato> {
    return this.prisma.contrato.delete({
      where: {
        id,
      },
    });
  }
}

