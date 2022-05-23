import { StorageFile } from "./storage-file";
import { Injectable } from '@nestjs/common';
import { DownloadResponse, Storage } from "@google-cloud/storage";
import StorageConfig from "./storage-config";
import { extname } from 'path';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor(
    private prismaService: PrismaService,
  ) {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key,
      },
    });

    this.bucket = StorageConfig.mediaBucket;
  }

  async getFile(fileName: string, contentType: string, originalname: string): Promise<StorageFile> {

    try {
      const fileResponse: DownloadResponse = await this.storage.bucket(this.bucket).file(fileName).download();
      const [buffer] = fileResponse;
      const storageFile = new StorageFile();
      storageFile.buffer = buffer;
      storageFile.metadata = new Map<string, string>();
      storageFile.contentType = contentType;
      storageFile.originalname = originalname;
      storageFile.fileName = fileName;
      return storageFile;

    } catch (error) {
      throw error;
    }
  }

  async save(
    fileName: string,
    media: Buffer,
  ) {
    try {

      const metadata: { [key: string]: string }[] = [{ mediaName: fileName }]
      const object = metadata.reduce(
        (obj, item) => Object.assign(obj, item), {});
      const file = this.storage.bucket(this.bucket).file(fileName);
      const stream = file.createWriteStream();
      stream.on("finish", async () => {
        return await file.setMetadata({
          metadata: object,
        });
      });
      stream.end(media);
    } catch (error) {
      throw new error
    }
  };

  async delete(path: string) {
    return await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  };
};

