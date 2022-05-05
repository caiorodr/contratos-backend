import { Injectable } from '@nestjs/common';
import { Seguros ,Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OptionsService {
    constructor(private prisma: PrismaService){}

    async findSeguros(){
        const ret = await this.prisma.seguros.findMany()
        return ret
    } 
}
