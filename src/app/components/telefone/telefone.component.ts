import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cnpjservice } from 'src/app/services/cnpjservice.service';

@Component({
  selector: 'app-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.css'],
})
export class TelefoneComponent implements OnInit {
  dadosCnpj: any;
  opcao: string = 'sim';
  telefoneCorreto: string = '';
  telefoneSelecionado: string = '';
  constructor(private cnpjService: cnpjservice, private router: Router) {}

  ngOnInit(): void {
    this.dadosCnpj = this.cnpjService.obterDadosCnpj();
    if (!this.dadosCnpj) {
      this.router.navigate(['/novo-cadastro']);
    }
  }

  proximoPasso() {
    this.telefoneSelecionado =
      this.opcao === 'sim' ? this.dadosCnpj.telefone : this.telefoneCorreto;
    this.cnpjService.armazenarDadosTemporarios({
      telefoneCorreto: this.telefoneSelecionado,
    });
    this.cnpjService.completarDadosTemporarios();
    this.router.navigate(['/endereco']);
  }
}
