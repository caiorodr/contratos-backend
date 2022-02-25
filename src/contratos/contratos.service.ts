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

  async create(data: CreateContratoDto): Promise<Contrato> {
    return this.prisma.contrato.create({ data });
  }

  async findAll(page: string, cr: string, grupoCliente: string, diretor: string, gerente: string, supervisor: string, dataInicio: string, dataFim:string, dataReajuste:string, empresa:string, chamado:string, retencaoContrato:string, negocio:string, valor: Decimal): Promise<any> {
    const valorCr               = cr;
    const valorGrupoCliente     = grupoCliente;
    const valorDiretor          = diretor;
    const valorGerente          = gerente;
    const valorSupervisor       = supervisor;
    const valorDataInicio       = dataInicio;
    const valorDataFim          = dataFim;
    const valorDataReajuste     = dataReajuste;
    const valorEmpresa          = empresa;
    const valorChamado          = chamado;
    const valorRetencaoContrato = retencaoContrato;
    const valorNegocio          = negocio;
    const valorValor            = valor;
    const aRet      : any       = [];
    let skipPage                = 0;
    
    if (!(parseInt(page) === 0)) {
      skipPage = (parseInt(page) * 11);
    }

    try {
      const ret = await this.prisma.$queryRaw<any>`
      select  * from Contrato 
      where D_E_L_E_T_  = ''
      AND cr LIKE ${'%' + valorCr + '%'}
      AND grupoCliente LIKE ${'%' + valorGrupoCliente + '%'} 
      AND diretor LIKE ${'%' + valorDiretor + '%'}
      AND gerente LIKE ${'%' + valorGerente + '%'}
      AND supervisor LIKE ${'%' + valorSupervisor + '%'} 
      AND dataInicio LIKE ${'%' + valorDataInicio + '%'}
      AND dataFim LIKE ${'%' + valorDataFim + '%'}
      AND dataReajuste LIKE ${'%' + valorDataReajuste + '%'}
      AND empresa LIKE ${'%' + valorEmpresa + '%'}
      AND chamado LIKE ${'%' + valorChamado + '%'}
      AND retencaoContrato LIKE ${'%' + valorRetencaoContrato + '%'}
      AND negocio LIKE ${'%' + valorNegocio + '%'}
      AND CAST(valor AS VARCHAR (64)) LIKE ${'%' + valorValor + '%'}
      ORDER BY id DESC LIMIT 11 OFFSET ${skipPage}`
      .then((values: any) => {
        return values.map((value: any) => {
          return {
            ...value,
            dataFim : value.dataFim.split('-').reverse().join('/'),
            dataInicio: value.dataInicio.split('-').reverse().join('/'),
            dataReajuste: value.dataReajuste.split('-').reverse().join('/'),
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
      const result = await this.prisma.$queryRaw<Contrato>`SELECT documento FROM Contrato ORDER BY id DESC LIMI 1`;
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