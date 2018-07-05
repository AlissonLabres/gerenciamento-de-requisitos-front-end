export class CasoDeUso {
  private _id: number;
  private _projetoId: number;
  private _titulo: string;
  private _escopo: string;
  private _nivel: string;
  private _atorPrincipal: string;
  private _preCondicoes: string;
  private _posCondicoes: string;
  private _cenarioPrincipal: string;
  private _extensao: string;
  private _criador: string;
  private _dataCriacao: string;

  constructor(
    id: number,
    projetoId: number,
    titulo: string,
    escopo: string,
    nivel: string,
    atorPrincipal: string,
    preCondicoes: string,
    posCondicoes: string,
    cenarioPrincipal: string,
    extensao: string,
    criador: string,
    dataCriacao: string
  ) {
    this.idCasoDeUso = id;
    this.projetoId = projetoId;
    this.titulo = titulo;
    this.escopo = escopo;
    this.nivel = nivel;
    this.atorPrincipal = atorPrincipal;
    this.preCondicoes = preCondicoes;
    this.posCondicoes = posCondicoes;
    this.cenarioPrincipal = cenarioPrincipal;
    this.extensao = extensao;
    this.criador = criador;
    this.dataCriacao = dataCriacao;
  }

  public get idCasoDeUso(): number {
    return this._id;
  }

  public set idCasoDeUso(id: number) {
    this._id = id;
  }

  public get projetoId(): number {
    return this._projetoId;
  }

  public set projetoId(projetoId: number) {
    this._projetoId = projetoId;
  }

  public get titulo(): string {
    return this._titulo;
  }

  public set titulo(titulo: string) {
    this._titulo = titulo;
  }

  public get escopo(): string {
    return this._escopo;
  }

  public set escopo(escopo: string) {
    this._escopo = escopo;
  }

  public get nivel(): string {
    return this._nivel;
  }

  public set nivel(nivel: string) {
    this._nivel = nivel;
  }

  public get atorPrincipal(): string {
    return this._atorPrincipal;
  }

  public set atorPrincipal(atorPrincipal: string) {
    this._atorPrincipal = atorPrincipal;
  }

  public get preCondicoes(): string {
    return this._preCondicoes;
  }

  public set preCondicoes(preCondicoes: string) {
    this._preCondicoes = preCondicoes;
  }

  public get posCondicoes(): string {
    return this._posCondicoes;
  }

  public set posCondicoes(posCondicoes: string) {
    this._posCondicoes = posCondicoes;
  }

  public get cenarioPrincipal(): string {
    return this._cenarioPrincipal;
  }

  public set cenarioPrincipal(cenarioPrincipal: string) {
    this._cenarioPrincipal = cenarioPrincipal;
  }

  public get extensao(): string {
    return this._extensao;
  }

  public set extensao(extensao: string) {
    this._extensao = extensao;
  }

  public get criador(): string {
    return this._criador;
  }

  public set criador(criador: string) {
    this._criador = criador;
  }

  public get dataCriacao(): string {
    return this._dataCriacao;
  }

  public set dataCriacao(dataCriacao: string) {
    this._dataCriacao = dataCriacao;
  }
}
