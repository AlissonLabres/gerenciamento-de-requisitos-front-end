import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URLSERVER } from './../../../environments/environment';
import { Artefato } from './../../models/artefato';
import { IArtefato } from '../../interfaces/artefato.interface';

@Injectable({
  providedIn: 'root'
})
export class ArtefatoService {

  constructor(private http: HttpClient) { }

  public addArtefato(
    artefato: Artefato
  ): Observable<void> {
    const iArtefato = new FormData();

    iArtefato.append('documento', artefato.documento);
    iArtefato.append('nome', artefato.nome);
    iArtefato.append('descricao', artefato.descricao);
    iArtefato.append('idCaso', artefato.idRequisito.toString());
    iArtefato.append('tipoDocumento', artefato.tipoDocumento );

    if (artefato.idRequisito) {
      iArtefato.append('idRequisito', artefato.idRequisito.toString());
    }

    if (artefato.idCasoDeUso) {
      iArtefato.append('idCasoDeUso', artefato.idCasoDeUso.toString());
    }

    return this.http.post<void>(
      URLSERVER + `/${localStorage.id}/projeto/${localStorage.projetoId}/artefato`,
      iArtefato
    );
  }

  public getArtefatos(): Observable<Artefato[]> {
    return this.http.get<IArtefato[]>(URLSERVER + `/${localStorage.id}/projeto/${localStorage.projetoId}/artefato/listar`)
      .pipe(
        map((iArtefatos: IArtefato[]) => {
          return iArtefatos.map((iArtefato: IArtefato) => {
            return new Artefato(
              iArtefato.id,
              iArtefato.nome,
              iArtefato.descricao,
              iArtefato.idRequisito,
              iArtefato.idCasoDeUso,
              iArtefato.documentoBase64,
              null
            );
          });
        })
      );
  }

  public getArtefato(id: number): Observable<Artefato> {
    return this.http.get<IArtefato>(URLSERVER + `/${localStorage.id}/projeto/${localStorage.projetoId}/artefato/${id}`)
      .pipe(
        map((iArtefato: IArtefato) => {
          return new Artefato(
            iArtefato.id,
            iArtefato.nome,
            iArtefato.descricao,
            iArtefato.idRequisito,
            iArtefato.idCasoDeUso,
            iArtefato.documentoBase64,
            null
          );
        })
      );
  }

  public editArtefato(artefato: Artefato): Observable<boolean> {
    const iArtefato = new FormData();

    iArtefato.append('documento', artefato.documento);
    iArtefato.append('nome', artefato.nome);
    iArtefato.append('descricao', artefato.descricao);
    iArtefato.append('idCaso', artefato.idRequisito.toString());
    iArtefato.append('tipoDocumento', artefato.tipoDocumento);

    if (artefato.idRequisito) {
      iArtefato.append('idRequisito', artefato.idRequisito.toString());
    }

    if (artefato.idCasoDeUso) {
      iArtefato.append('idCasoDeUso', artefato.idCasoDeUso.toString());
    }

    return this.http.put<boolean>(URLSERVER + `/${localStorage.id}/projeto/${localStorage.projetoId}/artefato/${artefato.id}`, iArtefato);
  }

  public deleteArtefato(id: number): Observable<boolean> {
    return this.http.delete<boolean>(URLSERVER + `/${localStorage.id}/projeto/${localStorage.projetoId}/artefato/${id}`);
  }
}
