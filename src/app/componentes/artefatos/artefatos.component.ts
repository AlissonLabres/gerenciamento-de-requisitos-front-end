import { Component, OnInit } from '@angular/core';

import { ArtefatoService } from 'src/app/servicos/artefato/artefato.service';
import { ProjetoService } from 'src/app/servicos/projeto/projeto.service';
import { Artefato } from 'src/app/models/artefato';
import { Projeto } from '../../models/projeto';

@Component({
  selector: 'app-artefatos',
  templateUrl: './artefatos.component.html',
  styleUrls: ['./artefatos.component.css']
})
export class ArtefatosComponent implements OnInit {
  protected projeto: Projeto;
  protected artefatos: Artefato[];
  protected blockedPanel = false;
  protected cols: any = [
    { field: 'id', header: 'ID' },
    { field: 'nome', header: 'Nome' }
  ];

  constructor(private artefatoService: ArtefatoService) { }

  ngOnInit() {
    ProjetoService.projeto.subscribe((proj: Projeto) => this.projeto = proj);
    this.getArtefatos();
  }

  private getArtefatos(): void {
    this.artefatoService.getArtefatos().subscribe(
      (atfs: Artefato[]) => this.artefatos = atfs
    );
  }

}
