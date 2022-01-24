/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Contrato, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Injectable()
export class ContratosService {

  constructor(private prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: CreateContratoDto) {
    return this.prisma.contrato.create({ data });
  }

  async findAll() {
    return this.prisma.contrato.findMany({});
  }

  // Pega o ultimo numero do documento Desc Contrato.
  async findDesc() {
    
    try { 
      const result = await this.prisma.$queryRaw<Contrato>`SELECT documento FROM Contrato ORDER BY id DESC LIMI 1` ;
    return result;

    } catch (error) {
      throw error;
    }
  }


  async findFilter(fil: string, find: string) { //cr, grupoCliente, 
    
    const filter = fil
    const search = find
    let result = ''

    
    if (filter == "cr") {
      
      try { 
        const ret = await this.prisma.$queryRaw<any>`select  * from Contrato where D_E_L_E_T_  = '' AND cr LIKE ${'%' + search + '%'} `
        return ret;
  
      } catch (error) {
        throw error;
      }

    }else if (filter == "grupoCliente"){

      try { 
        const ret = await this.prisma.$queryRaw<any>`select  * from Contrato where D_E_L_E_T_  = '' AND grupoCliente LIKE ${'%' + search + '%'} `
        return ret;
  
      } catch (error) {
        throw error;
      }

    }else if (filter == "diretor"){

      try { 
        const ret = await this.prisma.$queryRaw<any>`select  * from Contrato where D_E_L_E_T_  = '' AND diretor LIKE ${'%' + search + '%'} `
        return ret;
  
      } catch (error) {
        throw error;
      }

    }else if (filter == "gerente"){

      try { 
        const ret = await this.prisma.$queryRaw<any>`select  * from Contrato where D_E_L_E_T_  = '' AND gerente LIKE ${'%' + search + '%'} `
        return ret;
  
      } catch (error) {
        throw error;
      }

    }else{
      throw new HttpException('Parâmetro invalido.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
     
  }

  async findOne(documento: string) {
    return this.prisma.contrato.findUnique({
      where: {
        documento,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, data: UpdateContratoDto) {
    return this.prisma.contrato.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.contrato.delete({
      where: {
        id,
      },
    });
  }
}
