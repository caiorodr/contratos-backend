import { Prisma } from '@prisma/client';


export class CreateFileDto implements Prisma.Contract_file_dataCreateInput {
  original_name: string;
  media_name: string;
  content_type: string;
  size_file: number;
  created_at?: string | Date;
  updated_at?: string | Date;
  contrato?: Prisma.ContratoCreateNestedOneWithoutFile_dataInput;
}