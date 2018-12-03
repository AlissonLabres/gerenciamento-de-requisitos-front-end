import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Requisito } from '../../models/requisito';
import { Status } from './../../conts/status';

@Component({
  selector: 'app-requisito-card',
  templateUrl: './requisito-card.component.html',
  styleUrls: ['./requisito-card.component.css']
})
export class RequisitoCardComponent implements OnInit, OnChanges {
  @Input()
  public edit: boolean;
  @Input()
  public requisito: Requisito;
  protected requisitoAux: Requisito;
  protected requisitoForm: FormGroup;

  protected importancia: { label: string, value: string }[];
  protected importanciaSelecionada: string;

  protected categoria: { label: string, value: string }[];
  protected categoriaSelecionada: string;

  protected status: { label: string, value: string }[];
  protected statusSelecionado: string;

  protected display = false;
  protected projetoSelecionado = localStorage.projetoId;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.status = [];
    this.status.push({ label: 'Selecione', value: null });
    for (const status of Status) {
      this.status.push({ label: status, value: status });
    }

    this.importancia = [
      { label: 'Selecione', value: null },
      { label: 'Essencial', value: 'Essencial' },
      { label: 'Importante', value: 'Importante' },
      { label: 'Desejável', value: 'Desejavel' },
    ];

    this.categoria = [
      { label: 'Selecione', value: null },
      { label: 'Funcional', value: 'Funcional' },
      { label: 'Não Funcional', value: 'Nao Funcional' }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['requisito'] && changes['requisito'].currentValue) {
      this.initRequisito();
      this.initForm();
    }
    this.cdr.detectChanges();
  }

  /**
   * Clona requisito original e passa para o formulario.
   */
  initRequisito(): void {
    this.requisitoAux = new Requisito(
      this.requisito.id,
      this.requisito.idRequisito,
      this.requisito.nome,
      this.requisito.descricao,
      this.requisito.importancia,
      this.requisito.fonte,
      this.requisito.categoria,
      this.requisito.status,
      this.requisito.integrante,
      this.requisito.projeto,
      this.requisito.artefatos
    );
  }

  /**
   * Inicia formulario.
   */
  initForm(): void {
    this.requisitoForm = this.fb.group({
      idRequisito: [this.requisitoAux.idRequisito, [Validators.required]],
      nome: [this.requisitoAux.nome, [Validators.required]],
      descricao: [this.requisitoAux.descricao],
      importancia: [this.requisitoAux.importancia, [Validators.required]],
      fonte: [this.requisitoAux.fonte, [Validators.required]],
      categoria: [this.requisitoAux.categoria, [Validators.required]],
      status: [this.requisitoAux.status, [Validators.required]],
    });
  }

  dialogArtefato() {
    this.display = !this.display;
  }

  /**
   * Requisito passado do componente de novo requisito recebe os dados do formulario.
   */
  salvarDados(): void {
    this.requisito.idRequisito = this.requisitoForm.get('idRequisito').value;
    this.requisito.nome = this.requisitoForm.get('nome').value;
    this.requisito.descricao = this.requisitoForm.get('descricao').value;
    this.requisito.importancia = this.requisitoForm.get('importancia').value;
    this.requisito.fonte = this.requisitoForm.get('fonte').value;
    this.requisito.categoria = this.requisitoForm.get('categoria').value;
    this.requisito.status = this.requisitoForm.get('status').value;
  }
}
