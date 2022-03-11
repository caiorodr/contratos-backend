import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContratosModule } from './contratos/contratos.module';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './media/media.module';
import { SelectOptionsModule } from './select-options/select-options.module';
import { CrContratoModule } from './cr-contrato/cr-contrato.module';

@Module({
  imports: [ContratosModule, StorageModule, MediaModule, SelectOptionsModule, CrContratoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
