import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ContratosController],
  providers: [ContratosService, PrismaService],
})
export class ContratosModule {}
