import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { Atividade } from '../../models/atividade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Requisito } from '../../models/requisito';
import { Integrante } from '../../models/integrante';
import { RequisitoService } from '../../servicos/requisito/requisito.service';
import { IntegranteService } from '../../servicos/integrante/integrante.service';
import { Status } from 'src/app/conts/status';

@Component({
  selector: 'app-atividade-card',
  templateUrl: './atividade-card.component.html',
  styleUrls: ['./atividade-card.component.css']
})
export class AtividadeCardComponent implements OnInit, OnChanges {
  @Input()
  public edit: boolean;
  @Input()
  public atividade: Atividade;
  @Input()
  public novo: boolean;

  public atividadeAux: Atividade;
  public atividadeForm: FormGroup;

  tooltipPosition: string;

  public status: any;
  public statusSelecionado: string;

  public requisitos: any[];
  public requisitoSelecionado: number;

  public desenvolvedores: any;
  public desenvolvedorSelecionado: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private requisitoService: RequisitoService,
    private integranteService: IntegranteService
  ) { }

  ngOnInit() {
    this.status.push({ label: 'Selecione', value: null });
    for (const status of Status) {
      this.status.push({ label: status, value: status });
    }

    this.requisitoService.getRequisitos().subscribe(
      (requisitos: Requisito[]) => {
        this.requisitos = [];

        if (requisitos.length > 0) {
          requisitos.forEach((requisito: Requisito) => {
            this.requisitos.push({ label: `${requisito.nome}`, value: requisito });
          });

          this.requisitos.unshift({ label: 'Selecione', value: null });
        }
      });

    this.integranteService.getIntegrantes().subscribe(
      (integrantes: Integrante[]) => {
        this.desenvolvedores = [];

        if (integrantes.length > 0) {
          integrantes.forEach((integrante: Integrante) => {
            this.desenvolvedores.push({ label: `${integrante.nome}`, value: integrante });
          });

          this.desenvolvedores.unshift({ label: 'Selecione', value: null });
        }
      });

    this.tooltipPosition = window.screen.width < 600 ? 'top' : 'right';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['atividade'] && changes['atividade'].currentValue) {
      this.initAtividade();
      this.initForm();
    }
    this.cdr.detectChanges();
  }

  /**
   * Clona atividade original e passa para o formulario.
   */
  initAtividade(): void {
    this.atividadeAux = new Atividade(
      this.atividade.idAtividade,
      this.atividade.nome,
      this.atividade.descricao,
      this.atividade.status,
      this.atividade.dataInicio,
      this.atividade.dataFim,
      this.atividade.dataConclusao,
      this.atividade.requisito,
      this.atividade.criador,
      this.atividade.desenvolvedor,
    );
  }

  /**
   * Inicia formulario.
   */
  initForm(): void {
    this.atividadeForm = this.fb.group({
      nome: [this.atividadeAux.nome, [Validators.required]],
      descricao: [this.atividadeAux.descricao, [Validators.required]],
      status: [this.atividadeAux.status, [Validators.required]],
      dataInicio: [this.atividadeAux.dataInicio, [Validators.required]],
      dataFim: [this.atividadeAux.dataFim, [Validators.required]],
      dataConclusao: [this.atividadeAux.dataConclusao],
      requisito: [this.atividadeAux.requisito, [Validators.required]],
      desenvolvedor: [this.atividadeAux.desenvolvedor, [Validators.required]]
    });

    this.atividadeForm.get('status').valueChanges.subscribe((value: string) => {
      if (this.novo) {
        this.status.forEach(s => {
          if (s.value === 'Concluido') {
            const index = this.status.indexOf(s);
            if (index > -1) {
              this.status.splice(index, 1);
            }
          }
        });
      }
      if (value === 'Concluido') {
        this.atividadeForm.get('dataConclusao').setErrors({ 'required': true });
      } else {
        this.atividadeForm.get('dataConclusao').setErrors(null);
      }
    });

    if (!this.novo) {
      this.atividadeForm.get('requisito').setErrors(null);
      this.atividadeForm.get('desenvolvedor').setErrors(null);
    }
  }

  /**
   * Atividade passada do componente recebe os dados editados pelo formulario.
   */
  salvarDados(): void {
    this.atividade.nome = this.atividadeForm.get('nome').value;
    this.atividade.descricao = this.atividadeForm.get('descricao').value;
    this.atividade.status = this.atividadeForm.get('status').value;
    this.atividade.dataInicio = this.atividadeForm.get('dataInicio').value;
    this.atividade.dataFim = this.atividadeForm.get('dataFim').value;
    this.atividade.requisito = this.atividadeForm.get('requisito').value;
    this.atividade.desenvolvedor = this.atividadeForm.get('desenvolvedor').value;
  }
}
