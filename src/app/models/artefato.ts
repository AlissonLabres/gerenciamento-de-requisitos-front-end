
export class Artefato {
  private _id: number;
  private _nome: string;
  private _descricao: string;
  private _idRequisito: number;
  private _idCasoDeUso: number;

  constructor(
    id: number,
    nome: string,
    descricao: string,
    idRequisito: number,
    idCasoDeUso: number
  ) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.idRequisito = idRequisito;
    this.idCasoDeUso = idCasoDeUso;
  }

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public get descricao(): string {
    return this._descricao;
  }

  public set descricao(value: string) {
    this._descricao = value;
  }

  public get idRequisito(): number {
    return this._idRequisito;
  }

  public set idRequisito(value: number) {
    this._idRequisito = value;
  }

  public get idCasoDeUso(): number {
    return this._idCasoDeUso;
  }

  public set idCasoDeUso(value: number) {
    this._idCasoDeUso = value;
  }
}
