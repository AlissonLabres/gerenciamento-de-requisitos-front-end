import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CasoDeUsoService } from './../../servicos/casoDeUso/caso-de-uso.service';
import { Artefato } from '../../models/artefato';
import { URLSERVER } from 'src/environments/environment';
import { Requisito } from 'src/app/models/requisito';
import { RequisitoService } from 'src/app/servicos/requisito/requisito.service';
import { CasoDeUso } from 'src/app/models/caso-de-uso';

@Component({
  selector: 'app-artefato-card',
  templateUrl: './artefato-card.component.html',
  styleUrls: ['./artefato-card.component.css']
})
export class ArtefatoCardComponent implements OnInit, OnChanges {

  @Input()
  public edit: boolean;
  @Input()
  public artefato: Artefato;

  protected artefatoForm: FormGroup;

  protected uploadedFiles: any[] = [];
  protected url: string;

  public artefatoAux: Artefato;

  protected requisitos: any[];
  protected requisitoSelecionado: Requisito;

  protected cdus: any[];
  protected cduSelecionado: CasoDeUso;

  constructor(
    private cduService: CasoDeUsoService,
    private requisitoService: RequisitoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.cduService.getCasosDeUso().subscribe(
      (casosDeUso: CasoDeUso[]) => {
        this.cdus = [];

        if (casosDeUso.length > 0) {
          casosDeUso.forEach((cdu: CasoDeUso) => {
            this.cdus.push({ label: `${cdu.nome}`, value: cdu.idCasoDeUso});
          });

          this.cdus.unshift({ label: 'Selecione', value: null });
        }
      }
    );

    this.requisitoService.getRequisitos().subscribe(
      (requisitos: Requisito[]) => {
        this.requisitos = [];

        if (requisitos.length > 0) {
          requisitos.forEach((requisito: Requisito) => {
            this.requisitos.push({ label: `${requisito.nome}`, value: requisito.idRequisito });
          });

          this.requisitos.unshift({ label: 'Selecione', value: null });
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artefato'] && changes['artefato'].currentValue) {
      this.url = `${URLSERVER}/${localStorage.id}/projeto/${localStorage.projetoId}/artefato/${this.artefato.id}/arquivo`;
      this.initArtefato();
      this.initForm();
    }
    this.cdr.detectChanges();
  }

  /**
   * Inicia formulário.
   */
  protected initForm(): void {
    this.artefatoForm = this.fb.group({
      nome: [this.artefatoAux.nome, [Validators.required]],
      descricao: [this.artefatoAux.descricao],
      requisito: [this.artefatoAux.idRequisito],
      casoDeUso: [this.artefatoAux.idCasoDeUso]
    });
  }

  initArtefato() {
    console.log('initArtefato()', this.artefato);
    this.artefatoAux = new Artefato(
      this.artefato.id,
      this.artefato.nome,
      this.artefato.descricao,
      this.artefato.idRequisito,
      this.artefato.idCasoDeUso
    );
  }

  public salvarDados() {
    this.artefato.nome = this.artefatoForm.get('nome').value;
    this.artefato.descricao = this.artefatoForm.get('descricao').value;
    this.artefato.idRequisito = this.artefatoForm.get('requisito').value;
    this.artefato.idCasoDeUso = this.artefatoForm.get('casoDeUso').value;
    console.log(`salvarDado()`, this.artefato.nome);
  }

}
