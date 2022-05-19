import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContratosModule } from './contratos/contratos.module';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './media/media.module';
import { CrContratoModule } from './cr-contrato/cr-contrato.module';
import { CardsHomeModule } from './cards-home/cards-home.module';
import { JobsModule } from './jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OptionsModule } from './options/options.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ContratosModule, 
    StorageModule, 
    MediaModule, 
    CrContratoModule, 
    CardsHomeModule, 
    JobsModule, OptionsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
