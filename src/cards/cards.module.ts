import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CardsHomeController } from './cards.controller';
import { CardsHomeService } from './cards.service';
import { HttpModule } from '@nestjs/axios';
import { CookiesService } from 'src/cookies/cookies.service';

@Module({
  providers: [CardsHomeService, PrismaService, CookiesService],
  controllers: [CardsHomeController],
  imports: [PrismaService, HttpModule]
})
export class CardsHomeModule {
}
