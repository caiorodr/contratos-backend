import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TipoAss, TipoFaturamento, Reajuste, DocSolidaria, RetencContratual, Seguros, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OptionsService {
    constructor(private prisma: PrismaService){}

    async findSeguros(filter: string, value: string){
        let validRetSeguros: any;
        let validValue = value == undefined ? '' : value;
        let validFilter = filter == undefined ? '' : filter;

        try{
            if (validValue == '' && (validFilter.length > 0 || validFilter == '')){
            validRetSeguros = await this.prisma.$queryRawUnsafe<Seguros>
                (`SELECT name AS value, name AS label FROM SEGUROS
                WHERE name LIKE '%${validFilter}%'`)
            }else {
            validValue = validValue.split(",").join("','");
            validRetSeguros = await this.prisma.$queryRawUnsafe<Seguros>
                (`SELECT name AS value, name AS label FROM SEGUROS
                WHERE name IN ('${validValue}')`)
            }

            return  {items: validRetSeguros};
         }catch (error) {
            throw new HttpException(
              `${error}`,
              HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }

    async findDocSolidaria(filter: string, value: string){

        let validRetDocSolidaria: any;
        let validValue = value == undefined ? '' : value;
        let validFilter = filter == undefined ? '' : filter;

        try{
            if (validValue == '' && (validFilter.length > 0 || validFilter == '')){
            validRetDocSolidaria = await this.prisma.$queryRawUnsafe<DocSolidaria>
                (`SELECT name AS value, name AS label FROM DOC_SOLIDARIA
                WHERE name LIKE '%${validFilter}%'
                ORDER BY name`);

            }else if (validFilter == '' && validValue.length > 0){
            validValue = validValue.split(",").join("','");
            validRetDocSolidaria = await this.prisma.$queryRawUnsafe<DocSolidaria>
                (`SELECT name AS value, name AS label FROM DOC_SOLIDARIA
                WHERE name IN ('${validValue}')
                ORDER BY name`);
            }

            return  {items: validRetDocSolidaria};
        }catch (error) {
            throw new HttpException(
              `${error}`,
              HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }

    async findReajuste(page: string, filter: string, value: string){

        const filterReajuste = filter == (null || undefined) ? "": filter;
        const valueReajuste = value == (null || undefined) ? "" : value;
        let retReajuste !: any 
        let pageReajuste = 0;
        let validPage = page == (undefined || null) ? "0": page;

        if (!(parseInt(validPage) == 0)) {
            pageReajuste = (parseInt(validPage) * 11);
          }


        if (valueReajuste.length > 0 ){
            retReajuste = await this.prisma.reajuste.findMany({
                select:{
                    name: true
                }, where:{
                    name: valueReajuste
                }
            });
            }else {
                retReajuste = await this.prisma.$queryRawUnsafe<Reajuste>(`
                SELECT name AS id, name AS name FROM REAJUSTE 
                WHERE name LIKE '%${filterReajuste}%'
                LIMIT 20 OFFSET ${pageReajuste}
                `)
            }
        return  {items: retReajuste, "hasNext":true} 
    }

    async findRetencContratual(){
        const retRetenc = await this.prisma.$queryRaw<RetencContratual>`
        SELECT name AS value, name AS label FROM RETENC_CONTRATUAL
        ORDER BY name`
        
        return  {items: retRetenc} 
    }

    async findTipoAss(){
        const retTipoAss = await this.prisma.$queryRaw<TipoAss>`
        SELECT name AS value, name AS label FROM TIPO_ASS
        ORDER BY name`
        
        return  {items: retTipoAss} 
    }

    async findTipoFaturamento(){
        const retTipoFat = await this.prisma.$queryRaw<TipoFaturamento>`
        SELECT name AS value, name AS label FROM TIPO_FATURAMENTO
        ORDER BY name`
        
        return  {items: retTipoFat} 
    }

}
