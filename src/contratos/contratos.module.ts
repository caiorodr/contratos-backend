import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ContratosController],
  providers: [ContratosService, PrismaService],
  imports: [HttpModule]
})
export class ContratosModule {}
