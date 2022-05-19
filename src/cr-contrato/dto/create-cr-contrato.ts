import { Prisma } from '@prisma/client';


export class CreateCrContratoDto implements Prisma.CrContratoUncheckedCreateInput {
  id?: number;
  pecCr?: string;
  descricaoPecCr?: string;
  cr?: string;
  descricaoCr?: string;
  regionalCr?: string;
  diretorCr?: string;
  diretorExecCr?: string;
  gerenteRegCr?: string;
  gerenteCr?: string;
  supervisorCr?: string;
  valorCr?: string | number | Prisma.Decimal;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deleted?: boolean;
  numContratoId: number;
  
}