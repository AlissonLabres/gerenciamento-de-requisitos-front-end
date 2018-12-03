import { IProjeto } from './projeto.interface';
import { IIntegrante } from './integrante.inteface';
import { IArtefato } from './artefato.interface';

export interface IRequisito {
  id: number;
  idRequisito: string;
  nome: string;
  descricao: string;
  importancia: string;
  fonte: string;
  categoria: string;
  idUsuario: number;
  status: string;
  integrante: IIntegrante;
  projeto: IProjeto;
  artefatos: IArtefato[];
}
