// eslint-disable-next-line prettier/prettier
import { Prisma } from '@prisma/client';

export class CreateContratoDto implements Prisma.ContratoCreateInput {
  dataInicio: string;
  dataFim: string;
  natureza?: string;
  pec?: string;
  descricaoPec?: string;
  grupoCliente?: string;
  empresa?: string;
  negocio?: string;
  docSolid?: string;
  retencaoContrato?: string;
  faturamento?: string;
  seguros?: string;
  tipoFaturamento?: string;
  reajuste1?: string;
  mesReajuste1?: string;
  percReajuste1?: string | number | Prisma.Decimal;
  reajuste2?: string;
  mesReajuste2?: string;
  percReajuste2?: string | number | Prisma.Decimal;
  reajuste3?: string;
  mesReajuste3?: string;
  percReajuste3?: string | number | Prisma.Decimal;
  tipoAss?: string;
  status?: string;
  statusPec?: number;
  resumo?: string;
  lgpd?: boolean;
  limiteResponsabilidade?: boolean;
  valor?: string | number | Prisma.Decimal;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  updatedJuridico?: string | Date;
  valorComparar?: string | number | Prisma.Decimal;
  idReajusteComparar1?: number;
  reajusteComparar1?: string;
  mesReajusteComparar1?: string;
  percReajusteComparar1?: string | number | Prisma.Decimal;
  idReajusteComparar2?: number;
  reajusteComparar2?: string;
  mesReajusteComparar2?: string;
  percReajusteComparar2?: string | number | Prisma.Decimal;
  idReajusteComparar3?: number;
  reajusteComparar3?: string;
  mesReajusteComparar3?: string;
  percReajusteComparar3?: string | number | Prisma.Decimal;
  dataInicioComparar?: string;
  dataFimComparar?: string;
  deleted?: boolean;
  idSiga?: string;
  fileData?: Prisma.ContractFileDataCreateNestedManyWithoutContratoInput;
  crContrato?: Prisma.CrContratoCreateNestedManyWithoutNumContratoInput;
  
}