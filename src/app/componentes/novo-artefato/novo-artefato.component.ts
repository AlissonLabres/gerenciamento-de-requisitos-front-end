import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-artefato',
  templateUrl: './novo-artefato.component.html',
  styleUrls: ['./novo-artefato.component.css']
})
export class NovoArtefatoComponent implements OnInit {
  protected blockedPanel = false;
  protected edit = true;

  constructor() { }

  ngOnInit() {
  }

}
