/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CentroCusto } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SelectOptionsService {
  constructor(private prisma: PrismaService) { }

  async findAll(filter: any, page: any, pageSize: any, cr: any, pec: string) {
  
    let selectOptionRetCr: Array<any> = [];
    
    const valorPec = pec;
    const numberPage = page == undefined ? 0 : page - 1;
    const numberPageSize = pageSize == undefined ? 0 : pageSize;
    const skipPage = numberPage * numberPageSize;
    const filterCrLookup = filter == undefined ? '' : filter;
    const numCr = cr == undefined ? '' : cr;

    try {
      if (numCr.length > 0 ) {

        selectOptionRetCr = await this.prisma.$queryRaw<any>
        `SELECT TRIM(cr) as CR, TRIM(descricaoCr) as 'Descrição CR', TRIM(diretorExecCr) as 'Diretor Executivo'
        FROM CENTRO_CUSTO 
          WHERE cr = ${numCr}`
      } else {
        selectOptionRetCr = await this.prisma.$queryRawUnsafe<any>(
          `SELECT TRIM(cr) as CR, TRIM(descricaoCr) as 'Descrição CR', TRIM(diretorExecCr) as 'Diretor Executivo'
          FROM CENTRO_CUSTO 
            WHERE pecCr = '${valorPec}' AND (cr = '%${filterCrLookup}%' 
            OR descricaoCr LIKE '%${filterCrLookup}%') ORDER BY cr LIMIT 11 OFFSET ${skipPage}`);
      }
  
      return JSON.stringify({ items: selectOptionRetCr, hasNext: false });

    } catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async buscaPec(filter: any){
    
    let filterCr = filter ==  undefined ? '' : filter; 

    try {
      const buscaPecCr = await this.prisma.$queryRawUnsafe<any>(
      `SELECT pecCr AS valor, descricaoPecCr as rotulo 
      FROM CENTRO_CUSTO
      WHERE descricaoPecCr NOT IN ('','NULL') 
      AND descricaoPecCr LIKE '%${filterCr}%'
      ORDER BY pecCr
      `)
      return JSON.stringify({ items: buscaPecCr, hasNext: false });
    
    }catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findOnePec( pec: string) {
    try {
      const retOnePec = await this.prisma.$queryRawUnsafe<any>(
      `SELECT pecCr AS valor, descricaoPecCr as rotulo 
      FROM CENTRO_CUSTO
      WHERE pecCr = '${pec}'
      ORDER BY pecCr
      `)
      return JSON.stringify({valor: retOnePec[0].rotulo});
    
    }catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findAllPec() {
    try {
      const retAllPec = await this.prisma.pecContrato.findMany();

      return retAllPec;
    }catch (error) {
      throw new HttpException(
        `${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }
  
}
