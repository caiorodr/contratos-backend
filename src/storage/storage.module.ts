import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from './storage.service';

@Module({
  providers: [StorageService, PrismaService],
  exports: [StorageService],
})
export class StorageModule {}
