/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Contrato } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';


@Injectable()
export class ContratosService {


  constructor(
    private prisma: PrismaService,
    private httpService: HttpService) 
    { }


  //! API FAKE PARA RETORNO DO IDSIGA DO USUARIO
  async idSiga(){
  /*Gestão de Contratos:
    3646  : Adriana da Silva Siqueira
    18224 : Patrick Rodrigues Costa
    4147  : Geyza Porto Pierini
    13919 : Caio Rodrigues do Nascimento Maroni
    22789 : Rafael Lopes do Nascimento
    22612 : Igor Souza Maroni
  */
    const idSiga = '22612'

    return {idSiga}
  }

  async findAll(page: string, cr: string, pec: string, grupoCliente: string, diretorExec: string, diretorCr: string, gerente: string, gerenteReg: string, supervisor: string, dataInicio: string, dataFim: string, mesReajuste: string, empresa: string, retencaoContrato: string, negocio: string, regional: string, valor: Decimal, status: string, tipoAss: string): Promise<any> {
    const dataInicioFormato = dataInicio ? dataInicio.substring(6, 10) + dataInicio.substring(3, 5) + dataInicio.substring(0, 2) : ''; //? aaaammdd
    const dataFimFormato = dataFim ? dataFim.substring(6, 10) + dataFim.substring(3, 5) + dataFim.substring(0, 2) : ''; //? aaaammdd
    const aRet: any = [];
    let skipPage = 0;

    //*busca o idsiga do usuario logado.
    const buscaIdSiga: any = this.httpService.get(`${process.env.IDSIGA_API}`).pipe(
      map(
        (res) => res.data));
    const idSiga: any = await lastValueFrom(buscaIdSiga);

    //* Busca o privilegio do usuario logado.
    const buscaPrivilegio = this.httpService.get(`${process.env.PRIVILEGIO_API + idSiga.idSiga}/OEP_EC`)
      .pipe(
        map(
          (res) => res.data));
    const privilegio = await lastValueFrom(buscaPrivilegio);

    //* Busca o acesso de visualização de contratos do usuario logado. 
    const buscaAcesso = this.httpService.get(`${process.env.ACESSO_API + idSiga.idSiga}`)
      .pipe(
        map(
          (res) => res.data));
    let acesso = await lastValueFrom(buscaAcesso);
    if (acesso == "TODOS") {

      acesso = ""
    } else if (acesso.length > 0) {

      acesso = acesso.split(',').join("','");
      acesso = "AND cr2.cr IN ('${" + acesso + "}')"
    } else {

      acesso = "AND cr2.cr = ' '"

    }

    if (!(parseInt(page) == 0)) {
      skipPage = (parseInt(page) * 11);
    }

    try {
      const ret = await this.prisma.$queryRawUnsafe<any>(`
      SELECT 
        DISTINCT contrat.id, contrat.dataInicio, contrat.dataFim,
        contrat.natureza, contrat.grupoCliente, contrat.empresa,
        contrat.negocio, contrat.docSolid, contrat.retencaoContrato, contrat.faturamento,
        contrat.seguros, contrat.reajuste1, contrat.mesReajuste1, contrat.percReajuste1,
        contrat.reajuste2, contrat.mesReajuste2, contrat.percReajuste2,
        contrat.reajuste3, contrat.mesReajuste3, contrat.percReajuste3, contrat.tipoAss, contrat.status,
        contrat.resumo, contrat.lgpd, contrat.limiteResponsabilidade, 
        contrat.valor, contrat.descricaoPec, contrat.updatedJuridico, contrat.valorComparar, 
        contrat.idReajusteComparar1, contrat.reajusteComparar1, contrat.mesReajusteComparar1, contrat.percReajusteComparar1,
        contrat.idReajusteComparar2, contrat.reajusteComparar2, contrat.mesReajusteComparar2,  contrat.percReajusteComparar2,
        contrat.idReajusteComparar3, contrat.reajusteComparar3, contrat.mesReajusteComparar3, contrat.percReajusteComparar3, 
        contrat.dataInicioComparar, contrat.dataFimComparar, contrat.idSiga, cr.diretorExecCr
      FROM CONTRATO AS contrat
        LEFT JOIN CR_CONTRATO AS cr ON cr.numContratoId = contrat.id
        LEFT JOIN CR_CONTRATO AS cr2  ON cr2.numContratoId = contrat.id
        WHERE contrat.deleted = 0 
        ${acesso}
        AND cr.descricaoCr LIKE '%${cr}%'
        AND cr.diretorExecCr LIKE '%${diretorExec}%'
        AND cr.diretorCr LIKE '%${diretorCr}%'
        AND cr.gerenteCr LIKE '%${gerente}%'
        AND cr.gerenteRegCr LIKE '%${gerenteReg}%'
        AND cr.supervisorCr LIKE '%${supervisor}%'
        AND cr.regionalCr LIKE '%${regional}%'
        AND contrat.pec LIKE '%${pec}%'
        AND contrat.grupoCliente LIKE '%${grupoCliente}%'
        AND contrat.dataInicio LIKE '%${dataInicioFormato}%'
        AND contrat.dataFim LIKE '%${dataFimFormato}%'
        AND contrat.mesReajuste1 LIKE '%${mesReajuste}%'
        AND contrat.mesReajuste2 LIKE '%${mesReajuste}%'
        AND contrat.mesReajuste3 LIKE '%${mesReajuste}%'
        AND contrat.empresa LIKE '%${empresa}%'
        AND contrat.retencaoContrato LIKE '%${retencaoContrato}%'
        AND contrat.negocio LIKE '%${negocio}%'
        AND contrat.status LIKE '%${status}%'
        AND contrat.tipoAss LIKE '%${tipoAss}%'
        ORDER BY contrat.id DESC LIMIT 20 OFFSET ${skipPage}`)
        .then((values: any) => {
          return values.map((value: any) => {
            return {
              ...value,
              dataFim: value.dataFim.substring(6, 8) + '/' + value.dataFim.substring(4, 6) + '/' + value.dataFim.substring(0, 4) == '//' ? '' :
                value.dataFim.substring(6, 8) + '/' + value.dataFim.substring(4, 6) + '/' + value.dataFim.substring(0, 4),
              dataInicio: value.dataInicio.substring(6, 8) + '/' + value.dataInicio.substring(4, 6) + '/' + value.dataInicio.substring(0, 4) == '//' ? '' :
                value.dataInicio.substring(6, 8) + '/' + value.dataInicio.substring(4, 6) + '/' + value.dataInicio.substring(0, 4),
              dataInicioComparar: value.dataInicioComparar.split('-').reverse().join('/'),
              dataFimComparar: value.dataFimComparar.split('-').reverse().join('/'),
            }
          });
        });

      ret.forEach(addAction);

      function addAction(element) {
        if (privilegio == "CORD") {
          element.acoes = ['visualizar', 'alterar', 'baixar'];
          aRet.push(element);
        } else {
          element.acoes = ['visualizar', 'baixar'];
          aRet.push(element);
        }
      }

      return aRet;

    } catch (error) {
      throw new HttpException('Parâmetro inválido, contate a equipe de desenvolvimento.', HttpStatus.BAD_REQUEST);
    }
  }


