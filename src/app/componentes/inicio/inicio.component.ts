import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjetoService } from './../../servicos/projeto/projeto.service';
import { Integrante } from './../../models/integrante';
import { Projeto } from '../../models/projeto';
import { Requisito } from '../../models/requisito';
import { Atividade } from '../../models/atividade';
import { CasoDeUso } from '../../models/caso-de-uso';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  protected ocultar = false;
  // informacoes para relatorio:
  protected qtdRequisitos: number;
  protected qtdIntegrantes: number;
  protected qtdAtividades: number;
  protected qtdReqFuncionais: number;
  protected qtdReqNaoFuncionais: number;
  protected qtdReqConcluidos: number;
  protected permissao: boolean;
  /**
   * Requisitos, atividades e integrantes.
   */
  protected reqAtvInt: any;
  protected statusRequisitos: any;
  protected atvStatus: any;
  protected projeto: Projeto;
  protected requisitos: Requisito[];
  protected atividades: Atividade[];
  protected integrantes: Integrante[];
  protected cdus: CasoDeUso[];

  constructor(
    private projetoService: ProjetoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reqAtvInt = {
      labels: ['carregando...'],
      datasets: [
        {
          data: [100],
          backgroundColor: ['#FF6384'],
          hoverBackgroundColor: ['#FF6384']
        }
      ]
    };
  }

  ngOnInit() {
    this.getProjeto();
    if (localStorage['perfilIntegrante'] === 'Gerente' || localStorage['perfilIntegrante'] === 'Analista') {
      this.permissao = true;
    } else { this.permissao = false; }
    this.qtdRequisitos = this.requisitos.length;
    this.qtdIntegrantes = this.integrantes.length;
    this.qtdAtividades = this.atividades.length;
  }

  /**
   * Busca o projeto para mostrar os dados.
   */
  getProjeto(): void {
    const id: number = +this.route.snapshot.paramMap.get('idProjeto');
    this.projetoService.getProjeto(id).subscribe(proj => {
      this.projeto = proj;
      this.requisitos = proj.requisitos;
      this.atividades = proj.atividades;
      this.integrantes = proj.integrantes;
      this.cdus = proj.casosDeUso;
      this.updateGraph();
    });
  }

  novoIntegrante() {
    this.router.navigate(['novo-integrante']);
  }

  updateGraph(): void {
    this.reqAtvInt = {
      labels: ['Requisitos', 'Atividades', 'Integrantes'],
      datasets: [
        {
          data: [
            this.requisitos.length,
            this.atividades.length,
            this.integrantes.length
          ],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }
      ]
    };
    const requisitosConcluidos = this.requisitos.filter(req => req.status === 'Concluido').length;
    this.qtdReqConcluidos = requisitosConcluidos;
    this.statusRequisitos = {
      labels: [
        'Requisitos não concluídos',
        'Requisitos concluídos'
      ],
      datasets: [
        {
          backgroundColor: [
            '#42A5F5',
            '#7CB342'
          ],
          data: [
            this.requisitos.length - requisitosConcluidos,
            requisitosConcluidos
          ]
        }
      ]
    };
    const rf = this.requisitos.filter(req => req.categoria === 'Funcional');
    const rnf = this.requisitos.filter(req => req.categoria === 'Não Funcional');
    this.qtdReqFuncionais = rf.length;
    this.qtdReqNaoFuncionais = rnf.length;
    this.atvStatus = {
      labels: ['Requisitos'],
      datasets: [
        {
          label: 'Total',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [this.requisitos.length, rf.length, rnf.length]
        },
        {
          label: 'Funcional',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [rf.length]
        },
        {
          label: 'Não funcional',
          backgroundColor: '#FFCE56',
          borderColor: '#7CB342',
          data: [rnf.length]
        }
      ]
    };
  }
}
