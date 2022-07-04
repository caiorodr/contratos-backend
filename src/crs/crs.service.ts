import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CrContratoService {

  constructor(private prisma: PrismaService) { }


  async buscaCr(pec: string): Promise<any> {

    try {
      return await this.prisma.$queryRawUnsafe(`
      SELECT DISTINCT pec_cr as "pecCr", descricao_pec_cr as "descricaoPecCr", cr, descricao_cr AS "descricaoCr", regional_cr AS "regionalCr",
        diretor_exec_cr AS "diretorExecCr", diretor_cr AS "diretorCr", gerente_reg_cr AS "gerenteRegCr",
        gerente_cr AS "gerenteCr", supervisor_cr AS "supervisorCr", valor_cr AS "valorCr", deleted 
      FROM "CR_CONTRATO"
        WHERE deleted = false AND
        pec_cr = '${pec}' 
        `)
    } catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}
