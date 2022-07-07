import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Query, Req, Res, ServiceUnavailableException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response, Request } from 'express';
import { StorageFile } from "src/storage/storage-file";
import { StorageService } from "src/storage/storage.service";
import { CreateFileDto } from "./dto/create-file.dto";
import { MediaService } from "./media.service";

@Controller('api/v1/media/')
export class MediaController {
  constructor(
    private storageService: StorageService,
    private mediaService: MediaService
  ) { }

  @Post('upload/')
  @UseInterceptors(
    FileInterceptor('files', {
    })
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File, @Req() req: Request, @Res() res: Response,
  ) {

    const body = JSON.parse(req.body.data)
    await this.storageService.save(
      body.media_name,
      file.buffer,
    );

    res.status(HttpStatus.CREATED).json(body);
  }


  @Post('file/')
  createFile(
    @Body() fileData: CreateFileDto
  ) {
    return this.mediaService.createFile(fileData)
  }

  @Get('download/')
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

  @Delete('deleteFileContrato/:mediaName')
  async deleteFileContrato(
    @Param('mediaName') mediaName: string) {
    return this.mediaService.delete(mediaName)
  }


  @Delete('deleteFileStorage')
  async deleteFileStorage(
    @Query('fileName') fileName: string) {
    return this.storageService.delete(fileName)
  }

}
