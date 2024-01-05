import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cnpjservice } from 'src/app/services/cnpjservice.service';

@Component({
  selector: 'app-data-abertura',
  templateUrl: './data-abertura.component.html',
  styleUrls: ['./data-abertura.component.css'],
})
export class DataAberturaComponent implements OnInit {
  dadosCnpj: any;
  opcao: string = 'sim';
  dataCorretaManual: string = '';
  dataSelecionada: string = '';

  constructor(private cnpjService: cnpjservice, private router: Router) {}

  ngOnInit(): void {
    this.dadosCnpj = this.cnpjService.obterDadosCnpj();
    if (!this.dadosCnpj) {
      this.router.navigate(['/novo-cadastro']);
    }
  }

  proximoPasso() {
    this.dataSelecionada =
      this.opcao === 'sim' ? this.dadosCnpj.abertura : this.dataCorretaManual;
    this.cnpjService.armazenarDadosTemporarios({
      dataSelecionada: this.dataSelecionada,
    });
    this.router.navigate(['/nome']);
  }
  validarData(data: string): boolean {
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    return regexData.test(data);
  }
  validarDataManual() {
    if (this.opcao === 'nao' && this.dataCorretaManual) {
      const dataNumerica = this.dataCorretaManual.replace(/\D/g, '');
      console.log('Data numérica:', dataNumerica);
      if (
        dataNumerica.length === 8 &&
        !this.validarData(this.dataCorretaManual)
      ) {
        alert('Data inválida');
      }
    }
  }
}
