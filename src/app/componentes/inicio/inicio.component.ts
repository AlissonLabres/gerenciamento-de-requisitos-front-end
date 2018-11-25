import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjetoService } from './../../servicos/projeto/projeto.service';
import { Integrante } from './../../models/integrante';
import { Projeto } from '../../models/projeto';
import { Requisito } from '../../models/requisito';
import { Atividade } from '../../models/atividade';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  protected permissao: boolean;
  protected reqAtvInt: any;
  protected timeLine: any;
  protected atvStatus: any;
  protected projeto: Projeto;
  protected requisitos: Requisito[];
  protected atividades: Atividade[];
  protected integrantes: Integrante[];

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
    this.timeLine = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };
    const rf = this.requisitos.filter(req => req.categoria === 'Funcional');
    const rnf = this.requisitos.filter(req => req.categoria === 'Não Funcional');
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
