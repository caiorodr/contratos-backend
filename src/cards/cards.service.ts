import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CardsHomeService {

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService) { }

  //* Métodos
  async getStatus() {

    let statusRevisao: number = 0;
    let statusAtivo: number = 0;
    let statusEncerrado: number = 0;
    let statusAnalise: number = 0;

    //*busca o idsiga do usuario logado.
    const buscaIdSiga: any = this.httpService.get(`${process.env.IDSIGA_API_PORTAL}`).pipe(
      map(
        (res) => res.data));

    const idSiga: any = await lastValueFrom(buscaIdSiga);

    //* Busca o acesso de visualização de contratos do usuario logado. 
    const buscaAcesso = this.httpService.get(`${process.env.ACESSO_API + idSiga}`)
      .pipe(
        map(
          (res) => res.data));

    let acesso: any = await lastValueFrom(buscaAcesso);

    if (acesso == "TODOS") {
      acesso = ""
    } else if (acesso.length > 0) {
      acesso = acesso.split(',').join("','");
      acesso = "WHERE cr.cr IN ('${" + acesso + "}')"
    } else {
      acesso = "WHERE pec = '*****'"
    }

    try {
      const result = await this.prisma.$queryRawUnsafe<any>(`
      SELECT DISTINCT contract.pec, contract.status 
      FROM CONTRATO contract
       INNER JOIN CR_CONTRATO AS cr ON cr.numContratoId = contract.id
       ${acesso}
      GROUP BY contract.pec, contract.status`)

      result.forEach((contrato: any) => {
        if (contrato.status == 'revisao') {
          statusRevisao += 1;
        } else if (contrato.status == 'ativo') {
          statusAtivo += 1;
        } else if (contrato.status == 'encerrado') {
          statusEncerrado += 1;
        } else {
          statusAnalise += 1;
        }
      })

      return { statusRevisao, statusAtivo, statusEncerrado, statusAnalise }
    } catch (Error) {
      throw new Error
    }

  }

}