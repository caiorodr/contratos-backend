import { Module } from '@nestjs/common';
import { ContratosService } from './contracts.service';
import { ContratosController } from './contracts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { CookiesService } from 'src/cookies/cookies.service';

@Module({
  controllers: [ContratosController],
  providers: [ContratosService, PrismaService, CookiesService],
  imports: [HttpModule]
})
export class ContratosModule {}
