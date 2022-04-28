// eslint-disable-next-line prettier/prettier
import { Prisma } from '@prisma/client';

export class CreateContratoDto implements Prisma.ContratoCreateInput {
  dataInicio: string;
  dataFim: string;
  documento?: string;
  natureza?: string;
  pec: string;
  grupoCliente: string;
  empresa: string;
  negocio?: string;
  docSolid?: string;
  retencaoContrato?: string;
  faturamento?: string;
  seguros?: string;
  reajuste?: string;
  tipoFaturamento?: string;
  mesReajuste: string;
  tipoAss?: string;
  status?: string;
  resumo?: string;
  lgpd?: boolean;
  limiteResponsabilidade?: boolean;
  valor: string | number | Prisma.Decimal;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  D_E_L_E_T_?: string;
  fileData?: Prisma.ContractFileDataCreateNestedManyWithoutContratoInput;
  crContrato?: Prisma.CrContratoCreateNestedManyWithoutNumContratoInput;
}