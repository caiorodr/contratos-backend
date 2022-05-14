import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrContrato } from '@prisma/client';

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

  async buscaValorGlobal(valorPec: string): Promise<any> {

    try {
      const buscaValorGlobalRet = await this.prisma.$queryRawUnsafe<CrContrato>(`
      SELECT SUM(valorCr) AS valorGlobal FROM CR_CONTRATO
      WHERE pecCr = '${valorPec}'
      `)
  
      return buscaValorGlobalRet;
    } catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
}
