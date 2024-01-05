import { ViacepService } from 'src/app/services/viacep.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cnpjservice } from 'src/app/services/cnpjservice.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
})
export class EnderecoComponent implements OnInit {
  dadosCnpj: any;
  opcao: string = 'sim';
  enderecoCorreto: string = '';
  enderecoSelecionado: string = '';
  percentualModel: string = '';
  cepModel: string = '';
  stateModel: string = '';
  logradouroModel: string = '';
  neighborhoodModel: string = '';
  cityModel: string = '';
  complementModel: string = '';

  constructor(
    private cnpjService: cnpjservice,
    private router: Router,
    private viaCepService: ViacepService
  ) {}

  ngOnInit(): void {
    this.dadosCnpj = this.cnpjService.obterDadosCnpj();
    if (!this.dadosCnpj) {
      this.router.navigate(['/novo-cadastro']);
    }
  }

  proximoPasso() {
    const logradouro = this.logradouroModel;
    const numero = (document.getElementById('numero') as HTMLInputElement)
      .value;
    const complemento = this.complementModel;
    const bairro = this.neighborhoodModel;

    const cidade = this.cityModel;
    const estado = this.stateModel;
    const cep = this.cepModel;
    const pais = (document.getElementById('pais') as HTMLInputElement).value;
    const endereco = {
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      cep: cep,
      pais: pais,
    };
    this.cnpjService.armazenarDadosTemporarios({
      endereco: endereco,
    });
    console.log(this.cnpjService.retornarDadosTemporarios());
    this.router.navigate(['/dados-complementares']);
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
  validarEstado(event: any): void {
    let valorDigitado = event.target.value.toUpperCase();

    if (valorDigitado.length > 2) {
      valorDigitado = valorDigitado.slice(0, 2);
    }
  }
}
