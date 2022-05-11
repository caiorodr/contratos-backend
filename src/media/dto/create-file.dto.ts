// eslint-disable-next-line prettier/prettier
import { Prisma } from '@prisma/client';

export class CreateFileDto implements Prisma.ContractFileDataCreateManyInput {
  id?: number;
  contratoId: number;
  originalName: string;
  mediaName: string;
  contentType: string;
  sizeFile: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  contrato?: Prisma.ContratoCreateNestedOneWithoutFileDataInput;
}