import { Prisma } from '@prisma/client';


export class CreateFileDto implements Prisma.ContractFileDataCreateInput {
  originalName: string;
  mediaName: string;
  contentType: string;
  contrato?: Prisma.ContratoCreateNestedOneWithoutFileDataInput;
}