import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {   diskStorage   } from "multer";
import {  editFileName   } from "src/storage/storage-utils";
import {  StorageService } from "src/storage/storage.service";

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
    @Body("mediaId") mediaId: string
  ) {
    file.originalname
    await this.storageService.save(
      file.originalname,
      file.mimetype,
      file.buffer,
      [{ mediaId: file.originalname }]
    );
  }
}