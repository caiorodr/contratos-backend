import { Prisma } from '@prisma/client';


export class CreateCrContratoDto implements Prisma.Cr_contratoUncheckedCreateInput {
  id?: number;
  pec_cr?: string;
  descricao_pec_cr?: string;
  cr?: string;
  descricao_cr?: string;
  regional_cr?: string;
  diretor_cr?: string;
  diretor_exec_cr?: string;
  gerente_reg_cr?: string;
  gerente_cr?: string;
  supervisor_cr?: string;
  valor_cr?: string | number | Prisma.Decimal;
  created_at?: string | Date;
  updated_at?: string | Date;
  deleted?: boolean;
  num_contrato_id: number;

}