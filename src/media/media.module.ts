import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageModule } from 'src/storage/storage.module';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  providers: [MediaService, PrismaService],
  imports: [StorageModule],
  controllers: [MediaController]
})
export class MediaModule { }
