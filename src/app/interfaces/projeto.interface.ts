import { IRequisito } from './requisito.interface';
import { IIntegrante } from './integrante.inteface';
import { IAtividade } from './atividade.interface';
import { ICasoDeUso } from './casoDeUso.interface';

export interface IProjeto {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  perfilIntegranteProjeto: string;
  status: string;
  requisitos: IRequisito[];
  casosDeUso: ICasoDeUso[];
  atividades: IAtividade[];
  integrantes: IIntegrante[];
}
