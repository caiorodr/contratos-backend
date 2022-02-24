/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Contrato, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Injectable()
export class  ContratosService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreateContratoDto): Promise<Contrato> {
    return this.prisma.contrato.create({ data });
  }

  async findAll(page: string, cr: string, grupoCliente: string, diretor: string, gerente: string, supervisor: string): Promise<any> {

    const valorCr           = cr;
    const valorGrupoCliente = grupoCliente;
    const valorDiretor      = diretor;
    const valorGerente      = gerente;
    const valorSupervisor   = supervisor;
    let aRet      : any     = [];
    let skipPage  : number  = 0;
    
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
      ORDER BY id DESC LIMIT 11 OFFSET ${skipPage} `
 
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
      const result = await this.prisma.$queryRaw<Contrato>`SELECT documento FROM Contrato ORDER BY id DESC LIMI 1` ;
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


  async remove(id: number): Promise<Contrato>{
    return this.prisma.contrato.delete({
      where: {
        id,
      },
    });
  }
}
