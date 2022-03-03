import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CardsHomeService {

  constructor(private prisma: PrismaService) {
    
  }

  //* Métodos

  async getVigentes(vigente: number, vencido: number, elaboracao: number){
    let quantidadeVigente     = vigente;
    let quantidadeVencido     = vencido;
    let quantidadeElaboracao  = elaboracao;

    try{ 
      const ret = await this.prisma.$queryRaw<any>`
      select  * from Contrato 
      where status  = 'vigente'`
      for (let vigentes = 0; vigentes < ret.status.length; vigentes++) {
        if(ret.status === 'vigente'){
          quantidadeVigente += ret.status
          console.log(quantidadeVigente)
        }
      }
      
      return 5
    }catch(Error){
      throw new Error
    }

  }


  async getVencidos(vencido: any){
    try{ 
      return `getVencidos teste, parametro = ${vencido}`
    }catch(Error){
      throw new Error
    }

  }
}
