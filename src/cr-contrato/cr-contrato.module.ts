import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrContratoController } from './cr-contrato.controller';
import { CrContratoService } from './cr-contrato.service';

@Module({
  controllers: [CrContratoController],
  providers: [CrContratoService, PrismaService]
})
export class CrContratoModule {}
