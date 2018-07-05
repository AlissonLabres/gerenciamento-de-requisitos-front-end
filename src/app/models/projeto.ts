import { Requisito } from './requisito';
import { Integrante } from './integrante';

export class Projeto {
  private _id: number;
  private _nome: string;
  private _dataInicio: string;
  private _dataFim: string;
  private _requisitos: any[];
  private _casosDeUso: any[];
  private _integrantes: any[];

  constructor(
    id: number,
    nome: string,
    dataInicio: string,
    dataFim: string,
    requisitos: Requisito[],
    casosDeUso: any[],
    integrantes: Integrante[]
  ) {
    this.idProjeto = id;
    this.nome = nome;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.requisitos = requisitos;
    this.casosDeUso = casosDeUso;
    this.integrantes = integrantes;
  }

  public get idProjeto(): number {
    return this._id;
  }

  public set idProjeto(idProjeto: number) {
    this._id = idProjeto;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(nome: string) {
    this._nome = nome;
  }

  public get dataInicio(): string {
    return this._dataInicio;
  }

  public set dataInicio(dataInicio: string) {
    this._dataInicio = dataInicio;
  }

  public get dataFim(): string {
    return this._dataFim;
  }

  public set dataFim(dataFim: string) {
    this._dataFim = dataFim;
  }

  public get requisitos(): any[] {
    return this._requisitos;
  }

  public set requisitos(requisitos: any[]) {
    this._requisitos = requisitos;
  }

  public get casosDeUso(): any[] {
    return this._casosDeUso;
  }

  public set casosDeUso(casosDeUso: any[]) {
    this._casosDeUso = casosDeUso;
  }

  public get integrantes(): any[] {
    return this._integrantes;
  }

  public set integrantes(integrantes: any[]) {
    this._integrantes = integrantes;
  }
}
