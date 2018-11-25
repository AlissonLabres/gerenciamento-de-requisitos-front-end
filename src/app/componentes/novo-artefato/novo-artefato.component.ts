import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';

import { ArtefatoService } from 'src/app/servicos/artefato/artefato.service';
import { Artefato } from './../../models/artefato';

@Component({
  selector: 'app-novo-artefato',
  templateUrl: './novo-artefato.component.html',
  styleUrls: ['./novo-artefato.component.css']
})
export class NovoArtefatoComponent implements OnInit {
  protected blockedPanel = false;
  protected edit = true;
  protected artefato: Artefato;

  constructor(
    private artefatoService: ArtefatoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.artefato = new Artefato(
      null,
      '',
      '',
      null,
      null
    );
  }

  protected salvarArtefato() {
    this.blockedPanel = true;
    this.artefatoService.addArtefato(this.artefato).subscribe(() => {
      this.location.back();
      this.blockedPanel = false;
    });
  }

  protected cancelar() {
    this.location.back();
  }

}
