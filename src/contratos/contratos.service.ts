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

  async create(data: CreateContratoDto, bodyCr: any, bodyData: any): Promise<Contrato> {

    return this.prisma.contrato.create({data:{
      pec:data.pec,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      documento: data.documento,
      natureza: data.natureza,
      grupoCliente: data.grupoCliente,
      empresa: data.empresa,
      docSolid: data.docSolid,
      retencaoContrato: data.retencaoContrato,
      negocio: data.negocio,
      faturamento: data.faturamento,
      seguros: data.seguros,
      reajuste: data.reajuste,
      mesReajuste: data.mesReajuste,
      tipoAss: data.tipoAss,
      resumo: data.resumo,
      status: data.status,
      valor: data.valor,
      lgpd: data.lgpd,
      limiteResponsabilidade: data.limiteResponsabilidade,
      fileData: {createMany:{data:bodyData}},
      crContrato: {createMany:{data:bodyCr}}
    }},)
  }

  async findAll(page: string, cr: string, grupoCliente: string, diretorCr: string, gerente: string, supervisor: string, dataInicio: string, dataFim:string, mesReajuste:string, empresa:string, chamado:string, retencaoContrato:string, negocio:string, status: string, valor: Decimal): Promise<any> {
    const valorCr               = cr;
    const valorGrupoCliente     = grupoCliente;
    const valorDiretor          = diretorCr;
    const valorGerente          = gerente;
    const valorSupervisor       = supervisor;
    const valorDataInicio       = dataInicio;
    const valorDataFim          = dataFim;
    const valorMesReajuste     = mesReajuste;
    const valorEmpresa          = empresa;
    const valorChamado          = chamado;
    const valorRetencaoContrato = retencaoContrato;
    const valorNegocio          = negocio;
    const valorValor            = valor;
    const valorStatus           = status; 
    const aRet      : any       = [];
    let crInnerJoin             = `` 
    let skipPage                = 0;
    

    if (!(parseInt(page) === 0)) {
      skipPage = (parseInt(page) * 11);
    }

    if (valorCr.length > 0) {
      crInnerJoin = `AND cr.cr LIKE ${"'%" + valorCr + "%'"}`
    }

    try {
      const ret = await this.prisma.$queryRawUnsafe<any>(`
      SELECT DISTINCT contrat.id, contrat.dataInicio, contrat.dataFim,
      contrat.documento, contrat.natureza, contrat.grupoCliente, contrat.empresa,
      contrat.negocio, contrat.docSolid, contrat.retencaoContrato, contrat.faturamento,
      contrat.seguros, contrat.reajuste, contrat.mesReajuste, contrat.tipoAss, contrat.status,
      contrat.chamado, contrat.resumo, contrat.lgpd, contrat.limiteResponsabilidade, 
      contrat.valor, cr.descricaoPecCr, cr.diretorExecCr 
      FROM CONTRATO AS contrat
      LEFT JOIN CR_CONTRATO AS cr 
      ON cr.numContratoId = contrat.documento
      WHERE D_E_L_E_T_  = ''
      ${crInnerJoin}
      AND grupoCliente LIKE ${"'%" + valorGrupoCliente + "%'"} 
      AND dataInicio LIKE ${"'%" + valorDataInicio + "%'"}
      AND dataFim LIKE ${"'%" + valorDataFim + "%'"}
      AND mesReajuste LIKE ${"'%" + valorMesReajuste + "%'"}
      AND empresa LIKE ${"'%" + valorEmpresa + "%'"}
      AND chamado LIKE ${"'%" + valorChamado + "%'"}
      AND retencaoContrato LIKE ${"'%" + valorRetencaoContrato + "%'"}
      AND status LIKE ${"'%" + valorStatus + "%'"}
      AND negocio LIKE ${"'%" + valorNegocio + "%'"}
      AND status LIKE ${"'%" + valorStatus + "%'"}
      AND CAST(valor AS CHAR (64)) LIKE ${"'%" + valorValor + "%'"}
      ORDER BY contrat.id DESC LIMIT 11 OFFSET ${skipPage}`)
      .then((values: any) => {
        return values.map((value: any) => {
          return {
            ...value,
            dataFim : value.dataFim.split('-').reverse().join('/'),
            dataInicio: value.dataInicio.split('-').reverse().join('/'),
          }
        })
      })

      function addAction(element, index, array) {
        element.acoes = ['visualizar', 'alterar', 'baixar', 'aditivo',]
        aRet.push(element)
      }

      ret.forEach(addAction);

      return aRet;

    } catch (error) {
      throw new HttpException('Parâmetro invalido.', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  // Pega o ultimo numero do documento Desc Contrato.
  async findDesc(): Promise<Contrato> {

    try {
      const result = await this.prisma.$queryRaw<Contrato>`SELECT documento FROM CONTRATO ORDER BY id DESC LIMI 1`;
      return result;

    } catch (error) {
      throw error;
    }
  }

  async findOne(documento: string): Promise<Contrato> {
    return this.prisma.contrato.findUnique({
      where: {
        documento,
      },
      include: {
        fileData: true
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(documento: string, data: UpdateContratoDto): Promise<Contrato> {

    try {
      const ret = await this.prisma.contrato.update({
        where: { documento },
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

