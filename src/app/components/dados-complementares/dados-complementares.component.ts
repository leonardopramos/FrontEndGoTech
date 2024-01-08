import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cnpjservice } from 'src/app/services/cnpjservice.service';

interface Atividade {
  code: string;
  text: string;
}

@Component({
  selector: 'app-dados-complementares',
  templateUrl: './dados-complementares.component.html',
  styleUrls: ['./dados-complementares.component.css'],
})
export class DadosComplementaresComponent implements OnInit {
  percentualModel: string = '';
  dadosCnpj: any;

  constructor(
    private cnpjService: cnpjservice,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.dadosCnpj = this.cnpjService.obterDadosCnpj();
    if (!this.dadosCnpj) {
      this.router.navigate(['/novo-cadastro']);
    }
  }

  criarConta() {
    const dadosTemporarios = this.cnpjService.retornarDadosTemporarios();
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

    this.cnpjService.armazenarDadosTemporarios({ dadosComplementares });

    const {
      cnpj,
      porte,
      capital_social,
      dataSelecionada,
      fantasia,
      natureza_juridica,
      nomeCorreto,
      cpfCorreto,
      emailCorreto,
      telefoneCorreto,
      endereco,
      atividade_principal,
      atividades_secundarias,
    } = dadosTemporarios;

    const atividadesPrincipais: Atividade[] = atividade_principal.map(
      (atividade: Atividade) => ({
        code: atividade.code,
        text: atividade.text,
        tipo: 'Principal',
      })
    );

    const atividadesSecundarias: Atividade[] = atividades_secundarias.map(
      (atividade: Atividade) => ({
        code: atividade.code,
        text: atividade.text,
        tipo: 'Secundária',
      })
    );

    const requestBody = {
      cnpj: cnpj,
      senha: dadosComplementares.senha,
      faturamentoMensal: dadosComplementares.faturamentoMensal,
      porte: porte,
      capitalSocial: capital_social,
      dataDeAbertura: dataSelecionada,
      fantasia: fantasia,
      naturezaJuridica: natureza_juridica,
      socios: [
        {
          nome: nomeCorreto,
          cpf: cpfCorreto,
          email: emailCorreto,
          telefone: telefoneCorreto,
          percentualParticipacao: dadosComplementares.percentualParticipacao,
        },
      ],
      endereco: {
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        cep: endereco.cep,
        pais: endereco.pais,
      },
      atividades: [...atividadesPrincipais, ...atividadesSecundarias],
    };

    this.apiService.cadastrar(requestBody).subscribe((response) => {
      this.router.navigate(['/login']);
    });
  }

  validarPercentual(event: any): void {
    const valorDigitado = parseInt(event.target.value, 10);

    if (valorDigitado > 100) {
      this.percentualModel = '100';
    }
  }
}
