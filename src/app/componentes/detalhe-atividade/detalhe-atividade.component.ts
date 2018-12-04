import { Atividade } from './../../models/atividade';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AtividadeService } from '../../servicos/atividade/atividade.service';

@Component({
  selector: 'app-detalhe-atividade',
  templateUrl: './detalhe-atividade.component.html',
  styleUrls: ['./detalhe-atividade.component.css']
})
export class DetalheAtividadeComponent implements OnInit {
  public blockedPanel = false;
  public edit = false;
  public atividade: Atividade;
  public permissao: boolean;

  public deletarAtividadeLog = false;
  public erroDeletarAtividade = false;
  public msgErroDeletarAtividade: string;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private atividadeService: AtividadeService
  ) { }

  ngOnInit() {
    this.getAtividade();
    if (localStorage['perfilIntegrante'] === 'Gerente' || localStorage['perfilIntegrante'] === 'Analista') {
      this.permissao = true;
    } else { this.permissao = false; }
  }

  /**
   * Redireciona para página inicial caso clique em cancelar.
   */
  cancelar(): void {
    this.location.back();
  }

  /**
   * Busca integrante selecionado pela id através da url.
   */
  getAtividade(): void {
    this.blockedPanel = true;
    const id: number = +this.route.snapshot.paramMap.get('idAtividade');
    this.atividadeService.getAtividade(id).subscribe(
      (atv: Atividade) => {
        this.blockedPanel = false;
        this.atividade = atv;
        if (this.atividade === undefined) {
          this.router.navigate(['not-fount']);
        }
      },
      (error) => this.blockedPanel = false
    );
  }

  /**
   * Bloqueia o painel de formulário e salva os dados editados.
   */
  salvarEdicao(): void {
    this.blockedPanel = true;
    this.atividadeService.editAtividade(this.atividade.idAtividade, this.atividade, this.atividade.requisito.id)
      .subscribe((() => {
        this.router.navigate(['/']);
      })
    );
  }

  deletar() {
    const id: number = +this.route.snapshot.paramMap.get('idAtividade');
    this.atividadeService.deleteAtividade(id, this.atividade.requisito.id).subscribe(
      () => this.router.navigate(['/']),
      errorDeletar => (
        this.msgErroDeletarAtividade = errorDeletar.error,
        this.deletarAtividadeLog = true,
        this.erroDeletarAtividade = true
      )
    );
  }
}
