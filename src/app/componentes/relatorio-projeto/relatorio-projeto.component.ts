import { Component, OnInit, Input } from '@angular/core';

import { Requisito } from 'src/app/models/requisito';
import { CasoDeUso } from 'src/app/models/caso-de-uso';
import { Atividade } from 'src/app/models/atividade';

@Component({
  selector: 'app-relatorio-projeto',
  templateUrl: './relatorio-projeto.component.html',
  styleUrls: ['./relatorio-projeto.component.css']
})
export class RelatorioProjetoComponent implements OnInit {
  @Input()
  public titulo: string;
  @Input()
  public requisitos: Requisito[];
  @Input()
  public cdus: CasoDeUso[];
  @Input()
  public atvs: Atividade[];
  @Input()
  public qtdRequisitos: number;
  @Input()
  public qtdIntegrantes: number;
  @Input()
  public qtdAtividades: number;
  @Input()
  public qtdReqFuncionais: number;
  @Input()
  public qtdReqNaoFuncionais: number;
  @Input()
  public qtdReqConcluidos: number;

  constructor() { }

  ngOnInit() {
  }

  imprimir(elem) {
    const mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + 'Relatório - Casos de uso' + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  }

}
