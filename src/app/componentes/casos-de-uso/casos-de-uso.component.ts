import { CasoDeUso } from './../../models/caso-de-uso';
import { CasoDeUsoService } from './../../servicos/casoDeUso/caso-de-uso.service';
import { ProjetoService } from './../../servicos/projeto/projeto.service';
import { Projeto } from './../../models/projeto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-casos-de-uso',
  templateUrl: './casos-de-uso.component.html',
  styleUrls: ['./casos-de-uso.component.css']
})
export class CasosDeUsoComponent implements OnInit {
  public ocultar = false;
  public permissao: boolean;
  public projeto: Projeto;
  public casosDeUso: CasoDeUso[];
  public blockedPanel = false;
  public cols: { field: string, header: string }[] = [
    { field: 'idCasoDeUso', header: 'UC' },
    { field: 'nome', header: 'Nome' },
    { field: 'nivel', header: 'Nivel' },
    { field: 'acoes', header: 'Ações' }
  ];

  constructor(
    private router: Router,
    private cduService: CasoDeUsoService
  ) { }

  ngOnInit() {
    ProjetoService.projeto
      .subscribe(proj => this.projeto = proj);
    this.getCasosDeUso();
    if (localStorage.perfilIntegrante === 'Gerente' || localStorage.perfilIntegrante === 'Analista') {
      this.permissao = true;
    } else { this.permissao = false; }
  }

  /**
   * Busca os casos de uso do servidor através do serviço.
   */
  getCasosDeUso(): void {
    this.blockedPanel = true;
    this.cduService.getCasosDeUso()
      .subscribe(
        csdu => {
          this.casosDeUso = csdu;
          this.blockedPanel = false;
        }, () => this.blockedPanel = false
      );
  }

  /**
   * Navega para componente de criação de novo caso de uso.
   */
  novoCasoDeUso(): void {
    this.router.navigate(['novo-caso-de-uso']);
  }

  /**
   * Navega para o componente que mostrará mais detalhes do caso de uso.
   *
   * @param id - id do requisito que será passado para a rota.
   */
  detalheCasoDeUso(id: number): void {
    this.router.navigate([id + '/detalhe-caso-de-uso']);
  }

}
