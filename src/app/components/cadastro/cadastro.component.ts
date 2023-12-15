import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequisicoesService } from '../../service/requisicoes.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  dadosPessoaisForm!: FormGroup;
  enderecoForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private requisicoesService: RequisicoesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.inicializarForms();
  }

  inicializarForms(): void {
    this.dadosPessoaisForm = this.formBuilder.group({
      cnpj: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      faturamento: ['', Validators.required],
      percentualParticipacao: ['', Validators.required],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', Validators.required],
    });

    this.enderecoForm = this.formBuilder.group({
      logradouro: ['', Validators.required],
      cidade: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      pais: ['', Validators.required],
      numero: ['', Validators.required],
      estado: ['', [Validators.required, Validators.maxLength(2)]],
    });
  }
  criarConta(): void {
    if (this.dadosPessoaisForm && this.enderecoForm) {
      if (this.dadosPessoaisForm.valid && this.enderecoForm.valid) {
        const dados = {
          cnpj: this.dadosPessoaisForm.get('cnpj')?.value,
          email: this.dadosPessoaisForm.get('email')?.value,
          faturamento: this.dadosPessoaisForm.get('faturamento')?.value,
          percentualParticipacao: this.dadosPessoaisForm.get(
            'percentualParticipacao'
          )?.value,
          nome: this.dadosPessoaisForm.get('nome')?.value,
          telefone: this.dadosPessoaisForm.get('telefone')?.value,
          cpf: this.dadosPessoaisForm.get('cpf')?.value,
          senha: this.dadosPessoaisForm.get('senha')?.value,
          endereco: this.enderecoForm.value,
        };

        this.requisicoesService.criarConta(dados).subscribe(
          (response) => {
            if (response.status === 201) {
              console.log('Conta criada com sucesso!');
              this.router.navigate(['/login']);
            }
          },
          (error) => {
            console.error('Erro ao criar conta:', error);
          }
        );
      } else {
        // Exiba mensagens de erro ou trate de outra forma
      }
    } else {
      console.error('Formulários não inicializados corretamente.');
    }
  }

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
