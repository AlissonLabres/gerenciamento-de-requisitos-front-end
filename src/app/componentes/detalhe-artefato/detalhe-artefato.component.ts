import { ArtefatoService } from './../../servicos/artefato/artefato.service';
import { Artefato } from './../../models/artefato';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhe-artefato',
  templateUrl: './detalhe-artefato.component.html',
  styleUrls: ['./detalhe-artefato.component.css']
})
export class DetalheArtefatoComponent implements OnInit {

  protected artefato: Artefato;
  protected edit = false;
  protected blockedPanel = false;
  protected permissao: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private artefatoService: ArtefatoService
  ) {

  }

  ngOnInit() {
    this.getArtefato();
    if (localStorage['perfilIntegrante'] === 'Gerente' || localStorage['perfilIntegrante'] === 'Analista') {
      this.permissao = true;
    } else { this.permissao = false; }
  }

  private getArtefato(): void {
    this.blockedPanel = true;
    const id: number = +this.route.snapshot.paramMap.get('idArtefato');
    this.artefatoService.getArtefato(id)
      .subscribe(
        (auxArtefato: Artefato) => {
          this.blockedPanel = false;
          this.artefato = auxArtefato;
          this.artefato.id = id;
          if (this.artefato === undefined) {
            this.router.navigate(['not-found']);
          }
        }, () => this.blockedPanel = false
      );
  }

  /**
   * Redireciona para rota anterior;
   */
  protected cancelar(): void {
    this.location.back();
  }

  /**
   * Bloqueia o painel de formulario e salva os dados editados do requisito.
   */
  protected salvarEdicao(): void {
    this.blockedPanel = true;
    this.artefatoService.editArtefato(this.artefato)
      .subscribe((() => {
        this.location.back();
      })
      );
  }

  protected deleteArtefato(): void {
    const id: number = +this.route.snapshot.paramMap.get('idArtefato');
    this.artefatoService.deleteArtefato(id).subscribe(
      () => this.location.back()
    );
  }

}
