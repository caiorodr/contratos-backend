import { Module } from '@nestjs/common';
import { ContratosService } from './contracts.service';
import { ContratosController } from './contracts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ContratosController],
  providers: [ContratosService, PrismaService],
  imports: [HttpModule]
})
export class ContratosModule {}
