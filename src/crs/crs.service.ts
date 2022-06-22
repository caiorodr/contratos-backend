import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CrContratoService {

  constructor(private prisma: PrismaService) { }


  async buscaCr(pec: string): Promise<any> {

    try {
      return await this.prisma.cr_contrato.findMany({
        distinct: 'cr',
        where: {
          pec_cr: pec,
          AND: {
            deleted: false,
          }
        }
      });

    } catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}
