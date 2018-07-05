import { CasoDeUsoService } from './../../servicos/casoDeUso/caso-de-uso.service';
import { Component, OnInit } from '@angular/core';
import { CasoDeUso } from '../../models/caso-de-uso';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-caso-de-uso',
  templateUrl: './detalhe-caso-de-uso.component.html',
  styleUrls: ['./detalhe-caso-de-uso.component.css']
})
export class DetalheCasoDeUsoComponent implements OnInit {
  protected edit = false;
  protected blockedPanel = false;
  protected casoDeUso: CasoDeUso;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private cduService: CasoDeUsoService
  ) { }

  ngOnInit() {
    this.getCasoDeUso();
  }

  /**
   * Busca caso de uso pegando id da url.
   */
  getCasoDeUso(): void {
    const id: number = +this.route.snapshot.paramMap.get('idCasoDeUso');
    this.cduService.getCasoDeUso(id)
    .subscribe(
      (cdu: CasoDeUso) => {
        this.casoDeUso = cdu;
        this.casoDeUso.idCasoDeUso = id;
        if (this.casoDeUso === undefined) {
          this.router.navigate(['not-found']);
        }
      }
    );
  }

  /**
   * Redireciona para rota anterior;
   */
  cancelar(): void {
    this.location.back();
  }

  /**
   * Bloqueia o painel de formulario e salva os dados editados do caso de uso.
   */
  salvarEdicao(): void {
    this.blockedPanel = true;
    this.cduService.editCasoDeUso(this.casoDeUso.idCasoDeUso, this.casoDeUso)
      .subscribe((auxCdu => {
        this.location.back();
      })
    );
  }

  /**
   * Deleta o requisito e redireciona para a rota anterior.
   */
  deletar(): void {
    const id: number = +this.route.snapshot.paramMap.get('idCasoDeUso');
    this.cduService.deleteCasoDeUso(id).subscribe(
      deletou => this.location.back()
    );
  }

}
