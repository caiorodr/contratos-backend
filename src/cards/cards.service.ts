import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Contrato } from '@prisma/client';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CardsHomeService {


  constructor(
    private prisma: PrismaService, 
    private httpService: HttpService) {}

  //* Métodos
  async getStatus() {
    
    //*busca o idsiga do usuario logado.
    const buscaIdSiga: any = this.httpService.get(`${process.env.IDSIGA_API}`).pipe(
      map(
        (res) => res.data));
    const idSiga: any = await lastValueFrom(buscaIdSiga);

    //* Busca o acesso de visualização de contratos do usuario logado. 
    const buscaAcesso = this.httpService.get(`${process.env.ACESSO_API + idSiga.idSiga}`)
       .pipe(
          map(
            (res) => res.data));
    let acesso: any = await lastValueFrom(buscaAcesso);

    if (acesso == "TODOS") {
      acesso = ""
    
    }else if (acesso.length > 0) {
      acesso = acesso.split(',').join("','");
      acesso = "AND cr.cr IN ('${" + acesso + "}')"

    }else {
      acesso = "AND cr.cr = '*****'"
    }

    try {
      return await this.prisma.$queryRawUnsafe<Contrato>(`
      SELECT 
      contract.status, COUNT(contract.status) AS "countStatus" 
      FROM CONTRATO contract
        LEFT JOIN CR_CONTRATO AS cr ON cr.numContratoId = contract.id
        WHERE contract.deleted = 0 ${acesso}
      GROUP BY status`);

    } catch (Error) {
      throw new Error
    }
  }
}
