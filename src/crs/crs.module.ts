import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrContratoController } from './crs.controller';
import { CrContratoService } from './crs.service';

@Module({
  controllers: [CrContratoController],
  providers: [CrContratoService, PrismaService]
})
export class CrContratoModule {}
