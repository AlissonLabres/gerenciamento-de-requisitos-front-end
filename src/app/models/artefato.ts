
export class Artefato {
  private _id: number;
  private _nome: string;
  private _descricao: string;

  constructor(
    nome: string,
    descricao: string
  ) {
    this.nome = nome;
    this.descricao = descricao;
  }

  public get id(): number {
    return this._id;
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
}
