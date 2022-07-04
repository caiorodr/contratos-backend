// eslint-disable-next-line prettier/prettier
import { Prisma } from '@prisma/client';

export class CreateContratoDto implements Prisma.ContratoCreateInput {
  data_inicio?: string
  data_fim?: string
  natureza?: string | null
  pec?: string
  descricao_pec?: string
  grupo_cliente?: string
  empresa?: string
  negocio?: string
  seguros?: string
  doc_solid?: string
  retencao_contrato?: string
  faturamento?: string
  tipo_faturamento?: string
  reajuste1?: string
  mes_reajuste1?: string
  perc_reajuste1?: Prisma.Decimal | number | string | null
  reajuste2?: string
  mes_reajuste2?: string
  perc_reajuste2?: Prisma.Decimal | number | string | null
  reajuste3?: string
  mes_reajuste3?: string
  perc_reajuste3?: Prisma.Decimal | number | string | null
  tipo_ass?: string
  status?: string
  status_pec?: number | null
  resumo?: string
  lgpd?: boolean
  limite_responsabilidade?: boolean
  valor?: Prisma.Decimal | number | string | null
  created_at?: Date | string
  updated_at?: Date | string
  updated_juridico?: Date | string | null
  valor_comparar?: Prisma.Decimal | number | string | null
  id_reajuste_comparar1?: number
  reajuste_comparar1?: string
  mes_reajuste_comparar1?: string
  perc_reajuste_comparar1?: Prisma.Decimal | number | string | null
  id_reajuste_comparar2?: number
  reajuste_comparar2?: string
  mes_reajuste_comparar2?: string
  perc_reajuste_comparar2?: Prisma.Decimal | number | string | null
  id_reajuste_comparar3?: number
  reajuste_comparar3?: string
  mes_reajuste_comparar3?: string
  perc_reajuste_comparar3?: Prisma.Decimal | number | string | null
  data_inicio_comparar?: string
  data_fim_comparar?: string
  deleted?: boolean
  id_siga?: string
  file_data?: Prisma.Contract_file_dataCreateNestedManyWithoutContratoInput
  cr_contrato?: Prisma.Cr_contratoCreateNestedManyWithoutNum_contratoInput
}