import { IRequisito } from './requisito.interface';
import { IIntegrante } from './integrante.inteface';

export interface IProjeto {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  requisito: IRequisito[];
  casosDeUso: any[];
  integrantes: IIntegrante[];
}
