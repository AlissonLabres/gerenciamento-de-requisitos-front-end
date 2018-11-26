import { CasoDeUsoService } from './../../servicos/casoDeUso/caso-de-uso.service';
import { Component, OnInit } from '@angular/core';
import { CasoDeUso } from 'src/app/models/caso-de-uso';

@Component({
  selector: 'app-relatorio-casos-de-uso',
  templateUrl: './relatorio-casos-de-uso.component.html',
  styleUrls: ['./relatorio-casos-de-uso.component.css']
})
export class RelatorioCasosDeUsoComponent implements OnInit {
  protected listarCasosdeuso: CasoDeUso[];

  constructor(
    private cduService: CasoDeUsoService
  ) { }


  ngOnInit() {
    this.getCasosdeuso();
  }

  getCasosdeuso() {
    this.cduService.getCasosDeUso().subscribe((casosdeuso: CasoDeUso[]) => {
      this.listarCasosdeuso = casosdeuso;
    });
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
