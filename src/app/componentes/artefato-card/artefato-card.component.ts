import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artefato } from '../../models/artefato';
import { URLSERVER } from 'src/environments/environment';

@Component({
  selector: 'app-artefato-card',
  templateUrl: './artefato-card.component.html',
  styleUrls: ['./artefato-card.component.css']
})
export class ArtefatoCardComponent implements OnChanges {

  @Input()
  public edit: boolean;
  protected artefatoForm: FormGroup;
  protected uploadedFiles: any[] = [];
  protected url: string;
  @Input()
  public artefato: Artefato;
  protected artefatoAux: Artefato;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.cdr.detectChanges();
    if (changes) {
      this.url = `${URLSERVER}/${localStorage['id']}/projeto/${localStorage['projetoId']}/artefato/${this.artefato.id}/arquivo`;
      this.initArtefato();
      this.initForm();
      this.cdr.detectChanges();
    }
    this.cdr.detectChanges();
  }

  /**
   * Inicia formulário.
   */
  protected initForm(): void {
    this.artefatoForm = this.fb.group({
      nome: [this.artefatoAux.nome, [Validators.required]],
      descricao: [this.artefatoAux.descricao, [Validators.required]],
    });
  }

  initArtefato() {
    this.artefatoAux = new Artefato(
      this.artefato.id,
      this.artefato.nome,
      this.artefato.descricao
    );
  }

  public salvarDados() {
    this.artefato.nome = this.artefatoForm.get('nome').value;
    this.artefato.descricao = this.artefatoForm.get('descricao').value;
  }

}
