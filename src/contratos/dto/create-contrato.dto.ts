// eslint-disable-next-line prettier/prettier
import { Prisma } from '@prisma/client';

export class CreateContratoDto implements Prisma.ContratoCreateInput {
  dataInicio: string;
  dataFim: string;
  documento: string;
  natureza: string;
  pec: string;
  grupoCliente: string;
  empresa: string;
  negocio: string;
  docSolid: string;
  retencaoContrato: string;
  faturamento: string;
  seguros: string;
  reajuste: string;
  mesReajuste: string;
  tipoAss: string;
  status: string;
  chamado: string;
  resumo?: string;
  lgpd: boolean;
  limiteResponsabilidade: boolean;
  valor: string | number | Prisma.Decimal;
  D_E_L_E_T_?: string;
  aditivos?: Prisma.AditivoCreateNestedManyWithoutDocumentoInput;
  fileData?: Prisma.ContractFileDataCreateNestedManyWithoutContratoInput;
  crContrato?: Prisma.CrContratoCreateNestedManyWithoutNumContratoInput;
}