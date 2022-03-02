import { Prisma } from '@prisma/client';


export class CreateFileDto implements Prisma.contractFileDataCreateInput {
  originalName: string;
  orignalName: string;
  mediaName: string;
  contentType: string;
  contrato?: Prisma.ContratoCreateNestedOneWithoutFileDataInput;
}