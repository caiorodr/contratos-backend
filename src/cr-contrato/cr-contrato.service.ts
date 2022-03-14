import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCrContratoDto } from './dto/create-cr-contrato';

@Injectable()
export class CrContratoService {

  constructor(private prisma: PrismaService){}
  
  async findAllCr(cr: string): Promise<CreateCrContratoDto>{
    const ret = await this.prisma.centroCusto.findUnique({
      where:{ 
        cr:cr
      },
    })
    return ret
  }
}
