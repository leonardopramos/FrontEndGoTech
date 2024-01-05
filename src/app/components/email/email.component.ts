import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cnpjservice } from 'src/app/services/cnpjservice.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  dadosCnpj: any;
  opcao: string = 'sim';
  emailCorreto: string = '';
  emailSelecionado: string = '';
  constructor(private cnpjService: cnpjservice, private router: Router) {}

  ngOnInit(): void {
    this.dadosCnpj = this.cnpjService.obterDadosCnpj();
    if (!this.dadosCnpj) {
      this.router.navigate(['/novo-cadastro']);
    }
  }

  proximoPasso() {
    this.emailSelecionado =
      this.opcao === 'sim' ? this.dadosCnpj.email : this.emailCorreto;
    this.cnpjService.armazenarDadosTemporarios({
      emailCorreto: this.emailSelecionado,
    });
    this.router.navigate(['/telefone']);
  }
}
