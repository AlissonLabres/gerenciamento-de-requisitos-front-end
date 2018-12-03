import { Component, OnInit } from '@angular/core';

import { ArtefatoService } from 'src/app/servicos/artefato/artefato.service';
import { ProjetoService } from 'src/app/servicos/projeto/projeto.service';
import { Artefato } from 'src/app/models/artefato';
import { Projeto } from '../../models/projeto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artefatos',
  templateUrl: './artefatos.component.html',
  styleUrls: ['./artefatos.component.css']
})
export class ArtefatosComponent implements OnInit {
  protected permissao: boolean;
  protected projeto: Projeto;
  protected artefatos: Artefato[];
  protected blockedPanel = false;
  protected cols: any = [
    { field: 'id', header: 'ID' },
    { field: 'nome', header: 'Nome' },
    { field: 'acao', header: 'Ação' }
  ];

  constructor(private router: Router, private artefatoService: ArtefatoService) { }

  ngOnInit() {
    ProjetoService.projeto.subscribe((proj: Projeto) => this.projeto = proj);
    this.getArtefatos();
    if (localStorage.perfilIntegrante === 'Gerente' || localStorage.perfilIntegrante === 'Analista') {
      this.permissao = true;
    } else { this.permissao = false; }
  }

  private getArtefatos(): void {
    this.artefatoService.getArtefatos().subscribe(
      (atfs: Artefato[]) => this.artefatos = atfs
    );
  }

  detalheArtefato(id: number): void {
    const rota = id + '/detalhe-artefato';
    this.router.navigate([rota]);
  }
}
