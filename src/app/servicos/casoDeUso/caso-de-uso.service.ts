import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ICasoDeUso } from '../../interfaces/casoDeUso.interface';
import { CasoDeUso } from '../../models/caso-de-uso';

@Injectable({
  providedIn: 'root'
})
export class CasoDeUsoService {
  private urlServer = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  /**
   * Busca os casos de uso do servidor.
   */
  getCasosDeUso(): Observable<CasoDeUso[]> {
    const idProjeto = localStorage['projetoId'];
    return this.http.get<ICasoDeUso[]>(this.urlServer + `casosDeUso?projetoId=${idProjeto}`).map(
      (iCasosDeUsos: ICasoDeUso[]) => {
        const casosDeUso: CasoDeUso[] = iCasosDeUsos.map(
          (iCasosUso: ICasoDeUso) => new CasoDeUso(
            iCasosUso.id,
            iCasosUso.projetoId,
            iCasosUso.titulo,
            iCasosUso.escopo,
            iCasosUso.nivel,
            iCasosUso.atorPrincipal,
            iCasosUso.preCondicoes,
            iCasosUso.posCondicoes,
            iCasosUso.cenarioPrincipal,
            iCasosUso.extensao,
            iCasosUso.criador,
            iCasosUso.dataCriacao
          )
        );
        return casosDeUso;
      }
    );
  }

  /**
   * Busca um caso de uso através do id.
   *
   * @param id - id do caso de uso.
   */
  getCasoDeUso(id: number): Observable<CasoDeUso> {
    return this.http.get<ICasoDeUso[]>(this.urlServer + `casosDeUso?projetoId=${id}`).map(
      (iCasoDeUsos: ICasoDeUso[]) => {
        if (!iCasoDeUsos || !iCasoDeUsos[0]) {
          return undefined;
        }
        const casoDeUso: CasoDeUso = new CasoDeUso (
          iCasoDeUsos[0].id,
          iCasoDeUsos[0].projetoId,
          iCasoDeUsos[0].titulo,
          iCasoDeUsos[0].escopo,
          iCasoDeUsos[0].nivel,
          iCasoDeUsos[0].atorPrincipal,
          iCasoDeUsos[0].preCondicoes,
          iCasoDeUsos[0].posCondicoes,
          iCasoDeUsos[0].cenarioPrincipal,
          iCasoDeUsos[0].extensao,
          iCasoDeUsos[0].criador,
          iCasoDeUsos[0].dataCriacao
        );
        return casoDeUso;
      }
    );
  }

  /**
   * Gera uma interface de um modelo de caso de uso para enviar para o back-end.
   *
   * @param casoDeUso - model caso de uso.
   */
  private geraInterfaceCasoDeUso(casoDeUso: CasoDeUso): ICasoDeUso {
    const projetoId = localStorage['projetoId'];
    const iCasoDeUso: ICasoDeUso = {
      id: undefined,
      projetoId: projetoId,
      titulo: casoDeUso.titulo,
      escopo: casoDeUso.escopo,
      nivel: casoDeUso.nivel,
      atorPrincipal: casoDeUso.atorPrincipal,
      preCondicoes: casoDeUso.preCondicoes,
      posCondicoes: casoDeUso.posCondicoes,
      cenarioPrincipal: casoDeUso.cenarioPrincipal,
      extensao: casoDeUso.extensao,
      criador: casoDeUso.criador,
      dataCriacao: casoDeUso.dataCriacao
    };
    return iCasoDeUso;
  }

  /**
   * Método para adicionar um caso de uso.
   *
   * @param casoDeUso - caso de uso a ser adicionado.
   */
  addCasoDeUso(casoDeUso: CasoDeUso): Observable<ICasoDeUso> {
    const iCasoDeUso: ICasoDeUso = this.geraInterfaceCasoDeUso(casoDeUso);
    return this.http.post<ICasoDeUso>(this.urlServer + `casosDeUso`, iCasoDeUso);
  }


  /**
   * Método para editar um caso de uso através da requisição PUT.
   *
   * @param id - id do caso de uso.
   * @param casoDeUso - objeto caso de uso com as informacoes ja editadas.
   */
  editCasoDeUso(id: number, casoDeUso: CasoDeUso): Observable<boolean> {
    const iCasoDeUso: ICasoDeUso = this.geraInterfaceCasoDeUso(casoDeUso);
    return this.http.put<boolean>(this.urlServer + `casosDeUso/${id}`, iCasoDeUso);
  }

  /**
   * Método que deletará o caso de uso através da requisição DELETE passando id.
   *
   * @param id - id do caso de uso que sera deletado.
   */
  deleteCasoDeUso(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.urlServer + `casosDeUso/${id}`);
  }
}
