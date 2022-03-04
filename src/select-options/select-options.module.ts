import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SelectOptionsController } from './select-options.controller';
import { SelectOptionsService } from './select-options.service';

@Module({
  controllers: [SelectOptionsController],
  providers: [SelectOptionsService, PrismaService],
})
export class SelectOptionsModule {}
