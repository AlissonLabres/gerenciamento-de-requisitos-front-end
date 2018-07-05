import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CasoDeUso } from '../../models/caso-de-uso';

@Component({
  selector: 'app-caso-de-uso-card',
  templateUrl: './caso-de-uso-card.component.html',
  styleUrls: ['./caso-de-uso-card.component.css']
})
export class CasoDeUsoCardComponent implements OnChanges {
  @Input()
  public edit: boolean;
  @Input()
  public casoDeUso: CasoDeUso;
  protected casoDeUsoAux: CasoDeUso;
  protected casoDeUsoForm: FormGroup;
  protected nivel: any;
  protected nivelSelecionado: string;

  constructor(private fb: FormBuilder) {
    this.nivel = [
      {label: 'Selecione', value: null},
      {label: 'Muito', value: 'muito'},
      {label: 'Médio', value: 'medio'},
      {label: 'Pouco', value: 'pouco'},
    ];
   }

  ngOnChanges(changes: SimpleChanges) {
    this.initCasoDeUso();
    if (this.casoDeUso && this.edit) {
      this.initForm();
    }
  }

  /**
   * Clona caso de uso original e passa para o formulario.
   */
  initCasoDeUso(): void {
    this.casoDeUsoAux = new CasoDeUso(
      this.casoDeUso.idCasoDeUso,
      this.casoDeUso.projetoId,
      this.casoDeUso.titulo,
      this.casoDeUso.escopo,
      this.casoDeUso.nivel,
      this.casoDeUso.atorPrincipal,
      this.casoDeUso.preCondicoes,
      this.casoDeUso.posCondicoes,
      this.casoDeUso.cenarioPrincipal,
      this.casoDeUso.extensao,
      this.casoDeUso.criador,
      this.casoDeUso.dataCriacao
    );
  }

  /**
   * Inicia formulario.
   */
  initForm(): void {
    let dataCriacao;
    if (!this.casoDeUsoAux.dataCriacao) {
      dataCriacao = null;
    } else {
      dataCriacao = new Date(this.casoDeUsoAux.dataCriacao);
    }
    this.casoDeUsoForm = this.fb.group({
      titulo: [this.casoDeUsoAux.titulo, [Validators.required]],
      escopo: [this.casoDeUsoAux.escopo, [Validators.required]],
      nivel: [this.casoDeUsoAux.nivel, [Validators.required]],
      atorPrincipal: [this.casoDeUsoAux.atorPrincipal, [Validators.required]],
      preCondicoes: [this.casoDeUsoAux.preCondicoes, [Validators.required]],
      posCondicoes: [this.casoDeUsoAux.posCondicoes, [Validators.required]],
      cenarioPrincipal: [this.casoDeUsoAux.cenarioPrincipal, [Validators.required]],
      extensao: [this.casoDeUsoAux.extensao, [Validators.required]],
      criador: [this.casoDeUsoAux.criador, [Validators.required]],
      dataCriacao: [this.casoDeUsoAux.dataCriacao, [Validators.required]]
    });
  }

  /**
   * Caso de uso passado do componente de novo caso de uso recebe os dados do formulario.
   */
  salvarDados(): void {
    this.casoDeUso.titulo = this.casoDeUsoForm.get('titulo').value;
    this.casoDeUso.escopo = this.casoDeUsoForm.get('escopo').value;
    this.casoDeUso.nivel = this.casoDeUsoForm.get('nivel').value;
    this.casoDeUso.atorPrincipal = this.casoDeUsoForm.get('atorPrincipal').value;
    this.casoDeUso.preCondicoes = this.casoDeUsoForm.get('preCondicoes').value;
    this.casoDeUso.posCondicoes = this.casoDeUsoForm.get('posCondicoes').value;
    this.casoDeUso.cenarioPrincipal = this.casoDeUsoForm.get('cenarioPrincipal').value;
    this.casoDeUso.extensao = this.casoDeUsoForm.get('extensao').value;
    this.casoDeUso.criador = this.casoDeUsoForm.get('criador').value;
    this.casoDeUso.dataCriacao = this.casoDeUsoForm.get('dataCriacao').value;
  }

}
