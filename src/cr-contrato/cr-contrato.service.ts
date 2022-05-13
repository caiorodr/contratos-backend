import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CrContratoService {

  constructor(private prisma: PrismaService){}


  async buscaCr(pec: string): Promise<any> {

    try {
      const buscaCrRet = await this.prisma.crContrato.findMany({
        distinct: 'cr',
        where: {
          pecCr: pec,
          AND:{
            deleted: false,
          }
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
