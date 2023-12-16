import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  seuModeloPercentual: string = '';
  seuModeloCpf: string = '';
  seuModeloTelefone: string = '';
  seuModeloCep: string = '';
  seuModeloEstado: string = '';
  ufsValidos: string[] = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  criarConta(): void {
    const cnpj = (document.getElementById('cnpj') as HTMLInputElement).value;
    const faturamento = (
      document.getElementById('faturamento') as HTMLInputElement
    ).value;
    const nome = (document.getElementById('nome') as HTMLInputElement).value;
    const cpf = this.seuModeloCpf;
    const logradouro = (
      document.getElementById('logradouro') as HTMLInputElement
    ).value;
    const numero = (document.getElementById('numero') as HTMLInputElement)
      .value;
    const complemento = (
      document.getElementById('complemento') as HTMLInputElement
    ).value;
    const bairro = (document.getElementById('bairro') as HTMLInputElement)
      .value;
    const cidade = (document.getElementById('cidade') as HTMLInputElement)
      .value;
    const estado = this.seuModeloEstado;
    const cep = this.seuModeloCep;
    const pais = (document.getElementById('pais') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const percentual = this.seuModeloPercentual;
    const telefone = this.seuModeloTelefone;
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

  validarPercentual(event: any): void {
    const valorDigitado = parseInt(event.target.value, 10);

    if (valorDigitado > 100) {
      this.seuModeloPercentual = '100';
    }
  }

  validarEstado(event: any): void {
    let valorDigitado = event.target.value.toUpperCase();

    if (valorDigitado.length > 2) {
      valorDigitado = valorDigitado.slice(0, 2);
    }

    if (this.ufsValidos.includes(valorDigitado)) {
      this.seuModeloEstado = valorDigitado;
    } else {
      this.seuModeloEstado = '';
    }
  }
}
