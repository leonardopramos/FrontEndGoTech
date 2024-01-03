import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ViacepService } from 'src/app/services/viacep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  percentualModel: string = '';
  cepModel: string = '';
  stateModel: string = '';
  logradouroModel: string = '';
  neighborhoodModel: string = '';
  cityModel: string = '';
  complementModel: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private viaCepService: ViacepService
  ) {}

  ngOnInit(): void {}

  criarConta(): void {
    const cnpj = (document.getElementById('cnpj') as HTMLInputElement).value;
    [];
    const faturamento = (
      document.getElementById('faturamento') as HTMLInputElement
    ).value;
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
    [];
    const logradouro = this.logradouroModel;
    const numero = (document.getElementById('numero') as HTMLInputElement)
      .value;
    const complemento = this.complementModel;
    const bairro = this.neighborhoodModel;

    const cidade = this.cityModel;
    const estado = this.stateModel;
    const cep = this.cepModel;
    const pais = (document.getElementById('pais') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const percentual = this.percentualModel;
    const telefone = (document.getElementById('telefone') as HTMLInputElement)
      .value;
    const senha = (document.getElementById('senha') as HTMLInputElement).value;
    const requestBody = {
      cnpj: cnpj,
      endereco: {
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        cep: cep,
        pais: pais,
      },
      faturamentoMensal: parseFloat(
        faturamento.replace('R$ ', '').replace('.', '').replace(',', '.')
      ),
      socios: [
        {
          nome: nome,
          cpf: cpf,
          email: email,
          telefone: telefone,
          percentualParticipacao: parseFloat(percentual),
        },
      ],
      senha: senha,
    };

    this.apiService.cadastrar(requestBody).subscribe((response) => {
      this.router.navigate(['/login']);
    });
  }
  preencherEnderecoPorCep(cep: string): void {
    if (cep.length === 8) {
      this.viaCepService.getEnderecoByCep(cep).subscribe((endereco: any) => {
        if (endereco) {
          this.cepModel = endereco.cep;
          this.logradouroModel = endereco.logradouro;
          this.neighborhoodModel = endereco.bairro;
          this.cityModel = endereco.localidade;
          this.stateModel = endereco.uf;
          this.complementModel = endereco.complemento;
        }
      });
    }
  }
  validarPercentual(event: any): void {
    const valorDigitado = parseInt(event.target.value, 10);

    if (valorDigitado > 100) {
      this.percentualModel = '100';
    }
  }

  validarEstado(event: any): void {
    let valorDigitado = event.target.value.toUpperCase();

    if (valorDigitado.length > 2) {
      valorDigitado = valorDigitado.slice(0, 2);
    }
  }
  sair() {
    this.router.navigate(['/login']);
  }
}
