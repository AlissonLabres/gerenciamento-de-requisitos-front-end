import { Integrante } from './../../models/integrante';
import { Component, OnInit } from '@angular/core';
import { IntegranteService } from '../../servicos/integrante/integrante.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-novo-integrante',
  templateUrl: './novo-integrante.component.html',
  styleUrls: ['./novo-integrante.component.css']
})
export class NovoIntegranteComponent implements OnInit {
  public blockedPanel = false;
  public msgErroIntegrante = 'Os campos sao obrigatorios';
  public integranteLog = false;
  public integrante: Integrante;
  public edit = true;

  public usuarioSelecionado: Usuario = null;

  constructor(
    private integranteService: IntegranteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.integrante = new Integrante(
      undefined,
      '',
      '',
      null
    );
  }

  /**
   * Navega para a rota inicial ao clicar em cancelar.
   */
  cancelar(): void {
    this.router.navigate(['/']);
  }

  /**
   * Obter usuário selecionado no componente integrante-card para vincular o mesmo no projeto.
   */
  atualizarUsuario(event: Usuario) {
    this.usuarioSelecionado = event;
  }

  /**
   * Bloqueia a página e chama o método de salvar o projeto passando o objeto para o serviço
   * responsável por enviar e salvar no servidor.
   */
  salvarIntegrante(): void {
    this.blockedPanel = true;
    this.integranteService.addIntegrante(this.integrante, this.usuarioSelecionado.id).subscribe(
      () => (this.blockedPanel = false, this.router.navigate(['/'])),
      errorIntegrante => {
        (
          this.blockedPanel = false,
          this.msgErroIntegrante = errorIntegrante.error,
          this.integranteLog = true
        );
      }
    );
  }

}
