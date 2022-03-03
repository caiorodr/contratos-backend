import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardsHomeController } from './cards-home.controller';
import { CardsHomeService } from './cards-home.service';


@Module({
  providers: [CardsHomeService, PrismaService],
  controllers: [CardsHomeController],
  imports: [PrismaService]
})
export class CardsHomeModule {
  
}
