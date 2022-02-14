import { Injectable } from '@nestjs/common';
import { DownloadResponse, Storage } from "@google-cloud/storage";
import StorageConfig from "./storage-config";
import { extname } from 'path';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key,
      },
    });

    this.bucket = StorageConfig.mediaBucket;
  }

  async save(
    fileName: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[]
  ) {
    
    const fileEdit = editFileName(fileName);
    const object = metadata.reduce(
      (obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(fileEdit);
    const stream = file.createWriteStream();
    stream.on("finish", async () => {
      return await file.setMetadata({
        metadata: object,
      });
    });
    stream.end(media); 
  };
};

function editFileName(fileName: string) {
  try {
    const name = fileName.split('.')[0];
    const fileExtName = extname(fileName);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    return `${name}-${randomName}${fileExtName}`
  }catch (error) {
    throw error;
  };
};

