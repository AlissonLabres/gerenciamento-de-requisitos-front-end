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
  public blockedPanel = false;
  public edit = true;
  public artefato: Artefato;

  constructor(
    private artefatoService: ArtefatoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.artefato = new Artefato(
      undefined,
      '',
      '',
      null,
      null,
      '',
      null
    );
  }

  public salvarArtefato() {
    this.blockedPanel = true;
    this.artefatoService.addArtefato(this.artefato).subscribe(() => {
      this.location.back();
      this.blockedPanel = false;
    });
  }

  public cancelar() {
    this.location.back();
  }

}
