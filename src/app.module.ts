import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContratosModule } from './contratos/contratos.module';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './media/media.module';
import { CardsHomeController } from './cards-home/cards-home.controller';
import { CardsHomeService } from './cards-home/cards-home.service';
import { CardsHomeModule } from './cards-home/cards-home.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ContratosModule, StorageModule, MediaModule, CardsHomeModule, PrismaService],
  controllers: [AppController, CardsHomeController],
  providers: [AppService, CardsHomeService, PrismaService],
})
export class AppModule {}
