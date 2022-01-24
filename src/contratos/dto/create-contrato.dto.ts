import { Prisma } from '@prisma/client';

export class CreateContratoDto implements Prisma.ContratoCreateInput {
  diretor: string;
  gerente: string;
  supervisor: string;
  cr: string;
  dataInicio: string;
  dataFim: string;
  documento: string;
  natureza: string;
  grupoCliente: string;
  empresa: string;
  negocio: string;
  docSolid: string;
  retencaoContrato: string;
  faturamento: string;
  seguros: string;
  reajuste: string;
  dataReajuste: string;
  tipoAss: string;
  status: string;
  lgpd: boolean;
  limiteResponsabilidade: boolean;
  valor: string | number | Prisma.Decimal;
  docContrato?: string;
  aditivos?: Prisma.AditivoCreateNestedManyWithoutDocumentoInput;
}
