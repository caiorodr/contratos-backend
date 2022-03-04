import { Injectable } from '@nestjs/common';
import { tableCr } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SelectOptionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const selectOptionRetCr = await this.prisma.tableCr
      .findMany()
      .then((values: any) => {
        return values.map((value: any) => {
          return {
            label: value.cr + ' - ' + value.descricaoCr,
            value: value.cr,
            ID: value.id,
          };
        });
      });
    return JSON.stringify(selectOptionRetCr);
  }
}
