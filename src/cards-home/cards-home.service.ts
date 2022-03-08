import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CardsHomeService {

  constructor(private prisma: PrismaService) {
    
  }

  //* Métodos

  async getStatus(status: number){

    try{ 
      const qtdStatus = await this.prisma.contrato.groupBy({
        by:['status'],
        _count:{
          status: true
        }
      })
      return qtdStatus
      
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
