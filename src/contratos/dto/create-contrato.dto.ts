import { Prisma } from '@prisma/client';

export class CreateContratoDto implements Prisma.ContratoCreateInput {
  diretor: string;
  gerente: string;
  supervisor: string;
  cr: number;
  dataInicio: string;
  dataFim: string;
  documento: string;
  natureza: string;
  cliente: string;
  empresa: string;
  negocio: string;
  reajuste: string;
  faturamento: string;
  status: string;
  lgpd: boolean;
  valor: string | number | Prisma.Decimal;
  docContrato?: string;
}
