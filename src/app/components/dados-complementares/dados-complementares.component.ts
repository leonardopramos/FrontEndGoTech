import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cnpjservice } from 'src/app/services/cnpjservice.service';

@Component({
  selector: 'app-dados-complementares',
  templateUrl: './dados-complementares.component.html',
  styleUrls: ['./dados-complementares.component.css'],
})
export class DadosComplementaresComponent implements OnInit {
  percentualModel: string = '';
  dadosCnpj: any;

  constructor(private cnpjService: cnpjservice, private router: Router) {}
  ngOnInit(): void {
    this.dadosCnpj = this.cnpjService.obterDadosCnpj();
    if (!this.dadosCnpj) {
      this.router.navigate(['/novo-cadastro']);
    }
  }
  proximaTela() {
    const percentual = this.percentualModel;
    const faturamento = (
      document.getElementById('faturamento') as HTMLInputElement
    ).value;
    const senha = (document.getElementById('senha') as HTMLInputElement).value;
    const dadosComplementares = {
      percentualParticipacao: parseFloat(percentual),

      faturamentoMensal: parseFloat(
        faturamento.replace('R$ ', '').replace('.', '').replace(',', '.')
      ),
      senha: senha,
    };
    this.cnpjService.armazenarDadosTemporarios({
      dadosComplementares: dadosComplementares,
    });
    console.log(this.cnpjService.retornarDadosTemporarios());
  }
  validarPercentual(event: any): void {
    const valorDigitado = parseInt(event.target.value, 10);

    if (valorDigitado > 100) {
      this.percentualModel = '100';
    }
  }
}
