import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLSERVER } from '../../../environments/environment';
import { IAtividade } from '../../interfaces/atividade.interface';
import { Atividade } from '../../models/atividade';
import { Integrante } from '../../models/integrante';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  private urlServer = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  /**
   * Busca as atividades do projeto.
   */
  getAtividades(): Observable<Atividade[]> {
    return this.http.get<IAtividade[]>(
      `${URLSERVER}/${localStorage['id']}/projeto/${localStorage['projetoId']}/requisito/0/atividade/listaProjeto`
    ).map(
      (iAtividades: IAtividade[]) => {
        return iAtividades.map(
          (iAtividade: IAtividade) => {
            return new Atividade(
              iAtividade.id,
              iAtividade.nome,
              iAtividade.descricao,
              iAtividade.status,
              iAtividade.dataInicio,
              iAtividade.dataFim,
              iAtividade.dataConclusao,
              null,
              new Integrante(
                iAtividade.criador.id,
                iAtividade.criador.nome,
                iAtividade.criador.perfilIntegrante,
                null
              ),
              new Integrante(
                iAtividade.desenvolvedor.id,
                iAtividade.desenvolvedor.nome,
                iAtividade.desenvolvedor.perfilIntegrante,
                null
              )
            );
          }
        );
      }
    );
  }


  /**
   * Busca uma atividade atraves do id.
   *
   * @param id - id da atividade.
   */
  getAtividade(id: number): Observable<Atividade> {
    return this.http.get<IAtividade>(this.urlServer + `atividades?projetoId=${id}`).map(
      (iAtividade: IAtividade) => {
        // const atividade: Atividade = new Atividade(
        //   iAtividade.id,
        //   iAtividade.requisito.id,
        //   iAtividade.nome,
        //   iAtividade.criador.nome,
        //   iAtividade.desenvolvedor[iAtividade.desenvolvedor.length - 1].nome
        // );
        return null;
      }
    );
  }

  /**
   * Metodo recebe um objeto atividade, transforma em interface para enviar.
   *
   * @param atividade - objeto atividade.
   */
  addAtividade(atividade: Atividade): Observable<IAtividade> {
    const iAtividade = {
      nome: atividade.nome,
      descricao: atividade.descricao,
      status: atividade.status,
      dataInicio: new Date(atividade.dataInicio).toLocaleDateString(),
      dataFim: new Date(atividade.dataFim).toLocaleDateString(),
      idDesenvolvedor: atividade.desenvolvedor.id
    };

    return this.http.post<IAtividade>(
      `${URLSERVER}/${localStorage['id']}/projeto/${localStorage['projetoId']}/requisito/${atividade.requisito.id}/atividade`,
      iAtividade
    );
  }

  /**
   * Metodo recebe um objeto de atividade ja editado pelo usuario, transforma em interface
   * e usa o metodo PUT para enviar para o back-end.
   *
   * @param id - id da atividade editada.
   * @param atividade - objeto atividade com as propriedades ja editadas.
   */
  editAtividade(id: number, atividade: Atividade): Observable<boolean> {
    const iAtividade = {
      'nome': 'Criar Atividade',
      'descricao': 'Deverá criar a vinculação de uma atividade a um requisito',
      'status': 'Desenvolvendo',
      'dataInicio': '20/06/2018',
      'dataFim': '18/07/2018',
      'idDesenvolvedor': 1
    };

    return this.http.put<boolean>(this.urlServer + `atividades/${id}`, iAtividade);
  }

  /**
   * Metodo que deleta uma atividade do projeto de acordo com o id recebido.
   *
   * @param id - id da atividade a ser deletada.
   */
  deleteAtividade(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.urlServer + `atividades/${id}`);
  }

}
