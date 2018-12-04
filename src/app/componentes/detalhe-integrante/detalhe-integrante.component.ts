import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { Integrante } from '../../models/integrante';
import { IntegranteService } from '../../servicos/integrante/integrante.service';

@Component({
  selector: 'app-detalhe-integrante',
  templateUrl: './detalhe-integrante.component.html',
  styleUrls: ['./detalhe-integrante.component.css']
})
export class DetalheIntegranteComponent implements OnInit {
  public blockedPanel = false;
  public edit = false;
  public integrante: Integrante;
  public permissao: boolean;

  public deletarIntegranteLog = false;
  public erroDeletarIntegrante = false;
  public msgErroDeletarIntegrante: string;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private integranteService: IntegranteService
  ) { }

  ngOnInit() {
    this.getIntegrante();
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
  getIntegrante(): void {
    this.blockedPanel = true;
    const id: number = +this.route.snapshot.paramMap.get('idIntegrante');
    this.integranteService.getIntegrante(id).subscribe(
      (int: Integrante) => {
        this.blockedPanel = false;
        this.integrante = int;
        if (this.integrante === undefined) {
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
    this.integranteService.editIntegrante(this.integrante.id, this.integrante)
      .subscribe((auxProj => {
        this.router.navigate(['/']);
      })
      );
  }

  deletar() {
    const id: number = +this.route.snapshot.paramMap.get('idIntegrante');
    this.integranteService.deleteIntegrante(id).subscribe(
      deletou => this.router.navigate(['/']),
      errorDeletar => (
        this.msgErroDeletarIntegrante = errorDeletar.error,
        this.deletarIntegranteLog = true,
        this.erroDeletarIntegrante = true
      )
    );
  }
}
