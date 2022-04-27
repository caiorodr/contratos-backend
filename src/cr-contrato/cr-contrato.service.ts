import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrContrato, Prisma } from '@prisma/client';
import { CreateCrContratoDto } from './dto/create-cr-contrato';

@Injectable()
export class CrContratoService {

  constructor(private prisma: PrismaService){}
  
  async findAllCr(cr: string): Promise<CreateCrContratoDto>{
    const ret = await this.prisma.centroCusto.findUnique({
      where:{ 
        cr:cr
      },
    })
    return ret
  }

  async buscaCr(pec: string): Promise<any> {

    try {
      const buscaCrRet = await this.prisma.crContrato.findMany({
        distinct: 'cr',
        where: {
          pecCr: pec
        }
      });
  
      return buscaCrRet;
    } catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}
