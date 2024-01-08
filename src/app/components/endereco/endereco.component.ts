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
    const numero = (document.getElementById('numero') as HTMLInputElement)
      .value;

    const endereco = {
      logradouro: this.logradouroModel,
      numero: numero,
      complemento: this.complementModel,
      bairro: this.neighborhoodModel,
      cidade: this.cityModel,
      estado: this.stateModel,
      cep: this.cepModel,
      pais: (document.getElementById('pais') as HTMLInputElement).value,
    };

    this.cnpjService.armazenarDadosTemporarios({
      endereco: endereco,
    });

    this.router.navigate(['/dados-complementares']);
  }

  preencherEnderecoPorCep(cep: string): void {
    if (cep.length === 8) {
      this.viaCepService.getEnderecoByCep(cep).subscribe((endereco: any) => {
        if (endereco && endereco.cep) {
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
    const valorDigitado = event.target.value.toUpperCase();
    this.stateModel =
      valorDigitado.length > 2 ? valorDigitado.slice(0, 2) : valorDigitado;
  }
}
