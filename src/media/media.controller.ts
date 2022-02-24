import { Body, Controller, Get, NotFoundException, Param, Post, Query, Req, Res, ServiceUnavailableException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Response, Request } from 'express';
import { StorageFile } from "src/storage/storage-file";
import { editFileName } from "src/storage/storage-utils";
import { StorageService } from "src/storage/storage.service";
import { CreateFileDto } from "src/storage/dto/create-file";

@Controller('media')
export class MediaController {
  constructor(private storageService: StorageService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
    })
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File, @Req() req: Request
  ) {

    const numContrato = Number(req.body.data)
    await this.storageService.save(
      file.originalname,
      file.mimetype,
      file.buffer,
      numContrato
    );
  }

  @Get()
  async downloadMedia(
    @Query('fileName') fileName: string, 
    @Query('contentType') contentType: string, 
    @Query('originalName') originalName: string, 
    @Res() res: Response) {
    let storageFile: StorageFile;

    try {
      storageFile = await this.storageService.getFile(fileName,contentType,originalName);
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
