import { Prisma } from '@prisma/client';


export class CreateCrContratoDto implements Prisma.CrContratoCreateInput {
  pecCr?: string | null
  descricaoPecCr?: string | null
  cr?: string | null
  descricaoCr?: string | null
  regionalCr?: string | null
  diretorCr?: string | null
  diretorExecCr?: string | null
  gerenteRegCr?: string | null
  gerenteCr?: string | null
  supervisorCr?: string | null
}