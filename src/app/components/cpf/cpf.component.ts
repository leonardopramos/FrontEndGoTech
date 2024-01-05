import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cnpjservice } from 'src/app/services/cnpjservice.service';

@Component({
  selector: 'app-cpf',
  templateUrl: './cpf.component.html',
  styleUrls: ['./cpf.component.css'],
})
export class CpfComponent implements OnInit {
  dadosCnpj: any;
  opcao: string = 'sim';
  cpfCorreto: string = '';
  cpfSelecionado: string = '';
  cpfFormatado: string = '';
  constructor(private cnpjService: cnpjservice, private router: Router) {}

  ngOnInit(): void {
    this.dadosCnpj = this.cnpjService.obterDadosCnpj();
    if (!this.dadosCnpj) {
      this.router.navigate(['/novo-cadastro']);
    }
    this.cpfFormatado = this.formatarCpf(this.dadosCnpj.nome);
  }

  proximoPasso() {
    this.cpfSelecionado =
      this.opcao === 'sim' ? this.cpfFormatado : this.cpfCorreto;
    this.cnpjService.armazenarDadosTemporarios({
      cpfCorreto: this.formatarCpf(this.cpfSelecionado),
    });
    this.router.navigate(['/email']);
  }

  formatarCpf(cpf: string) {
    const cpfNumeros = cpf.replace(/\D/g, '');
    const cpfFormatadoFinal = cpfNumeros.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      '$1.$2.$3-$4'
    );
    return cpfFormatadoFinal;
  }
}
