import { cnpjservice } from 'src/app/services/cnpjservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nome',
  templateUrl: './nome.component.html',
  styleUrls: ['./nome.component.css'],
})
export class NomeComponent implements OnInit {
  dadosCnpj: any;
  opcao: string = 'sim';
  nomeCorreto: string = '';
  nomeSelecionado: string = '';
  nomeFormatado: string = '';
  constructor(private cnpjService: cnpjservice, private router: Router) {}

  ngOnInit(): void {
    this.dadosCnpj = this.cnpjService.obterDadosCnpj();
    if (!this.dadosCnpj) {
      this.router.navigate(['/novo-cadastro']);
    }
    this.nomeFormatado = this.dadosCnpj.nome;
    this.formatarNome(this.nomeFormatado);
  }

  proximoPasso() {
    this.nomeSelecionado =
      this.opcao === 'sim' ? this.nomeFormatado : this.nomeCorreto;

    this.cnpjService.armazenarDadosTemporarios({
      nomeCorreto: this.nomeSelecionado,
    });
    this.router.navigate(['/cpf']);
  }
  formatarNome(nomeFormatado: string) {
    const nomeSemNumeros = nomeFormatado.replace(/[0-9]/g, '');
    this.nomeFormatado = nomeSemNumeros;
  }
}
