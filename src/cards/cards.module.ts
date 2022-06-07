import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardsHomeController } from './cards.controller';
import { CardsHomeService } from './cards.service';


@Module({
  providers: [CardsHomeService, PrismaService],
  controllers: [CardsHomeController],
  imports: [PrismaService]
})
export class CardsHomeModule {
}
