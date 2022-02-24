import { Prisma } from '@prisma/client';


export class CreateFileDto  implements Prisma.contractFileDataCreateInput {
  originalName: string;
  mediaName: string;
  contentType: string;
  contrato?: Prisma.ContratoCreateNestedOneWithoutFileDataInput;
}