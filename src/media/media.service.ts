import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) { }

  async createFile(data: CreateFileDto) {
    try {
      return await this.prisma.contractFileData.create({
        data
      })

    } catch (error) {
      throw new HttpException('Falha ao tentar alterar o contrato.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async delete(mediaName: string) {
    try {
      return await this.prisma.contractFileData.deleteMany({
        where: {
          mediaName: mediaName
        }
      })
    } catch (error) {
      throw new HttpException('Falha ao deletar os dados do arquivo.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
