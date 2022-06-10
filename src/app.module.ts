import { CookiesModule } from './cookies/cookies.module';
import { Module } from '@nestjs/common';
import { ContratosModule } from './contracts/contracts.module';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './media/media.module';
import { CrContratoModule } from './crs/crs.module';
import { CardsHomeModule } from './cards/cards.module';
import { JobsModule } from './jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { OptionsModule } from './options/options.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CookiesModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ContratosModule,
    StorageModule,
    MediaModule,
    CrContratoModule,
    CardsHomeModule,
    JobsModule,
    OptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
