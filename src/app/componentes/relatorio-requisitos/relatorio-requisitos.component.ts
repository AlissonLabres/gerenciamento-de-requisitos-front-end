import { Component, OnInit } from '@angular/core';
import { RequisitoService } from 'src/app/servicos/requisito/requisito.service';
import { Requisito } from 'src/app/models/requisito';

@Component({
  selector: 'app-relatorio-requisitos',
  templateUrl: './relatorio-requisitos.component.html',
  styleUrls: ['./relatorio-requisitos.component.css']
})
export class RelatorioRequisitosComponent implements OnInit {
  protected listarRequisitos: Requisito[];
  constructor(
    private requisitoService: RequisitoService
  ) { }

  ngOnInit() {
    this.requisitoService.getRequisitos().subscribe(
      (requisitos: Requisito[]) => this.listarRequisitos = requisitos
    );
  }

  imprimir(elem) {
    const mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + 'Relatório - Requisitos' + '</title>');
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
