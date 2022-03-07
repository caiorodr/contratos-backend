import { Prisma } from '@prisma/client';


export class CreateFileDto implements Prisma.DADO_ARQUIVOCreateInput {
  originalName: string;
  mediaName: string;
  contentType: string;
  contrato?: Prisma.CONTRATOCreateNestedOneWithoutFileDataInput;

}