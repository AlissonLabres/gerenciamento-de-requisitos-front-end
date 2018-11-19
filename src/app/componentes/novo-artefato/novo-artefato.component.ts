import { Location } from '@angular/common';
import { Artefato } from './../../models/artefato';
import { Component, OnInit } from '@angular/core';
import { RequisitoService } from '../../servicos/requisito/requisito.service';
import { take } from 'rxjs/operators';

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
    private requisitoService: RequisitoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.artefato = new Artefato(
      1, // TODO
      '',
      ''
    );
  }

  protected salvarArtefato() {
    this.requisitoService.addArtefato(this.artefato).pipe(take(1)).subscribe(() => {
      this.blockedPanel = true;
      this.location.back();
    });
  }

  protected cancelar() {
    this.location.back();
  }

}
