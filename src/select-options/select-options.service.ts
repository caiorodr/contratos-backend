/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CentroCusto } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SelectOptionsService {
  constructor(private prisma: PrismaService) { }

  async findAll(filter: any, page: any, pageSize: any, cr: any) {

    let validHasNext: boolean = true
    let resultCr: Array<any> = []
    let selectOptionRetCr: Array<any> = []

    const numberPage = page == undefined ? 0 : page - 1;
    const numberPageSize = pageSize == undefined ? 0 : pageSize;
    const skipPage = numberPage * numberPageSize;
    const filterTeste = filter == undefined ? '' : filter;
    const numCr = cr == undefined ? '' : cr.split(',')

    if (numCr.length > 0) {
      numCr.forEach(element => {
        resultCr.push(element.trim())
      });

      selectOptionRetCr = await this.prisma.$queryRaw<any>
      `SELECT cr as CR, descricaoCr as Descrição, descricaoPecCr as PEC, regionalCr as Regional,
      supervisorCr as Supervisor, gerenteCr as Gerente, gerenteRegCr as 'Gerente Regional',
      diretorCr as 'Diretor Regional', diretorExecCr as 'Diretor Executivo'
      FROM CENTRO_CUSTO 
        WHERE cr IN (${Prisma.join(resultCr)})`
    } else {
      selectOptionRetCr = await this.prisma.$queryRaw<any>
      `SELECT cr as CR, descricaoCr as Descrição, descricaoPecCr as PEC, regionalCr as Regional,
      supervisorCr as Supervisor, gerenteCr as Gerente, gerenteRegCr as 'Gerente Regional',
      diretorCr as 'Diretor Regional', diretorExecCr as 'Diretor Executivo'
      FROM CENTRO_CUSTO 
        WHERE cr LIKE ${'%' + filterTeste + '%'}
        OR descricaoCr LIKE ${'%' + filterTeste + '%'} ORDER BY id LIMIT 11 OFFSET ${skipPage}`;
    }

    if (selectOptionRetCr.length < 11) {
      validHasNext = false;
    }
    return JSON.stringify({ items: selectOptionRetCr, hasNext: validHasNext });
  }


}
