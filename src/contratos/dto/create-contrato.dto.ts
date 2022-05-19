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
  reajuste2?: string;
  mesReajuste2?: string;
  reajuste3?: string;
  mesReajuste3?: string;
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
  reajusteComparar1?: string;
  mesReajusteComparar1?: string;
  reajusteComparar2?: string;
  mesReajusteComparar2?: string;
  reajusteComparar3?: string;
  mesReajusteComparar3?: string;
  dataInicioComparar?: string;
  dataFimComparar?: string;
  deleted?: boolean;
  fileData?: Prisma.ContractFileDataCreateNestedManyWithoutContratoInput;
  crContrato?: Prisma.CrContratoCreateNestedManyWithoutNumContratoInput;

}