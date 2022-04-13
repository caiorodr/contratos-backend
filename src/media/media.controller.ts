import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Req, Res, ServiceUnavailableException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response, Request } from 'express';
import { StorageFile } from "src/storage/storage-file";
import { StorageService } from "src/storage/storage.service";

@Controller('media')
export class MediaController {
  constructor(private storageService: StorageService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
    })
  )
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File, @Req() req: Request, @Res() res: Response,
  ) {

    const fileName = req.body.data.substring(1,req.body.data.length -1)
    await this.storageService.save(
      fileName,
      file.mimetype,
      file.buffer,
    );
    
    res.status(HttpStatus.CREATED).json(fileName);
  }

  @Get()
  async downloadMedia(
    @Query('fileName') fileName: string,
    @Query('contentType') contentType: string,
    @Query('originalName') originalName: string,
    @Res() res: Response,
  ) {

    let storageFile: StorageFile;

    try {
      storageFile = await this.storageService.getFile(fileName, contentType, originalName);
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
