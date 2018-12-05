import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


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

  public artefatoForm: FormGroup;

  public uploadedFiles: any[] = [];
  public url: string;
  public documentoAntigo: File[];

  public artefatoAux: Artefato;

  public requisitoVinculado: Requisito;
  public requisitoProjeto: Requisito[];
  public requisitos: any[];
  public requisitoSelecionado: number;

  public casosDeUsoVinculado: CasoDeUso;
  public casosDeUsoProjeto: CasoDeUso[];
  public cdus: any[];
  public cduSelecionado: number;

  tooltipPosition: string;

  constructor(
    private cduService: CasoDeUsoService,
    private requisitoService: RequisitoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public sanitize: DomSanitizer
  ) { }

  ngOnInit() {
    this.cduService.getCasosDeUso().subscribe(
      (casosDeUso: CasoDeUso[]) => {
        this.casosDeUsoProjeto = casosDeUso;
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
        this.requisitoProjeto = requisitos;
        this.requisitos = [];

        if (requisitos.length > 0) {
          requisitos.forEach((requisito: Requisito) => {
            this.requisitos.push({ label: `${requisito.nome}`, value: requisito.id });
          });

          this.requisitos.unshift({ label: 'Selecione', value: null });
        }
      }
    );

    this.tooltipPosition = window.screen.width < 600 ? 'top' : 'right';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artefato'] && changes['artefato'].currentValue) {
      this.url = `${URLSERVER}/${localStorage.id}/projeto/${localStorage.projetoId}/artefato/${this.artefato.id}/arquivo`;
      this.initArtefato();
      this.initForm();

      if (this.artefatoAux.idCasoDeUso && this.casosDeUsoProjeto && this.casosDeUsoProjeto.length > 0) {
        this.casosDeUsoVinculado = this.casosDeUsoProjeto.find(
          (cdu: CasoDeUso) => cdu.idCasoDeUso === Number.parseInt(this.artefatoAux.idCasoDeUso.toString())
        );

        this.cduSelecionado = this.casosDeUsoVinculado.id;
      }

      if (this.artefatoAux.idRequisito) {
        if (this.requisitoProjeto && this.requisitoProjeto.length > 0) {
          this.requisitoVinculado = this.requisitoProjeto.find(
            (req: Requisito) => req.id === Number.parseInt(this.artefatoAux.idRequisito.toString())
          );

          this.requisitoSelecionado = this.requisitoVinculado.id;
          this.artefatoForm.get('requisito').patchValue(this.requisitoSelecionado);
        }
      }

      if (this.artefatoAux.tipoDocumento) {
        const doc = this.base64ToFile(this.artefatoAux.tipoDocumento, this.artefatoAux.nome);
        this.documentoAntigo = [];
        this.documentoAntigo.push(doc);
      }
    }

    this.cdr.detectChanges();
  }

  /**
   * Inicia formulário.
   */
  public initForm(): void {
    this.artefatoForm = this.fb.group({
      nome: [this.artefatoAux.nome, [Validators.required]],
      descricao: [this.artefatoAux.descricao, [Validators.required]],
      requisito: [this.artefatoAux.idRequisito],
      casoDeUso: [this.artefatoAux.idCasoDeUso],
      documento: [this.artefatoAux.documento, [Validators.required]]
    });
  }

  initArtefato() {
    console.log('initArtefato()', this.artefato);
    this.artefatoAux = new Artefato(
      this.artefato.id,
      this.artefato.nome,
      this.artefato.descricao,
      this.artefato.idRequisito,
      this.artefato.idCasoDeUso,
      this.artefato.tipoDocumento,
      this.artefato.documento
    );
  }

  public documentChange(event) {
    this.artefato.documento = event.files[0];
    this.artefato.tipoDocumento = `${event.files[0].type} ${event.files[0].name.substring(event.files[0].name.length - 4)}`;
    this.artefatoForm.get('documento').setValue(this.artefato.documento);
  }

  public removerDocumento() {
    this.artefato.documento = null;
    this.artefato.tipoDocumento = '';
    this.artefatoForm.get('documento').setValue(null);
  }

  public salvarDados() {
    this.artefato.nome = this.artefatoForm.get('nome').value;
    this.artefato.descricao = this.artefatoForm.get('descricao').value;
    this.artefato.idRequisito = this.artefatoForm.get('requisito').value;
    this.artefato.idCasoDeUso = this.artefatoForm.get('casoDeUso').value;
    this.artefato.documento = this.artefatoForm.get('documento').value;
    console.log(`salvarDado()`, this.artefato);
  }

  private base64ToFile(file: string, name: string) {
    const arr = file.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], name, { type: mime });
  }

  private base64ToBlob(documento: string) {
    const sliceSize = 512;

    const byteCharacters = atob(documento.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays);
  }
}
