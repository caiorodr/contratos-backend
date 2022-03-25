/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CentroCusto } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SelectOptionsService {
  constructor(private prisma: PrismaService) { }

  async findPec(filter: any, page: any, pageSize: any) {
  
    let selectOptionRetPec: Array<any> = [];
    
    let retHasNext = true;
    const numberPage = page == undefined ? 0 : page - 1;
    const numberPageSize = pageSize == undefined ? 0 : pageSize;
    const skipPagePec = numberPage * numberPageSize;
    const filterPecLookup = filter == undefined ? '' : filter;

    try {
      if (filterPecLookup.length > 0 ) {

        selectOptionRetPec = await this.prisma.$queryRawUnsafe<any>(
        `SELECT DISTINCT (descricaoPecCr) as PEC 
          FROM CENTRO_CUSTO 
          WHERE descricaoPecCr LIKE '%${filterPecLookup}%'`)
      } else {
        selectOptionRetPec = await this.prisma.$queryRawUnsafe<any>(
          `SELECT DISTINCT (descricaoPecCr) as PEC 
            FROM CENTRO_CUSTO 
            ORDER BY descricaoPecCr LIMIT 11 OFFSET ${skipPagePec}`);
      }
      

      if (selectOptionRetPec.length < 11 ) {
        retHasNext = false;
      }

      return JSON.stringify({ items: selectOptionRetPec, hasNext: retHasNext });

    } catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findCr(pec: any){
    const valorCr = pec == undefined? '' : pec.substring(1,6);
    try {
      const selectOptionRetCr = await this.prisma.$queryRawUnsafe<any>(`
      SELECT  cr as valor, CONCAT (cr, ' - ',descricaoCr) as rotulo 
        FROM CENTRO_CUSTO 
        WHERE pecCr LIKE '%${valorCr}%'
        ORDER BY cr`)
        
        return JSON.stringify({ items: selectOptionRetCr, hasNext: false });
  
    }catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
      
  }
}