  async findUnique(idContrato: number): Promise<Contrato> {
    const result = await this.prisma.contrato.findUnique({
      where: {
        id: idContrato
      },
      include: {
        fileData: true
      }
    });

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(contratoId: number, data: UpdateContratoDto | any): Promise<Contrato> {

    let validResultReajuste1 : any;
    let validResultReajuste2 : any;
    let validResultReajuste3 : any;
    let resultReajuste1 : any = '';
    let resultReajuste2 : any = '';
    let resultReajuste3 : any = '';
    let dataContract    : any;
    let statusAtualizado: any;



    if (data.length == 1) {

      try {
        const ret = await this.prisma.contrato.update({
          where: {
            id: contratoId
          },
          data: data[0]
        });

        return ret;
      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato.', HttpStatus.INTERNAL_SERVER_ERROR);
      }

    } else {
      try {
        if (typeof data.idReajusteComparar1 == 'number' ) {
          validResultReajuste1 = await this.prisma.reajuste.findUnique({
              select: {
                id:true,
                name: true
              },
              where: {
                id: data.idReajusteComparar1
              }
            });
          resultReajuste1 = validResultReajuste1.name == (null || undefined) ? '': validResultReajuste1.name
          
        }

        if (typeof data.idReajusteComparar2 == 'number' && data.idReajusteComparar2 > 0) {
          validResultReajuste2 = await this.prisma.reajuste.findUnique({
              select: {
                id: true,
                name: true
              },
              where: {
                id: data.idReajusteComparar2
              }
            });
          resultReajuste2 = validResultReajuste2.name == (null || undefined) ? '': validResultReajuste2.name
        }

        if (typeof data.idReajusteComparar3 == 'number' && data.idReajusteComparar3 > 0) {
          validResultReajuste3 = await this.prisma.reajuste.findUnique({
              select: {
                id: true,
                name: true
              },
              where: {
                id: data.idReajusteComparar3
              }
            });
          resultReajuste3 = validResultReajuste3.name == (null || undefined) ? '': validResultReajuste3.name
        }
      }catch (error) {
        throw new HttpException('Falha ao buscar o ID e Name na tabela REAJUSTE.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      //* Realizar a busca das informaçõess da tabela contratos e atualizar o status.
      dataContract = await this.prisma.contrato.findUnique({
        select:{
        valor:true,
        dataInicio: true,
        dataFim: true,
        reajuste1: true,
        reajuste2: true,
        reajuste3: true,
        mesReajuste1: true,
        mesReajuste2: true,
        mesReajuste3: true,
        percReajuste1: true,
        percReajuste2: true,
        percReajuste3: true,
        }, where: {
          id: contratoId
        }
      })

      try{
        if((dataContract.valor != data.valorComparar) || (dataContract.dataInicio != data.dataInicioComparar.split("-").join("")) || (dataContract.dataFim != data.dataFimComparar.split("-").join("")) || 
          (dataContract.reajuste1 != resultReajuste1) || (dataContract.reajuste2 != resultReajuste2) || (dataContract.reajuste3 != resultReajuste3) || 
          (dataContract.mesReajuste1 != data.mesReajusteComparar1) || (dataContract.mesReajuste2 != data.mesReajusteComparar2) || 
          (dataContract.mesReajuste3 != data.mesReajusteComparar3) || (Number(dataContract.percReajuste1) != Number(data.percReajusteComparar1)) || 
          (Number(dataContract.percReajuste2) != Number(data.percReajusteComparar2)) || (Number(dataContract.percReajuste3) != Number(data.percReajusteComparar3))){

          statusAtualizado = 'analise'
        }else{
          statusAtualizado = 'ativo'
        }
      }catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato.', HttpStatus.INTERNAL_SERVER_ERROR);
      }


      try {
        const ret = await this.prisma.contrato.update({
          where: {
            id: contratoId
          },
          data: {
            dataFimComparar: data.dataFimComparar == (undefined || null) ? '19990101' : data.dataFimComparar,
            dataInicioComparar: data.dataInicioComparar == (undefined || null) ? '19990101' : data.dataInicioComparar,
            docSolid: data.docSolid == (undefined || null) ? '' : data.docSolid,
            faturamento: data.faturamento == (undefined || null) ? '' : data.faturamento,
            natureza: data.natureza == (undefined || null) ? '' : data.natureza,
            idReajusteComparar1: resultReajuste1 == null ? 0 : resultReajuste1.id,
            idReajusteComparar2: resultReajuste2 == null ? 0 : resultReajuste2.id,
            idReajusteComparar3: resultReajuste3 == null ? 0 : resultReajuste3.id,
            reajusteComparar1: resultReajuste1 == null ? '' : resultReajuste1.name,
            reajusteComparar2: resultReajuste2 == null ? '' : resultReajuste2.name,
            reajusteComparar3: resultReajuste3 == null ? '' : resultReajuste3.name,
            mesReajusteComparar1: data.mesReajusteComparar1 == (undefined || null) ? '' : data.mesReajusteComparar1,
            mesReajusteComparar2: data.mesReajusteComparar2 == (undefined || null) ? '' : data.mesReajusteComparar2,
            mesReajusteComparar3: data.mesReajusteComparar3 == (undefined || null) ? '' : data.mesReajusteComparar3,
            percReajusteComparar1: data.percReajusteComparar1 == (null || undefined) ? 0 : data.percReajusteComparar1,
            percReajusteComparar2: data.percReajusteComparar2 == (null || undefined) ? 0 : data.percReajusteComparar2,
            percReajusteComparar3: data.percReajusteComparar3 == (null || undefined) ? 0 : data.percReajusteComparar3,
            retencaoContrato: data.retencaoContrato == (null || undefined) ? '' : data.retencaoContrato,
            seguros: data.seguros == (null || undefined) ? '' : data.seguros,
            tipoAss: data.tipoAss == (null || undefined) ? '' : data.tipoAss,
            valorComparar: data.valorComparar == (null || undefined) ? 0 : data.valorComparar,
            resumo: data.resumo,
            status: statusAtualizado,
            updatedJuridico: data.updatedJuridico,
            lgpd: data.lgpd,
            limiteResponsabilidade: data.limiteResponsabilidade,
            valorComparar: data.valorComparar,
            idSiga: data.idSiga,
          },
        });

        return ret;
        
      } catch (error) {
        throw new HttpException('Falha ao tentar alterar o contrato.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}

