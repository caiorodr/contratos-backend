export class StorageFile {
  buffer: Buffer;
  metadata: Map<string, string>;
  contentType: string;
  originalname: string;
  fileName: string
}