import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Injectable()
export class ContratosService {
  constructor(private prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(data: CreateContratoDto) {
    return this.prisma.contrato.create({ data });
  }

  findAll() {
    return this.prisma.contrato.findMany({});
  }

  findOne(documento: string) {
    return this.prisma.contrato.findUnique({
      where: {
        documento,
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, data: UpdateContratoDto) {
    return this.prisma.contrato.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.contrato.delete({
      where: {
        id,
      },
    });
  }
}
