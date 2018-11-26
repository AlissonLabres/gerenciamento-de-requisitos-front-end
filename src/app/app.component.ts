import { Component } from '@angular/core';

import { ProjetoService } from './servicos/projeto/projeto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private projetoService: ProjetoService) {

  }
}
