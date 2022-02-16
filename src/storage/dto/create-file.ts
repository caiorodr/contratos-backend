import { Prisma } from '@prisma/client';


export class CreateFileDto  implements Prisma.contractFileDataCreateInput {
  orignalName: string;
  mediaName: string;
  contentType: string;
  contrato?: Prisma.ContratoCreateNestedOneWithoutFileDataInput;
}