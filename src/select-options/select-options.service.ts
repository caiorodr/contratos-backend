/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { tableCr } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SelectOptionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: any, page: any, pageSize: any, cr: any) {
    const numberPage = page == undefined ? 0: page-1;
    const numberPageSize = pageSize == undefined? 0: pageSize;
    const skipPage = numberPage * numberPageSize;
    const filterTeste = filter == undefined? '': filter;
    let validHasNext = true
      const selectOptionRetCr = await this.prisma.$queryRaw<any>`SELECT cr as CR, descricaoCr as Descrição FROM tableCr WHERE cr LIKE ${'%' + filterTeste + '%'}
      OR descricaoCr LIKE ${'%' + filterTeste + '%'} ORDER BY id LIMIT 11 OFFSET ${skipPage}`;
    
    
    if (selectOptionRetCr.length < 11 ){
      validHasNext = false;
    }
    return JSON.stringify({items:selectOptionRetCr, hasNext:validHasNext});
  }



  async findAllCr(cr: any){
    return 
  }
}
