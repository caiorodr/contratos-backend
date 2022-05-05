import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';

@Module({
  controllers: [OptionsController],
  providers: [OptionsService, PrismaService]
})
export class OptionsModule {}
