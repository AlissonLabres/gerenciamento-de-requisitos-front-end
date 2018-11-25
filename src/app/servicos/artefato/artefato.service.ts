import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { URLSERVER } from './../../../environments/environment';
import { Artefato } from './../../models/artefato';
import { IArtefato } from './../../interfaces/artefato.interface';

@Injectable({
  providedIn: 'root'
})
export class ArtefatoService {

  constructor(private http: HttpClient) { }

  public addArtefato(artefato: Artefato): Observable<boolean> {
    console.log('aqui', artefato);
    const iArtefato: IArtefato = {
      nome: artefato.nome,
      descricao: artefato.descricao,
      idRequisito: artefato.idRequisito,
      idCasoDeUso: artefato.idCasoDeUso
    };

    return this.http.post<boolean>(URLSERVER + `/${localStorage.id}/projeto/${localStorage.projetoId}/artefato`, iArtefato);
  }
}
