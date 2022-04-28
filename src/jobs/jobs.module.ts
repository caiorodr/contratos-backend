import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobContratoService } from './job-contrato.service';


@Module({
  imports: [HttpModule],
  providers: [JobContratoService, PrismaService]
})
export class JobsModule {}
