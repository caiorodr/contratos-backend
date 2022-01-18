import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContratosModule } from './contratos/contratos.module';

@Module({
  imports: [ContratosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
