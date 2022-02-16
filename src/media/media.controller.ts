import {Body,Controller,Get,NotFoundException,Param,Post,Res,ServiceUnavailableException,UploadedFile,UseInterceptors} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {   diskStorage   } from "multer";
import { Response } from 'express';
import { StorageFile } from "src/storage/storage-file";
import {  editFileName   } from "src/storage/storage-utils";
import {  StorageService } from "src/storage/storage.service";
import { CreateFileDto } from "src/storage/dto/create-file";

@Controller('media')
export class MediaController {
  constructor(private storageService: StorageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('files',{
    })
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data: any = JSON.stringify({
      orignalName: file.originalname,
      mediaName: 'teste.png',
      contentType: file.mimetype,
      contrato:  3 
    })

    file.originalname
    await this.storageService.save(
      file.originalname,
      file.mimetype,
      file.buffer,
      data
    );
  }

  @Get('/:mediaId')
  async downloadMedia(@Param('mediaId') mediaId: string, @Res() res: Response) {
    let storageFile: StorageFile;
    try {
      storageFile = await this.storageService.getFile(mediaId);
    } catch (e) {
      if (e.message.toString().includes('No such object')) {
        throw new NotFoundException('image not found');
      } else {
        throw new ServiceUnavailableException('internal error');
      }
    }
    res.setHeader('Content-Type', storageFile.contentType);
    res.setHeader('Cache-Control', 'max-age=60d');
    res.end(storageFile.buffer);
  }

}
