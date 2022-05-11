import { Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Req, Res, ServiceUnavailableException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ContractFileData } from "@prisma/client";
import { Response, Request } from 'express';
import { StorageFile } from "src/storage/storage-file";
import { StorageService } from "src/storage/storage.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { UpdateFileDto } from "./dto/update-file.dto";
import { MediaService } from "./media.service";

@Controller('media')
export class MediaController {
  constructor(
    private storageService: StorageService,
    private mediaService: MediaService
  ) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
    })
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File, @Req() req: Request, @Res() res: Response,
  ) {

    const fileName = req.body.data.substring(1, req.body.data.length - 1)
    await this.storageService.save(
      fileName,
      file.buffer,
    );

    res.status(HttpStatus.CREATED).json(fileName);
  }


  @Post('file')
  findUniqueFile(
    @Query('fileData') fileData: CreateFileDto,
  ) {
    return this.mediaService.findUniqueFile(fileData)
  }

  @Get()
  async downloadMedia(
    @Query('fileName') fileName: string,
    @Query('contentType') contentType: string,
    @Query('originalName') originalName: string,
    @Res() res: Response,
  ) {

    let storageFile: StorageFile;
    let body: Array<any> = []
    try {
      storageFile = await this.storageService.getFile(fileName, contentType, originalName);

      body = [{
        contentType: storageFile.contentType,
        originalname: storageFile.originalname,
        fileName: storageFile.fileName
      }]

    } catch (e) {
      if (e.message.toString().includes('No such object')) {
        throw new NotFoundException('image not found');
      } else {
        throw new ServiceUnavailableException('internal error');
      }
    }

    res.setHeader('Content-Type', storageFile.contentType);
    res.setHeader('Cache-Control', 'max-age=60d');
    res.setHeader('teste', body);
    res.end(storageFile.buffer);
  }

}
