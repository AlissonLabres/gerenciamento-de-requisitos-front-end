export interface IArtefato {
  id?: number;
  nome: string;
  descricao: string;
  idRequisito?: number;
  idCasoDeUso?: number;
  documentoBase64?: string;
}
